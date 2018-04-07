import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let window: any;

@Injectable()
export class Web3Provider {
    private _web3: any;

    constructor() {
        if (typeof window.web3 !== 'undefined') {
            this._web3 = new Web3(window.web3.currentProvider);
        } else {
            this._web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
    }

    get() {
        return this._web3;
    }
}
