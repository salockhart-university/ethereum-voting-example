# Geth
Create a new account with password "lockhart"

`personal.newAccount("lockhart")`

Unlock the account

`eth.coinbase` is the first created account

`personal.unlockAccount(eth.coinbase,"lockhart")`

Get the address for this blockchain

`admin.nodeInfo.enode`

Add a peer's address

`admin.addPeer("address")`

# Embark
Change directory to a directory that contains an embark project

Start a new blockchain using embark

`embark blockchain`

In a new window, start the embark server

`embark run`

# Getting a peer attached to Embark Blockchain

In terminal 0:

`embark blockchain`

In terminal 1:

`geth attach /home/blockchain/embark_data/geth.ipc`

`admin.nodeInfo.enode`

In terminal 2:

`geth --identity "MyNodeName" --rpc --rpcport "8080" --rpccorsdomain "*" --datadir "/home/blockchain/geth_data" --port "30304" --rpcapi "db,eth,net,web3" --networkid 12301 init /media/sf_assn05/config/development/genesis.json`

`geth --identity "MyNodeName" --rpc --rpcport "8080" --rpccorsdomain "*" --datadir "/home/blockchain/geth_data" --port "30304" --rpcapi "db,eth,net,web3" --networkid 12301 console`

`admin.addPeer(<enode from terminal 1>)`

`admin.peers`
