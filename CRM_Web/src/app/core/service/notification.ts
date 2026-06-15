import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Notification {
   success(message: string) {
   alert(message);
 }

 error(message: string) {
   alert(message);
 }

 warning(message: string) {
   alert(message);
 }
}
