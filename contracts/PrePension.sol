pragma solidity ^0.4.18;

import "./PrePensionBase.sol";

contract PrePension is PrePensionBase {

  bytes32 public constant version = "PrePension v1.0.0";

  function PrePension () public {

  }

  event participantAdded (bytes32 id);

  function addParticipant (address _participant, bytes32 _id) public participantNotExist(_id) allowedToAddParticipant(_id) {
      PrePensionLib.addParticipant(data, _participant, _id);
      participantAdded(_id);
  }

  function getParticipant (bytes32 _id) public view returns (
    bytes32 id,
    uint balance,
    bool active
  )  {

    var participant = data.participants[data.participantMapping[_id]];

    return (
      id = participant.id,
      balance = participant.balance,
      active = participant.active
    );
  }

  event pensionAdded (bytes32 id);

  function addPension (address _pension, bytes32 _id) public pensionNotExist(_id) {
    PrePensionLib.addPension(data, _pension, _id);
    participantAdded(_id);
  }

  function getPension (bytes32 _id) public view returns (
    bytes32 id,
    uint minted,
    bool active
  )  {

    var pension = data.pensions[data.pensionMapping[_id]];

    return (
      id = pension.id,
      minted = pension.minted,
      active = pension.active
    );
  }

  event supplierAdded (bytes32 id);

  function addSupplier (address _supplier, bytes32 _id) public supplierNotExist(_id) supplierIsValid(_id) {
    PrePensionLib.addSupplier(data, _supplier, _id);
    supplierAdded(_id);
  }

  function getSupplier (bytes32 _id) public view returns (
    bytes32 id,
    uint balance,
    uint noOfInvoices,
    bool active
  )  {

    var supplier = data.suppliers[data.supplierMapping[_id]];

    return (
      id = supplier.id,
      balance = supplier.balance,
      noOfInvoices = supplier.noOfInvoices,
      active = supplier.active
    );
  }

}
