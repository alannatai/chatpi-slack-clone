export class ApiException {
  constructor(status, message) {
    this.status = status;
    this.message = message;
    this.name = 'ApiException';
  }
}
