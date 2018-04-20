import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

const prePensionArtifacts = require('../../../../build/contracts/PrePension.json');
import { MockProvider } from '../../providers/mock/mock.provider';
import { Web3Service } from '../../providers/web3/web3.service';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  status;
  input: { amount: string; pension: string } = { amount: '', pension: '' };
  participants: any;
  participant: any;
  suppliers: any;

  private PrePensionContract;
  private accounts;
  private account;

  constructor(public navCtrl: NavController, private web3Service: Web3Service, private mockProvider: MockProvider) {
    // this.start()
    this.loadMockInfo();
  }

  loadMockInfo() {
    this.participants = this.mockProvider.getAllParticipants();
    this.suppliers = this.mockProvider.getAllSuppliers();

    // select participant number 1
    this.participant = this.mockProvider.getParticipant(1);
  }

  start() {
    this.setStatus('Start');

    // console.log(this.PrePension);

    // this.PrePension.deployed().then(
    //   instance => {
    //     this.PrePensionContract = instance;
    //
    //     this.setStatus('PrePension contract set');
    //
    //     this.web3Service.getAccounts().subscribe(
    //       accs => {
    //         if (accs.length === 0) {
    //           this.setStatus("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
    //           return;
    //         }
    //
    //         this.accounts = accs;
    //         this.account = this.accounts[0];
    //
    //         this.refreshBalance();
    //       },
    //       err => {
    //         if (err != null) {
    //           this.setStatus('There was an error fetching your accounts.');
    //           return;
    //         }
    //       }
    //     );
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
  }

  refreshBalance() {
    console.log('Refresh balance');
  }

  updatePension() {
    console.log('Update pension');
  }

  setStatus(message) {
    this.status = message;
  }
}
