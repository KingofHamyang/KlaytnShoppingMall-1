const PrivateKeyConnector = require('connect-privkey-to-provider');
const NETWORK_ID = '1001';
const GASLIMIT = '20000000';
const URL = 'https://api.baobab.klaytn.net:8651';
const PRIVATE_KEY = '0xea7c29d342de7ecc61b214bcb7de6d62e72708315d15df065339d707f3e7513f';

module.exports = {
  networks: {
    klaytn: {
      provider: new PrivateKeyConnector(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null,
    }
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.4.24",
    }
  }
}
