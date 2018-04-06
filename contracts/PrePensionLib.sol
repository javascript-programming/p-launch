pragma solidity ^0.4.18;

library PrePensionLib {

    struct Participant {
        string id;
        uint balance;
        mapping(string => )
    }

    struct Supplier {
        string id;
        uint balance;
    }

    struct PensionFund {
        string id;
        uint minted;
    }

    struct Data {
        mapping(string => Participant) participants;
        mapping(string => Supplier) suppliers;
        mapping(string => PensionFund) pensionFunds;
        uint mintedCoins;
    }

}
