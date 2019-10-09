import Caver from "caver-js";
import * as $ from 'jquery';
import ShoppingMallItemaAbi from './ShoppingMallItemABI';
//-------------------------------------------------------------------------

const cav = new Caver("https://api.baobab.klaytn.net:8651");


//----------------------------------------------------------------------------

const CaverUtil = {
    start: async function () {

    },
    checkWinner: async function(item_address) {
        var contract = new cav.klay.Contract(ShoppingMallItemaAbi.abi);
        if (!cav.klay.accounts.wallet[0]) {
            alert('You have to login to use this function')
            return;
        }
        let winner = 0x0;
        
        contract.options.address = item_address;
        await contract.methods.getWinner()
        .call({from: cav.klay.accounts.wallet[0].address})
        .then((res) => {
            winner = res;
        })
        if (winner == 0x0) {
            alert('This item\'s owner isn\'t decided')
            return;
        }else {
            alert('Owner is ' + winner.toString())
            return;
        }
        contract.options.address = 0x0;
    }

}
const App = {
  signUpData : {
    id : '',
    passwd : '',
    walletaddress: '',
  },
  auth : {
    keystore: '',
    keypassword: ''
  },
  start: async function () {

  },

  checkValidKeystore: function (keystore) {
    const parsedKeystore = JSON.parse(keystore);
    const isValidKeystore = parsedKeystore && parsedKeystore.id && parsedKeystore.address && parsedKeystore.crypto;
    return isValidKeystore;
  },

  handleKeystoreChange: async function () {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0])
    fileReader.onload = (event) => {
      //-------------------------------------------------------------------------------
      try{
        if(!this.checkValidKeystore(event.target.result)){
          alert("keystore 유효하지 않음")
        }
        this.auth.keystore = event.target.result;
        alert('keystore 유효함')
      }catch(event){
        alert("keystore login fail")
        return;
      }
      //-----------------------------------------------------------------------------------
    }
  },

  handlePassword: async function () {
    this.signUpData.password = event.target.value;
  },
  handleKeyPassword: async function () {
    this.signUpData.keypassword = event.target.value;
  },
  handleId: async function () {
    this.signUpData.id = event.target.value;
  },
  //---------------------------------------------------------------------------
  integrateWallet: function(privateKey) {
    const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey);
    cav.klay.accounts.wallet.add(walletInstance);
  },
  clearWallet: function() { // PLEASE USE AT LOGOUT
    cav.klay.accounts.wallet.clear();
  },
  
  //------------------------------------------------------------------------------

  submit: async function () {
    //----------------------------------------------------------------------------
    // wallet integrate
    try{
      var privateKey = cav.klay.accounts.decrypt(this.auth.keystore, this.auth.password).privateKey;
      this.integrateWallet(privateKey);
      console.log('wallet integration success');
    } catch(event) {
      console.log(event);
      return;
    }
    this.signUpData.walletaddress = cav.klay.accounts.wallet[0].address
    //------------------------------------------------------------------------------
    
    $.ajax({
        url: '#', //회원가입 url
        type: 'POST',
        date : this.signUpData,
        dataType : 'json',
        success : function (data){
            alert(data)
        }
    })
  }
};

window.App = App;
window.CaverUtil = CaverUtil

window.addEventListener("load", function () {
  App.start();
  CaverUtil.start();
});

var opts = {
  lines: 10, // The number of lines to draw
  length: 30, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#5bc0de', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  position: 'absolute' // Element positioning
};