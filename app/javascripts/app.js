// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import prePensionArtifacts from '../../build/contracts/PrePension.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
let PrePension = contract(prePensionArtifacts)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts
let account

window.App = {
  start: function () {
    let me = this

    // Bootstrap the MetaCoin abstraction for Use.
    PrePension.setProvider(web3.currentProvider)

    PrePension.deployed().then(instance => {
      me.PrePensionContract = instance
      debugger

      me.setStatus('PrePension contract set')

      web3.eth.getAccounts(function (err, accs) {
        if (err != null) {
          me.setStatus('There was an error fetching your accounts.')
          return
        }

        if (accs.length === 0) {
          me.setStatus("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
          return
        }

        accounts = accs
        account = accounts[0]

        me.refreshBalance()
      })
    })
  },

  refreshBalance : function () {
    console.log('Refresh balance')
  },

  updatePension : function () {
    console.log('Update pension')
  },

  setStatus: function (message) {
    let status = document.getElementById('status')
    status.innerHTML = message
  }
}

window.addEventListener('load', function () {
  window.web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'))
  window.App.start()
})
