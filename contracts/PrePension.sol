pragma solidity ^0.4.18;

import "./PrePensionBase.sol";

contract PrePension is PrePensionBase {

  bytes32 public constant version = "PrePension v1.0.0";

  function PrePension () public {

  }

  event participantAdded (bytes32 id);

  function addParticipant (address _participant, bytes32 _id) public participantNotExist(_id) allowedToAddParticipant(_id) {
      PrePensionLib.addParticipant(data, _participant, _id);
      emit participantAdded(_id);
  }

  function getParticipant (bytes32 _id) public view returns (
    bytes32 id,
    uint balance,
    bool active
  )  {

    PrePensionLib.Participant storage participant = data.participants[data.participantMapping[_id]];

    return (
      id = participant.id,
      balance = participant.balance,
      active = participant.active
    );
  }

  event pensionAdded (bytes32 id);

  function addPension (address _pension, bytes32 _id) public pensionNotExist(_id) {
    PrePensionLib.addPension(data, _pension, _id);
    emit pensionAdded(_id);
  }

  function getPension (bytes32 _id) public view returns (
    bytes32 id,
    bool active
  )  {

    PrePensionLib.Pension storage pension = data.pensions[data.pensionMapping[_id]];

    return (
      id = pension.id,
      active = pension.active
    );
  }

  event supplierAdded (bytes32 id);

  function addSupplier (address _supplier, bytes32 _id) public supplierNotExist(_id) supplierIsValid(_id) {
    PrePensionLib.addSupplier(data, _supplier, _id);
    emit supplierAdded(_id);
  }

  function getSupplier (bytes32 _id) public view returns (
    bytes32 id,
    uint noOfInvoices,
    bool active
  )  {

    PrePensionLib.Supplier storage supplier = data.suppliers[data.supplierMapping[_id]];

    return (
      id = supplier.id,
      noOfInvoices = supplier.noOfInvoices,
      active = supplier.active
    );
  }

  function getNumberOfSuppliers() public view returns (uint) {
    return data.noOfSuppliers;
  }

  function getSupplierById(uint _id) public view returns (
    bytes32 id,
    uint noOfInvoices,
    bool active
    ) {
      return getSupplier(data.supplierIterator[_id]);
    }

  event minted (bytes32 pension, bytes32 participant, uint balance, uint coins);

  function mint (bytes32 _pension, bytes32 _participant, uint _balance) public pensionExist(_pension) participantExist(_participant) {
    uint coins = PrePensionLib.mint(data, _pension, _participant, _balance);
    PrePensionLib.PensionBalance memory pensionBalance = PrePensionLib.getPensionBalance(data, _participant, _pension);
    emit minted(_pension, _participant, pensionBalance.balance, coins);
  }

  function getMintedForParticipant(bytes32 _pension, bytes32 _participant) public view returns (uint) {
    return data.pensions[data.pensionMapping[_pension]].minted[_participant];
  }

  function getPensionBalance(bytes32 _participant, bytes32 _pension) public view returns (uint) {
    return PrePensionLib.getPensionBalance(data, _participant, _pension).balance;
  }

  function getParticipantBalance(bytes32 _participant) public view returns (uint) {
    return data.participants[data.participantMapping[_participant]].balance;
  }

  function getNumberOfPensions(bytes32 _participant) public view returns (uint) {
    return data.participants[data.participantMapping[_participant]].noOfPensions;
  }

  function getParticipantPension (bytes32 _participant, uint id) public view returns (bytes32 pension, uint balance) {
    PrePensionLib.PensionBalance storage pensionBalance = data.participants[data.participantMapping[_participant]].pensionBalances[id];
    return (
      pension = pensionBalance.pension,
      balance = pensionBalance.balance
    );
  }

  event purchased (bytes32 _participant, bytes32 _supplier, uint amount);

  function purchase (bytes32 _participant, bytes32 _supplier, uint _amount) public
            participantExist(_participant)
            supplierExist(_supplier)
            sufficientBalance (_participant, _amount) {

      PrePensionLib.purchase(data, _participant, _supplier, _amount);
      emit purchased(_participant, _supplier, _amount);
  }

}
