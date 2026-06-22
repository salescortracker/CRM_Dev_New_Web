import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Validation {
 static emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  static phonePattern = /^[6-9]\d{9}$/;
}
