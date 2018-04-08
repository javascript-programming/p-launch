import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import contract from 'truffle-contract';
const prePensionArtifacts = require('../../../../build/contracts/PrePension.json');


declare var window: any;

@Injectable()
export class Web3Service {

	public web3: any;
  private PrePension;
  private PrePensionContract;
  private Accounts
  private gas = 6721970;

  constructor() {
  	this.checkAndInstantiateWeb3();
  }

  private checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)

  };

  fixContractProvider (contract) {
    if (typeof contract.currentProvider.sendAsync !== 'function') {
      contract.currentProvider.sendAsync = function () {
        return contract.currentProvider.send.apply(
          contract.currentProvider, arguments
        )
      }
    }
  }

  init(){
    // @Terence, do your magic
    let me = this;
    var Web3 = require('web3');
    me.web3 = new Web3('ws://5.157.85.76:8546');
    window.web3 = me.web3;
    me.PrePension = contract(prePensionArtifacts);
    me.PrePension.setProvider(me.web3.currentProvider);
    me.fixContractProvider(me.PrePension);

    me.PrePension.deployed().then(
      instance => {
        me.PrePensionContract = instance;
        window.contract = instance;
        me.web3.eth.getAccounts((err, acc) => {
          me.Accounts = acc;
          me.addDummyData(() => {
            console.log('dummy data added')
          });
        })
      }
    );
  }

  addDummyData(callback) {
    let me = this;
      me.web3.personal.unlockAccount(me.Accounts[1], '123').then(function () {
        console.log('lock');
        me.PrePensionContract.addPension(me.Accounts[1], 'APG', {from: me.Accounts[1], gas: me.gas}).then(transaction => {
          me.PrePensionContract.addSupplier(me.Accounts[2], 'RUG', {
            from: me.Accounts[1],
            gas: me.gas
          }).then(transaction => {
            me.PrePensionContract.addSupplier(me.Accounts[3], 'Reaal', {
              from: me.Accounts[1],
              gas: me.gas
            }).then(transaction => {
              me.PrePensionContract.addSupplier(me.Accounts[4], 'Solar Panel .inc', {
                from: me.Accounts[1],
                gas: me.gas
              }).then(transaction => {
                me.PrePensionContract.addParticipant(me.Accounts[0], 'Bart de jong', {from: me.Accounts[1], gas: me.gas}).then(transaction => {
                  console.log('Here')
                  me.PrePensionContract.mint("APG", "Bart de Jong", 126000, {from: me.Accounts[1], gas: me.gas});
                }).then(() => callback());
              });
            });
          });
        });
      })

  }

  getAccounts(): Observable<any>{
  	return Observable.create(observer => {
  	  this.web3.eth.getAccounts((err, accs) => {
  	    if (err != null) {
  	      observer.error('There was an error fetching your accounts.')
  	    }

  	    if (accs.length === 0) {
  	      observer.error('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
  	    }

  	    observer.next(accs)
  	    observer.complete()
  	  });
  	})
  }

  // get Participant =>
  // 1) Creat fake participant => iD => pension.nu.001
  // 2) getParticipant('pension.nu.001')
}
