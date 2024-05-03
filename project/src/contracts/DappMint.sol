// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./DefaultOperatorFilterer.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DappMint is
    ERC721,
    ERC721URIStorage,
    Ownable,
    ReentrancyGuard,
    DefaultOperatorFilterer
{
    using Strings for uint256; // Strings is a library from OpenZeppelin that helps to deal with string manipulation; Example: string(uint256(123)) will convert 123 to "123"
    using Counters for Counters.Counter; // Counters is a library from OpenZeppelin that helps to deal with uint256;  Example1: Counters.increment() will increment the counter by 1; Example2: Counters.decrement() will decrement the counter by 1

    Counters.Counter private _tokenIdCounter;

    struct NFTStruct {
        uint256 id; // address
        address owner; // address of the owner
        uint256 mintCost; // mint cost of the NFT
        string baseURI; // base URI of the NFT: the location of the metadata
        uint256 timestamp; // timestamp of the mint
    }

    // For keeping truck of the beneficiaries of the air drop
    struct BeneficiaryStruct {
        uint256 tokens;
        address beneficiary;
    }

    string public baseURI; //the specific location where the metadata is stored / (the artwork is living on IPFS)
    string public baseExtension = ".json"; //the file extension of the artwork; this is important for the metadata to be read correctly and displayed on OpenSea

    uint256 public netRevenue; // this is the net revenue of the contract; it keeps all the payments/ the money that we receive from people minting the NFTs from various stages (stage1, stage2)

    // this is for stopping people from minting the NFTs
    bool public stageOnePaused = true;
    bool public stageTwoPaused = true;

    // maxSupply must be the additional of stageOneMax, stageTwoMax and airdropMax; Example: 100 = 50 + 40 + 10
    uint256 public maxSupply = 100; // the maximum supply of the NFTs that can be minted
    uint256 public stageOneMax; // the maximum supply of the NFTs that can be minted in stage 1
    uint256 public stageTwoMax; // the maximum supply of the NFTs that can be minted in stage 2
    uint256 public airdropMax; // the maximum supply of the NFTs that can be minted in the airdrop
    uint256 public maxMintPerTime = 4; // the maximum number of NFTs that can be minted at a time; this is like a throttling mechanism to prevent people from minting all the NFTs at once

    uint256 public stageOneCost = 0.02 ether; // the cost of minting the NFT in stage 1
    uint256 public stageTwoCost = 0.04 ether; // the cost of minting the NFT in stage 2

    uint256 stageOneCount; // the number of NFTs minted in stage 1
    uint256 stageTwoCount; // the number of NFTs minted in stage 2
    uint256 airdropCount; // the number of NFTs minted in the airdrop

    mapping(uint256 => NFTStruct) minted; // mapping of all NFTs that have been minted on the platform; Example: If you minted an NFT it will be stored in this mapping; Each token will have a unique ID and the NFTStruct will have the details of the NFT
    mapping(address => uint256) public totalCost; // mapping of the total cost of the NFTs that have been minted by a specific address; Example: If you minted an NFT, the total cost of the NFTs that you minted will be stored in this mapping
    mapping(address => bool) joined; // mapping of the addresses that are in whitelist; Example: If you are in the whitelist, the value will be true; The same address can be in the whitelist only once
    address[] whitelist; // array of the addresses that are in the whitelist; Example: If you are in the whitelist, your address will be stored in this array
    BeneficiaryStruct[] public airdroppers; // array of the beneficiaries of the airdrop; Example: If you are a beneficiary of the airdrop, your address will be stored in this array

    constructor(
        string memory _initBaseURI,
        uint256 _maxSupply,
        uint256 _stageOneMax,
        uint256 _stageTwoMax,
        uint256 _airdropMax,
        address _owner // the address of the owner of the contract; if you deploy the contract, you will be the owner; if we specify the owner, the owner will be the address that we specify
    ) ERC721("DappMint NFT", "DM") {
        baseURI = _initBaseURI;
        maxSupply = _maxSupply;
        stageOneMax = _stageOneMax;
        stageTwoMax = _stageTwoMax;
        airdropMax = _airdropMax;
        transferOwnership(_owner);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mintNFT(
        uint256 numOfMints,
        uint256 stage
    ) public payable nonReentrant {
        if (stage == 1) {
            require(!stageOnePaused, "Stage 1 is paused. Check back later.");
            require(
                msg.value >= stageOneCost * numOfMints,
                "Insufficient funds for stage 1"
            );
            require(
                stageOneCount + numOfMints <= stageOneMax,
                "Stage 1 available supply exhausted"
            );
        }
        if (stage == 2) {
            require(!stageTwoPaused, "Stage 2 is paused. Check back later.");
            require(
                msg.value >= stageTwoCost * numOfMints,
                "Insufficient funds for stage 2"
            );
            require(
                stageTwoCount + numOfMints <= stageTwoMax,
                "Stage 2 available supply exhausted"
            );
        }

        require(
            performMinting(numOfMints, msg.sender),
            "Minting not performed"
        );

        if (stage == 1) stageOneCount += numOfMints;
        if (stage == 2) stageTwoCount += numOfMints;

        netRevenue += msg.value;
        totalCost[msg.sender] += msg.value;
    }

    // numOfMints: the number of NFTs that the user wants to mint
    // holder: the address of the user that wants to mint the NFTs
    function performMinting(
        uint256 numOfMints,
        address holder
    ) internal returns (bool) {
        require(numOfMints > 0, "Number of minted NFTs must be greater than 0");
        require(
            numOfMints <= maxMintPerTime,
            "Exceeds the maximum number of NFTs that can be minted at a time"
        );

        for (uint256 i = 1; i <= numOfMints; i++) {
            uint256 tokenId = _tokenIdCounter.current() + 1;

            _safeMint(holder, tokenId); // mint the NFT and assign it to the holder
            _setTokenURI(tokenId, tokenURI(tokenId)); // set the token URI of the NFT that has been minted

            minted[tokenId] = NFTStruct({
                id: tokenId,
                owner: holder,
                mintCost: msg.value / numOfMints,
                baseURI: baseURI,
                timestamp: block.timestamp
            });

            _tokenIdCounter.increment(); // increment the counter by 1
        }

        return true;
    }

    function getMintedNFTs() public view returns (NFTStruct[] memory Minted) {
        uint256 totalSupply = _tokenIdCounter.current(); // get the total supply of the NFTs that have been minted
        Minted = new NFTStruct[](totalSupply); // create an array of NFTStruct with the size of the total supply

        for (uint i = 0; i < totalSupply; i++) {
            Minted[i] = minted[i + 1]; // get the NFTStruct of the NFT with the ID of i + 1
        }
    }

    function getOwnerNFTs(
        address _owner
    ) public view returns (NFTStruct[] memory Minted) {
        uint256 totalSupply = _tokenIdCounter.current(); // get the total supply of the NFTs that have been minted
        uint256 ownerTokenCount;
        uint256 j = 0;

        for (uint i = 0; i < totalSupply; i++) {
            if (minted[i + 1].owner == _owner) ownerTokenCount++;
        }

        Minted = new NFTStruct[](ownerTokenCount);
        for (uint i = 0; i < totalSupply; i++) {
            if (minted[i + 1].owner == _owner) {
                Minted[j] = minted[i + 1]; // get the NFTStruct of the NFT with the ID of i + 1
                j++;
            }
        }
    }

    function joinWhitelist() public {
        require(!joined[msg.sender], "Account already in the list");
        joined[msg.sender] = true;
        whitelist.push(msg.sender);
    }

    function getWhitelist() public view returns (address[] memory) {
        return whitelist;
    }

    function withdrawTrappedCash() public onlyOwner {
        uint256 trappedCash = address(this).balance - netRevenue;
        netRevenue += trappedCash;
    }

    function setCost(uint256 newCost, uint256 stage) public onlyOwner {
        require(stage > 0 && stage <= 2, "Stage must be 1 or 2");

        if (stage == 1) stageOneCost = newCost;
        if (stage == 2) stageTwoCost = newCost;
    }

    function pause(bool state, uint256 stage) public onlyOwner {
        require(stage > 0 && stage <= 2, "Stage must be 1 or 2");

        if (stage == 1) stageOnePaused = state;
        if (stage == 2) stageTwoPaused = state;
    }

    function setMaxMintPerTime(uint256 _newMaxMintPerTime) public onlyOwner {
        maxMintPerTime = _newMaxMintPerTime;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function transfer() public payable {
        require(msg.value > 0 ether, "Insufficient funds");
    }

    function withdrawTo(
        address[] memory _beneficiaries,
        uint256[] memory _percentages,
        uint256 _amount
    ) public nonReentrant onlyOwner {
        require(_beneficiaries.length > 0, "Beneficiary must not be zero");
        require(
            _beneficiaries.length == _percentages.length,
            "Array sizes not matching"
        );
        require(_amount > 0 ether, "Amount must be greater than zero");
        require(netRevenue >= _amount, "Insuficient funds");
        for (uint256 i = 0; i < _beneficiaries.length; i++) {
            uint256 share = (_amount * _percentages[i]) / 100;
            payTo(_beneficiaries[i], share);
            netRevenue -= share;
        }
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function airDropTo(
        address[] memory _beneficiaries,
        uint256[] memory _tokens
    ) public nonReentrant onlyOwner {
        require(_beneficiaries.length > 0, "Beneficiary must not be zero");
        require(
            _beneficiaries.length == _tokens.length,
            "Array sizes not matching"
        );
        require(
            sumUpTokens(_tokens) + airdropCount <= airdropMax,
            "Insufficient tokens for airdrop"
        );

        for (uint256 i = 0; i < _beneficiaries.length; i++) {
            if (_tokenIdCounter.current() + _tokens[i] <= airdropMax) {
                performMinting(_tokens[i], _beneficiaries[i]);
                airdroppers.push(
                    BeneficiaryStruct({
                        tokens: _tokens[i],
                        beneficiary: _beneficiaries[i]
                    })
                );
            }
        }
        airdropCount += sumUpTokens(_tokens);
    }

    function getAirdroppers() public view returns (BeneficiaryStruct[] memory) {
        return airdroppers;
    }

    function sumUpTokens(
        uint256[] memory _tokens
    ) internal pure returns (uint256) {
        uint256 sum = 0;

        for (uint256 i = 0; i < _tokens.length; i++) {
            sum += _tokens[i];
        }
        return sum;
    }

    function tokenURI(
        uint256 tokenID
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        require(
            _exists(tokenID),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenID.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
        minted[tokenId].owner = to;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
        minted[tokenId].owner = to;
    }

    // function safeTransferFrom(
    //     address from,
    //     address to,
    //     uint256 tokenId,
    //     bytes memory data
    // ) public override onlyAllowedOperator {
    //     super.transferFrom(from, to, tokenId, data);
    //     minted[tokenId].owner = to;
    // }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
