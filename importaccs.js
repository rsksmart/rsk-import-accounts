
const fs = require('fs');
const path = require('path');
const Wallet = require('ethereumjs-wallet');
const rskapi = require('rskapi');

const directoryPath = process.argv[2];
const passphraseFile = process.argv[3];
const host = rskapi.host(process.argv[4]);

// read the passphrase from file
const passphrase = fs.readFileSync(passphraseFile).toString().trim();

//joining path of directory 
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    
    // process all filenames, one by one
    
    let k = 0;
    
    processFilename();
    
    function processFilename() {
        if (k >= files.length)
            return;
        
        const file = files[k];
        
        console.log('processing file', file);
        
        const filename = path.join(directoryPath, file);
        
        (async function () {
            try {
                const result = await processFile(filename);
            } catch (err) {
                console.log('error', err.message, 'processing', file);
            }
            
            k++;
            
            processFilename();
        })();
    };
});

async function processFile(filename) {
    const json = fs.readFileSync(filename).toString();
    
    const wallet = await Wallet.default.fromV3(json, passphrase);
    
    const address = wallet.getAddressString();
    const privateKey = wallet.getPrivateKeyString();
    
    try {
        const result = await host.importPersonalRawKey(privateKey.substring(2), passphrase);
        console.log('account', result, 'imported into node');
        
        return true;
    }
    catch (err) {
        console.log('error', err);
        return false;
    }
}


