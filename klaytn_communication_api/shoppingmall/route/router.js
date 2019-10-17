const express = require('express');
const route = express.Router();
const api = require('../api');

route.route('/item')
/*
    input: distribution(number of ticket), totalPrice, ownerAddress
    return: itemAddress(contract address of item)
*/
.post(async(req, res) => {
    var ownerAddress = req.body.ownerAddress;
    var distribution = req.body.distribution;
    var totalPrice = req.body.totalPrice;
    var itemAddress = await api.registerItem(distribution, totalPrice, ownerAddress);
    if (!itemAddress) {
        res.send('process is failed')
    } else {
        res.send({
            'item':itemAddress
        })
    }
})

route.route('/item/person')
/*
    input: contractAddress(item contract address), ownerAddress(item owner address)
    return: winner address
    !!! This request only can sent by the item owner !!!
*/
.put(async (req, res) => {
    var contractAddress = req.body.contractAddress;
    var ownerAddress = req.body.ownerAddress;
    var owner = await api.showOwner(contractAddress);
    if (ownerAddress.toLowerCase() != owner.toLowerCase()) {
        res.send("This request isn't sent by owner");
        return;
    }
    var winner = await api.getWinner(contractAddress);
    if (!winner) {
        res.send('process is failed')
    } else {
        res.send({
            'winner':winner
        })
    }
})
/*
    input: contractAddress(item contract address)
*/
.get(async (req, res) => {
    var contractAddress = req.body.contractAddress;
    var owner = await api.showOwner(contractAddress);
    if (!owner) {
        res.send('process is failed')
    } else {
        res.send({
            'owner':owner
        })
    }
});



route.route('/item/ticket')
/*
    input: contractAddress(item contract address)
    return: remain ticket number
*/
.get(async(req, res) => {
    var contractAddress = req.body.contractAddress;
    var number = await api.remainTicket(contractAddress);
    if (!number) {
        res.send('process is failed')
    } else {
        res.send({
            'number':number
        })
    }   
})
.put(async (req, res) => {
    var contractAddress = req.body.contractAddress;
    var buyerAddress = req.body.buyerAddress;
    var success = await api.staking(contractAddress, buyerAddress);
    res.send(success);
});


module.exports = route