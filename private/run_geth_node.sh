#!/usr/bin/env bash


geth --networkid 613203328 --datadir . --cache 1024 --port 30303 --maxpeers 50  \
    --ethstats $STAT_NAME':jeaxo3@5.157.85.181' \
    --bootnodesv4 enode://76f989872c39a0ad4aef98ad4d119d7e9cb892756c2802fa992b2d7a38ad64d4f306df94ed04bf62f2b46577305588beee5a5bb8b7d9b3ea5abeabeb50d8197d@5.157.85.181:30303 \
    --bootnodesv5 enode://76f989872c39a0ad4aef98ad4d119d7e9cb892756c2802fa992b2d7a38ad64d4f306df94ed04bf62f2b46577305588beee5a5bb8b7d9b3ea5abeabeb50d8197d@5.157.85.181:30303?discport=30304 \
    --etherbase 0x3cc6f7b81c099ee9ee9a91cf9c726804f5bd5e34 \
    --gasprice 18000000000 --rpc --rpcapi="db,eth,net,web3,personal,admin,miner" --rpcaddr=0.0.0.0 --rpccorsdomain "*" \
    --ws --wsapi="admin,shh,db,eth,net,web3,personal,miner" --wsaddr=0.0.0.0 --wsorigins="*" \
    console
