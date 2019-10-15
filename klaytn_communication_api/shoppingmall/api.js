var manage = require('./manage.js');

var abi = require('./build/contracts/ShoppingMallItem.json');
var bytecode = abi.bytecode;
abi = abi.abi;
var cav = manage.cav;
var item = new cav.klay.Contract(abi);

var api = {
    registerItem: async function(distribution, totalPrice, ownerAddress) {
        if(!this.isValidItem(distribution, totalPrice, ownerAddress)) {
            console.log(distribution);
            console.log(totalPrice);
            console.log(ownerAddress)
            console.log('Invalid type or number of inputs');
            return;
        }
        manage.server.Login();

        await item.deploy({data: bytecode, arguments: [distribution, totalPrice, ownerAddress]})
        .send({from: cav.klay.accounts.wallet[0].address, value: 0, gas: 9990000, gasLimit: 9990000}, (err, txhash) => {
            if (err) {
                console.log(err);
                throw err;
            }
        })
        .on('error', (err) => {
            console.log(err);
            manage.server.clearWallet();
            return;
        })
        .on('receipt', (res) => {
            itemAddress = res.contractAddress;
        })
        
        manage.server.clearWallet();
        return itemAddress;
    },
    isValidItem: function(distribution, totalPrice, ownerAddress) {
        if(ownerAddress[0] != '0' || ownerAddress[1] != 'x') {
            console.log('Address should be started by 0x');
            return;
        }
        return ownerAddress.length == 42 && distribution && totalPrice;
    },
    staking: async function(contractAddress, buyerAddress) {
        if (!contractAddress && buyerAddress) {
            console.log("You missed 1 or 2 arguments!");
            return;
        }
        end = true;
        manage.server.Login();
        item.options.address = contractAddress;
        await item.methods.Staking(buyerAddress)
        .send({from: cav.klay.accounts.wallet[0].addㄴress, gas: 8990000, gasLimit: 8990000, value: 1})
        .then('receipt', (receipt) => {
            if (JSON.parse(receipt)['status'] == false) end = false;
        })
        .then('error', (err) => {
            // console.log(err);
            end = false;
            return;
        })
        manage.server.clearWallet();
        return end;
    },
    getWinner: async function(contractAddress) {
        if (!contractAddress) {
            console.log("You missed contractaddress");
            return;
        }
        let winner;
        manage.server.Login();
        item.options.address = contractAddress;
        console.log(cav.klay.accounts.wallet[0])
        await item.methods.lottery()
        .send({from: cav.klay.accounts.wallet[0].address, gas: 900000, gasLimit: 900000, value: 0})
        .then('receipt', (receipt)=> {
            console.log(receipt);
            if (JSON.parse(receipt)['status'] == false) end = false;
        })
        .then('error', (err) => {
            console.log(err);
            end =false;
            return;
        })
        .then(async () => {
            await item.methods.getWinner()
            .call({from: cav.klay.accounts.wallet[0].address})
            .then((res)=> {
                winner = res;
            })
        })
        .catch((err)=> {
            console.log(err);
        })
        


        manage.server.clearWallet();
        return winner;
    },
    remainTicket: async function(contractAddress) {
        if (!contractAddress) {
            console.log("You missed contractaddress");
            return;
        }
        manage.server.Login();
        item.options.address = contractAddress;
        let number;
    
        await item.methods.remainStaking()
        .call({from: cav.klay.accounts.wallet[0].address})
        .then((res)=> {
            number = res;
        })
        .then()
        manage.server.clearWallet();
        return number;
    }
}

module.exports = api;