import { clientError } from './clientError.js';

export class InputError extends clientError {
  constructor(message) {
    super(message);
    this.name = 'InputError';
  }
}