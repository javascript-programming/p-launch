
Run a node

install geth: https://geth.ethereum.org/downloads/

1) make a dir/ copy private to some location (you do not have to copy the keystore) most important is the jaavethereum.json genesis file
2) cd to private
3) 

run 
geth --cache 512 --datadir . init /jaavethereum.json

4) 
change following in line below
--ethstats 'yournodename:jeaxo3@5.157.85.181'
to 
--ethstats 'yournodename:jeaxo3@5.157.85.181'

optionally take another etherbase from the accounts, for example
--etherbase 0x366a20c2acb7af3ee7b8827600d7ff8d22b9bac2

take one from the keystore

then run

geth --networkid 613203328 --datadir . --cache 1024 --port 30303 --maxpeers 50  --ethstats 'yournodename:jeaxo3@5.157.85.181' --bootnodesv4 enode://76f989872c39a0ad4aef98ad4d119d7e9cb892756c2802fa992b2d7a38ad64d4f306df94ed04bf62f2b46577305588beee5a5bb8b7d9b3ea5abeabeb50d8197d@5.157.85.181:30303 --bootnodesv5 enode://76f989872c39a0ad4aef98ad4d119d7e9cb892756c2802fa992b2d7a38ad64d4f306df94ed04bf62f2b46577305588beee5a5bb8b7d9b3ea5abeabeb50d8197d@5.157.85.181:30303?discport=30304 --etherbase 0x0c46747154E9530C0fa695bFaE2eCcB16A425a79 --mine --minerthreads 2  --targetgaslimit 10000000000 --gasprice 18000000000 --rpc --rpcapi="db,eth,net,web3,personal,admin,miner" --rpcaddr=0.0.0.0 --rpccorsdomain "*" --ws --wsapi="admin,shh,db,eth,net,web3,personal,miner" --wsaddr=0.0.0.0 --wsorigins="*" console

node will appear here 
http://5.157.85.181/

5) 
attach node to private network
geth attach http://5.157.85.76:8545

