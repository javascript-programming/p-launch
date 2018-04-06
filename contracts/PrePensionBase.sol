pragma solidity ^0.4.18;

import "./PrePensionLib.sol";


contract PrePensionBase {

  address public owner;

  PrePensionLib.Data data;

  function PrePensionBase() public {
    owner = msg.sender;
    data = PrePensionLib.Data({
        mintedCoins : 0
      });
  }

  function setOwner (address _newOwner) public onlyOwner {
    owner = _newOwner;
  }

  modifier onlyOwner {
    if (msg.sender != owner)
      revert();
    _;
  }

  function () public {
    revert();
  }

}
