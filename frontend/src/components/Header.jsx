import { useSDK } from "@metamask/sdk-react";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../App";

const Header = () => {
  const { account, setAccountHandler } = useContext(AppContext);

  const { sdk } = useSDK();

  const onClickMetaMask = async () => {
    try {
      const accounts = await sdk?.connect();

      setAccountHandler(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-blue-100 w-full fixed left-1/2 -translate-x-1/2 top-0 max-w-screen-md flex justify-between">
        <div>
          <Link to="/">Home</Link>
          <Link to="/mint">Mint</Link>
        </div>
        <div>
          {account ? (
            <div>{account}</div>
          ) : (
            <button onClick={onClickMetaMask}>MetaMask LogIn</button>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
