# Import Accounts into RSK Node

Script to allow the import of keystore files into a 
running RSK node.

It uses NodeJS (it was developed and tested using version `12.6.x`)

## Install

Execute

```
npm install
```

It install two dependencies:

- `ethereumjs-wallet`: to import Ethereum keystore files
- ^rskapi`: to send JSON RPC commands to RSK node

## Import Accounts

To import accounts from keystore files from a folder, execute
```
node importaccs <datadir> <pwdfile> <JSONRPCendpoint>
```

The password file should contain the passphrase (in plain text)
that was used to generate the keystore files.

Example (using local files in this repo and RSK regtest node running)

```
node importaccs ./keystores ./pwd.txt http://localhost:4444
```

`https` transport is also available. In this case, you must
provide the port EXPLICITLY, ie `http://localhost:443`

The import command can be run many times againts the same
RSK node: the accounts are only imported once.

## List Accounts

To list the accounts defined in RSK node, execute:

```
node listaccs <JSONRPCendpoint>
```

Example:
```
node listaccs http://localhost:4444
```

## Reference

- [What is an Ethereum keystore file?](https://medium.com/@julien.maffre/what-is-an-ethereum-keystore-file-86c8c5917b97)

