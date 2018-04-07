import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import prePensionArtifacts from '../../../../build/contracts/PrePension.json'
import contract from 'truffle-contract'

import { Web3Service } from '../../providers/web3/web3.service';

declare var window: any;

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
    private PrePension = contract(prePensionArtifacts)
    private PrePensionContract;
    private accounts;
    private account;

  constructor(public navCtrl: NavController,
              private web3Service: Web3Service) {

  }

    start () {

        // Bootstrap the MetaCoin abstraction for Use.
        this.PrePension.setProvider(this.web3Service.web3.currentProvider)

        this.PrePension.deployed().then(instance => {
            this.PrePensionContract = instance

            this.setStatus('PrePension contract set')

            this.web3Service.getAccounts().subscribe((accs) => {


                if (accs.length === 0) {
                    this.setStatus("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
                    return
                }

                this.accounts = accs
                this.account = this.accounts[0]

                this.refreshBalance()
            }, (err) => {
                if (err != null) {
                    this.setStatus('There was an error fetching your accounts.')
                    return
                }
            })
        })
    }

    refreshBalance () {
        console.log('Refresh balance')
    }

    updatePension () {
        console.log('Update pension')
    }

    setStatus (message) {
        let status = document.getElementById('status')
        status.innerHTML = message
    }

}
