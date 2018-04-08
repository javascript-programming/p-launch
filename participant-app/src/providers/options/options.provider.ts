import { Injectable } from '@angular/core';
import { OPTIONS } from './option-list';

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
    return this.options.filter(option => option.id === parseInt(id, 10));
  }
}
