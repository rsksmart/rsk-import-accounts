
const fs = require('fs');
const path = require('path');
const Wallet = require('ethereumjs-wallet');
const rskapi = require('rskapi');

/*
async function readWallet(filename, passphrase) {
}

async function sendWallet(host)
*/

const directoryPath = process.argv[2];
const passphrase = process.argv[3];
const host = rskapi.host(process.argv[4]);

//joining path of directory 
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        console.log('processing file', file);
        
        const filename = path.join(directoryPath, file);
        
        (async function () {
            try {
                const result = await processFile(filename);
                
                if (result)
                    console.log('file', file, 'processed');
                else
                    console.log('file', file, 'not processed');
            } catch (err) {
                console.log('error', err.message, 'processing', file);
            }            
        })();
    });
});

async function processFile(filename) {
    const json = fs.readFileSync(filename).toString();
    
    const wallet = await Wallet.default.fromV3(json, passphrase);
    
    const address = wallet.getAddressString();
    const privateKey = wallet.getPrivateKeyString();
    
    console.log('address', address);
    console.log('private key', privateKey);    
    
    console.log('sending account to node');
    
    try {
        const result = await host.importPersonalRawKey(privateKey.substring(2), passphrase);
        console.log('account', result, 'sent');
        
        return true;
    }
    catch (err) {
        console.log('error', err);
        return false;
    }
}


