pragma solidity ^0.4.18;

import "./PrePensionLib.sol";


contract PrePensionBase {

  address public owner;

  PrePensionLib.Data data;

  function PrePensionBase() public {
    owner = msg.sender;
    data = PrePensionLib.Data({
        noOfSuppliers : 0
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

  modifier allowedToAddParticipant (bytes32 _participant) {

    if (!data.pensions[msg.sender].active)
      revert();
    _;
  }

  modifier participantExist (bytes32 _participant) {

    if (!data.participants[data.participantMapping[_participant]].active) {
      revert();
    }
    _;
  }

  modifier participantNotExist (bytes32 _participant) {

    if (data.participants[data.participantMapping[_participant]].active) {
      revert();
    }
    _;
  }

  modifier pensionExist (bytes32 _pension) {

    if (!data.pensions[data.pensionMapping[_pension]].active) {
      revert();
    }
    _;
  }

  modifier pensionNotExist (bytes32 _pension) {

    if (data.pensions[data.pensionMapping[_pension]].active) {
      revert();
    }
    _;
  }

  modifier supplierExist (bytes32 _supplier) {

    if (!data.suppliers[data.supplierMapping[_supplier]].active) {
      revert();
    }
    _;
  }

  modifier supplierNotExist (bytes32 _supplier) {

    if (data.suppliers[data.supplierMapping[_supplier]].active) {
      revert();
    }
    _;
  }

  modifier supplierIsValid (bytes32 _supplier) {
    if (!data.pensions[msg.sender].active)
      revert();
    _;
  }

  function () public {
    revert();
  }

}
