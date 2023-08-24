import { Injectable } from '@angular/core';
import { User } from './models';
import { ulid } from 'ulid';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  
  save(user: User) {
    const id = ulid();
    console.log(id);
    //will persist if window closed
    // localStorage.setItem(id, JSON.stringify(user));
    
    //only for session, if closed will clear
    sessionStorage.setItem(id, JSON.stringify(user));
  }

  load(id: string): User | null {
    const data = localStorage.getItem(id);
    if (!data) return null;
    return JSON.parse(data) as User;
  }

  remove(id: string) {
    localStorage.removeItem(id);
  }
}
