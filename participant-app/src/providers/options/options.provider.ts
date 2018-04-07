import {Injectable} from "@angular/core";
import {OPTIONS} from "./option-list";

@Injectable()
export class OptionsProvider {
    private options: any;

    constructor() {
        this.options = OPTIONS;
    }

    getAllOptions() {
        return this.options;
    }

    getOption(id) {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].id === parseInt(id)) {
                return this.options[i];
            }
        }
        return null;
    }
}