export class NotificationContent {
  private readonly _value;

  constructor(value: string) {
    if (!this.validateContentLength(value))
      throw new Error('Content length error');

    this._value = value;
  }

  private validateContentLength(value: string): boolean {
    return value.length >= 5 && value.length <= 255;
  }

  public get value(): string {
    return this._value;
  }
}
