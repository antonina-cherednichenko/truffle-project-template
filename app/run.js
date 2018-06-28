var contract = require('truffle-contract')
var Web3 = require('web3');


let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var TestC = contract(require('../build/contracts/Test.json'))
TestC.setProvider(web3.currentProvider)
//dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
if (typeof TestC.currentProvider.sendAsync !== "function") {
  TestC.currentProvider.sendAsync = function() {
    return TestC.currentProvider.send.apply(
      TestC.currentProvider, arguments
    );
  };
}

let accounts;
// Get the initial accounts
web3.eth.getAccounts(function(err, accs) {
  if (err != null) {
    console.error("There was an error fetching your accounts.");
    return;
  }

  if (accs.length == 0) {
    console.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
    return;
  }

  accounts = accs;
  console.log("accounts = ", accounts)
})
