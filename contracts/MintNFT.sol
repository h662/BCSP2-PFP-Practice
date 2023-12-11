// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintNFT is ERC721Enumerable {
    string metadataURI;
    uint maxSupply;

    constructor(string memory _name, string memory _symbol, string memory _metadataURI, uint _maxSupply) ERC721(_name, _symbol) {
        metadataURI = _metadataURI;
        maxSupply = _maxSupply;
    }

    function mintNFT() public {
        require(totalSupply() < maxSupply, "No more mint.");

        uint tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);
    }

    function batchMint(uint _amount) public {
        for(uint i = 0; i < _amount; i++) {
            mintNFT();
        }
    }

    function tokenURI(uint _tokenId) public override view returns(string memory) {
        // return metadataURI + '/' + _tokenId + '.json';

        return string(abi.encodePacked(metadataURI, '/', Strings.toString(_tokenId), '.json'));
    }
}