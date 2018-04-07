import {Injectable} from "@angular/core";

@Injectable()
export class PurchaseProvider {
    private purchased: any;

    constructor() {
        this.purchased = false;
    }

    purchaseProduct(product) {
        this.purchased = true;
    }

    isPurchased() {
        return this.purchased;
    }
}