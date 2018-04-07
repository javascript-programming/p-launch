import {Injectable} from "@angular/core";
import {PARTICIPANTS} from "./mock-participants";
import {PRODUCTS} from "./mock-products";
import {SUPPLIERS} from "./mock-suppliers";


@Injectable()
export class MockProvider {
    private participants: any;
    private products: any;
    private suppliers: any;

    constructor() {
        this.participants = PARTICIPANTS;
        this.products = PRODUCTS;
        this.suppliers = SUPPLIERS;
    }

    getAllParticipants() {
        return this.participants;
    }

    getParticipant(id) {
        for (var i = 0; i < this.participants.length; i++) {
            if (this.participants[i].id === parseInt(id)) {
                return this.participants[i];
            }
        }
        return null;
    }

    getAllProducts() {
        return this.products;
    }

    getProduct(id) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id === parseInt(id)) {
                return this.products[i];
            }
        }
        return null;
    }

    getFirstProductFromOption(option_id) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].option_id === parseInt(option_id)) {
                return this.products[i];
            }
        }
        return null;
    }

    getAllSuppliers() {
        return this.suppliers;
    }

    getSupplier(id) {
        for (var i = 0; i < this.suppliers.length; i++) {
            if (this.suppliers[i].id === parseInt(id)) {
                return this.suppliers[i];
            }
        }
        return null;
    }

}