import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import contract from 'truffle-contract';
const prePensionArtifacts = require('../../../../build/contracts/PrePension.json');


const Web3 = require('web3');

declare var window: any;

@Injectable()
export class Web3Service {

	public web3: any;
  private PrePension = contract(prePensionArtifacts);
  private PrePensionContract;
  private Accounts
  private gas = 6721970;

  constructor() {
  	this.checkAndInstantiateWeb3();
  }

  private checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to ${environment.HttpProvider}. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://127.0.0.1:7545')
      );
    }
  };

  init(){
    // @Terence, do your magic
    let me = this;
    me.PrePension.setProvider(me.web3.currentProvider);

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
