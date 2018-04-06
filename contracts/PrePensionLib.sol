pragma solidity ^0.4.18;

library PrePensionLib {

    struct Participant {
        bytes32 id;
        uint balance;
        uint noOfPensions;
        uint noOfPurchases;
        mapping(uint => PensionBalance) pensionBalances;
        mapping(uint => Purchase) purchases;
    }

    struct Supplier {
        bytes32 id;
        uint balance;
        uint noOfInvoices;
        mapping (uint => Invoice) invoices;
    }

    struct Pension {
        bytes32 id;
        uint minted;
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
        uint mintedCoins;
    }

    function addParticipant (Data storage self, address _participant, bytes32 _id) internal returns (Participant) {
        self.participants[_participant] = Participant(_id, 0, 0, 0);
        self.participantMapping[_id] = _participant;
        return self.participants[_participant];
    }

    function addPension (Data storage self, address _pension, bytes32 _id) internal returns (Pension) {
        self.pensions[_pension] = Pension(_id, 0);
        self.pensionMapping[_id] = _pension;
        return self.pensions[_pension];
    }

    function addPensionBalance (Data storage self, bytes32 _participant, bytes32 _pension, uint _balance) internal returns (PensionBalance) {
        var participant = self.participants[self.participantMapping[_participant]];
        participant.noOfPensions++;
        participant.pensionBalances[participant.noOfPensions] = PensionBalance(_pension, _balance);
        return participant.pensionBalances[participant.noOfPensions];
    }

    function addSupplier (Data storage self, address _supplier, bytes32 _id) internal returns (Supplier) {
        self.suppliers[_supplier] = Supplier(_id, 0, 0);
        self.supplierMapping[_id] = _supplier;
        return self.suppliers[_supplier];
    }

    function mint (Data storage self, bytes32 _pension, bytes32 _participant, uint _balance) internal {
        var participant = self.participants[self.participantMapping[_participant]];
        var pensionBalanceId = getPensionBalanceId(self, _participant, _pension);
        uint previousBalance = 0;

        if (pensionBalanceId != 0) {
            previousBalance = participant.pensionBalances[pensionBalanceId].balance;
        } else {
            addPensionBalance(self, _participant, _pension, _balance);
        }

        participant.balance += (_balance - previousBalance) / 10;
    }

    function getPensionBalanceId (Data storage self, bytes32 _participant, bytes32 _pension) view internal returns(uint) {
        var participant = self.participants[self.participantMapping[_participant]];

        for (uint i = 1; i <= participant.noOfPensions; i++) {
            if (participant.pensionBalances[i].pension == _pension) {
                return i;
            }
        }

        return 0;
    }

}
