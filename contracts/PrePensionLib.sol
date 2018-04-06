pragma solidity ^0.4.18;

library PrePensionLib {

    uint totalBalance;

    struct Participant {
        string id;
        uint balance;
    }

    struct Data {
        mapping(uint => Task) tasks;
        mapping(address => Resource) resources;
        mapping(uint => Assignment) assignments;
        uint p_counter;
        uint budget;
    }

}
