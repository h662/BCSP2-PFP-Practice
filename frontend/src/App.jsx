import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Mint from "./pages/mint";
import Header from "./components/Header";
import { createContext, useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import mintNFTABI from "./mintNFT.json";
import Web3 from "web3";

export const AppContext = createContext({
  account: "",
  setAccountHandler: () => {},
  web3: undefined,
  contract: undefined,
});

const App = () => {
  const [account, setAccount] = useState("");
  const setAccountHandler = (state) => setAccount(state);

  const [web3, setWeb3] = useState();
  const [contract, setContract] = useState();

  const { provider } = useSDK();

  useEffect(() => {
    if (!provider) return;

    setWeb3(new Web3(provider));
  }, [provider]);

  useEffect(() => {
    if (!web3) return;

    setContract(
      new web3.eth.Contract(
        mintNFTABI,
        "0xD53e51c2c6E1379747e03EfD764A55FB6A28f80c"
      )
    );
  }, [web3]);

  return (
    <AppContext.Provider value={{ account, setAccountHandler, web3, contract }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<Main />} />
            <Route path="/mint" element={<Mint />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
