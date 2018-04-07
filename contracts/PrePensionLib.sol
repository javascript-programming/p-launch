pragma solidity ^0.4.18;

library PrePensionLib {

    struct Participant {
        bytes32 id;
        uint balance;
        uint noOfPensions;
        uint noOfPurchases;
        bool active;
        mapping(uint => PensionBalance) pensionBalances;
        mapping(uint => Purchase) purchases;
    }

    struct Supplier {
        bytes32 id;
        uint balance;
        uint noOfInvoices;
        bool active;
        mapping (uint => Invoice) invoices;
    }

    struct Pension {
        bytes32 id;
        bool active;
        mapping (bytes32 => uint) minted;
    }

    struct PensionBalance {
        bytes32 pension;
        uint balance;
    }

    struct Purchase {
        bytes32 supplier;
        uint amount;
        bool validated;
        bool delivered;
    }

    struct Invoice {
        uint id;
        bytes32 participant;
        uint amount;
        bool paid;
    }

    struct Data {
        mapping(address => Participant) participants;
        mapping(bytes32 => address) participantMapping;
        mapping(address => Supplier) suppliers;
        mapping(bytes32 => address) supplierMapping;
        mapping(address => Pension) pensions;
        mapping(bytes32 => address) pensionMapping;
        mapping(uint => bytes32) supplierIterator;
        uint noOfSuppliers;
    }

    function addParticipant (Data storage self, address _participant, bytes32 _id) internal returns (Participant) {
        self.participants[_participant] = Participant(_id, 0, 0, 0, true);
        self.participantMapping[_id] = _participant;
        return self.participants[_participant];
    }

    function addPension (Data storage self, address _pension, bytes32 _id) internal returns (Pension) {
        self.pensions[_pension] = Pension(_id, true);
        self.pensionMapping[_id] = _pension;
        return self.pensions[_pension];
    }

    function addPensionBalance (Data storage self, bytes32 _participant, bytes32 _pension, uint _balance) internal returns (PensionBalance) {
        Participant storage participant = self.participants[self.participantMapping[_participant]];
        participant.noOfPensions += 1;
        participant.pensionBalances[participant.noOfPensions] = PensionBalance(_pension, _balance);
        return participant.pensionBalances[participant.noOfPensions];
    }

    function addSupplier (Data storage self, address _supplier, bytes32 _id) internal returns (Supplier) {
        self.suppliers[_supplier] = Supplier(_id, 0, 0, true);
        self.supplierMapping[_id] = _supplier;
        self.noOfSuppliers += 1;
        self.supplierIterator[self.noOfSuppliers] = _id;
        return self.suppliers[_supplier];
    }

    function mint (Data storage self, bytes32 _pension, bytes32 _participant, uint _balance) internal returns (uint) {
        Participant storage participant = self.participants[self.participantMapping[_participant]];
        uint pensionBalanceId = getPensionBalanceId(self, _participant, _pension);
        uint previousBalance = 0;

        if (pensionBalanceId != 0) {
            previousBalance = participant.pensionBalances[pensionBalanceId].balance;
            participant.pensionBalances[pensionBalanceId].balance = _balance;
        } else {
            addPensionBalance(self, _participant, _pension, _balance);
        }

        uint newCoins = (_balance - previousBalance) / 10;
        participant.balance += newCoins;

        Pension storage pension = self.pensions[self.pensionMapping[_pension]];

        if (pension.minted[_participant] == 0) {
          pension.minted[_participant] = 0;
        }

        pension.minted[_participant] += newCoins;

        return newCoins;
    }

    function getPensionBalance(Data storage self, bytes32 _participant, bytes32 _pension) view internal returns (PensionBalance) {
        uint id = getPensionBalanceId(self, _participant, _pension);
        return self.participants[self.participantMapping[_participant]].pensionBalances[id];
    }

    function getPensionBalanceId (Data storage self, bytes32 _participant, bytes32 _pension) view internal returns(uint) {
        Participant storage participant = self.participants[self.participantMapping[_participant]];

        for (uint i = 1; i <= participant.noOfPensions; i++) {
            if (participant.pensionBalances[i].pension == _pension) {
                return i;
            }
        }

        return 0;
    }

}
