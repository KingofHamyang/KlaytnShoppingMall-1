const express = require('express');
const route = express.Router();
const api = require('../api');

route.route('/item')
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
.get(async (req, res) => {
    var contractAddress = req.body.contractAddress;
    var winner = await api.getWinner(contractAddress);
    if (!winner) {
        res.send('process is failed')
    } else {
        res.send({
            'winner':winner
        })
    }
})
.put(async (req, res) => {
    var contractAddress = req.body.contractAddress;
    var buyerAddress = req.body.buyerAddress;
    var success = await api.staking(contractAddress, buyerAddress);
    res.send(success);
})
route.route('/item/ticket')
.get(async(req, res) => {
    var contractAddress = req.body.contractAddress;
    var number = await api.remainTicket(contractAddress);
    console.log(number);
    if (!number) {
        res.send('process is failed')
    } else {
        res.send({
            'number':number
        })
    }   
})


module.exports = route