import Caver from "caver-js";
import * as $ from 'jquery';
//-------------------------------------------------------------------------
let abireader = new FileReader();
abireader.readAsDataURL(new File('../../klaytn_communication_api/shoppingmall/build/contracts/ShoppingMallItem.json'))
abireader.onload = (event) => {
  try {
    abi = event;
  } catch(event) {
    return;
  }
}
var abi = new abi();
abi = abi.abi;
const cav = new Caver("https://api.baobab.klaytn.net:8651");
var contract = new cav.klay.Contract(abi);
//----------------------------------------------------------------------------
const App = {
  signUpData : {
    id : '',
    passwd : '',
    publickey: '',
    //----------------------------------------
    keystore: '',
    keypassword: ''
    //---------------------------------------
  },

  start: async function () {

  },

  checkValidKeysotre: function (keystore) {
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
        //밑에 예시보고 따라하면 될듯. event.target.result가 아마 파일 내용인거같음
        //checkValidKeystore 함수 인풋타입 뭔지보면 알 수 있을듯.
        //케이버 불러다가 처리하고 this.signUpData.publickey만 값 assign 해주면댐.
        if(!this.checkValidKeysotre(event.target.result)){
          $('#message').text("유효하지 않은 keystore")
          return;
        }
        this.auth.keystore = event.target.result;
        $('#message').text('keystore 유효함')
        document.querySelector("#input-password").focus();
      }catch(event){
        $('#message').text("keystore login fail")
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
  checkWinner: async function() {
    if (!cav.klay.accounts.wallet[0]) {
      $('#message').text('You have to login to use this function')
      return;
    }

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

window.addEventListener("load", function () {
  App.start();
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