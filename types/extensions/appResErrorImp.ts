// src/appResError.ts

export class AppResError extends Error {
    statusCode?: number;
  
    constructor(status: number, message: string) {
      super(message);
      this.statusCode = status;
  
      // שמירה על המחסנית של השגיאה
      Object.setPrototypeOf(this, AppResError.prototype);
    }
}
  