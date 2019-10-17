var api = require('./api');

async function test(){
    await api.registerItem(1000,1000,'0x0ce0dda43984296caa3c840e44261e6c546a24a9')
    .then((res)=> {
        console.log(res);
        return res;
    })
    .then(async (res)=> {
        console.log('staking start');
        await api.staking(res, '0x0ce0dda43984296caa3c840e44261e6c546a24a9');
        await api.staking(res, '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c');
        await api.staking(res, '0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C');
        await api.staking(res, '0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB');
        return res;
    })
    .then(async (res)=> {
        console.log('remain staking ticket start');
        await api.remainTicket(res)
        .then((num)=> {
            console.log('remained ticket is ' + num)
        })
        return res;
    })
    .then(async (res)=> {
        console.log('getwinner start')
        await api.getWinner(res)
        .then((winner)=> {
            console.log('winner is '+ winner);
            return winner;
        })
    })
    .catch((err)=> {
        console.log(err);
    })
}

test();