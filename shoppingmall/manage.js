const Caver = require('caver-js');
const fs = require('fs');

const config = {
    rpcURL: 'https://api.baobab.klaytn.net:8651'
}

const cav = new Caver(config.rpcURL);

var server = {
    auth: {
        accessType: 'keystore',
        keystore: '',
        password: ''
    },
    Login: function () {
        const server_keystore = 'keystore-0x0ce0dda43984296caa3c840e44261e6c546a24a9-2019-9-17.json';
        this.auth.password = "`12`12`12";
        data = fs.readFileSync('./'+server_keystore).toString(encoding='utf-8');
        if (!this.checkValidKeysotre(data)) {
            console.log('Invalid keystore!');
            return;
        }
        this.auth.keystore = data;
        if (this.auth.accessType == 'keystore') {
            try{
                var privateKey = cav.klay.accounts.decrypt(this.auth.keystore, this.auth.password).privateKey;
                this.integrateWallet(privateKey);
            } catch(e) {
                console.log('Invalid password');
                return;
            }
        }
    },
    checkValidKeysotre: function (keystore) {
        const parsedKeystore = JSON.parse(keystore);
        const isValidKeystore = parsedKeystore && parsedKeystore.id && parsedKeystore.address && parsedKeystore.crypto;
        return isValidKeystore;
    },
    integrateWallet: function(privateKey) {
        const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey);
        cav.klay.accounts.wallet.add(walletInstance);
    },
    clearWallet: function() {
        cav.klay.accounts.wallet.clear();
    }
}

module.exports = {
    server: server,
    cav: cav
}