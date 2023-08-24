import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { User, UserSummary } from './models';
import { ulid } from 'ulid';

@Injectable({
  providedIn: 'root',
})
export class UserService extends Dexie {
  userCollection: Dexie.Table<User, string>;

  constructor() {
    //database name
    super('userdb');

    //construct the collection
    this.version(1).stores({
      //primary key only
      user: 'userId',
    });

    //assign dexie table to variable
    this.userCollection = this.table('user');
  }

  save(data: User) {
    data.userId = ulid();
    return this.userCollection.add(data);
  }

  loadUsers(): Promise<UserSummary[]> {
    return this.userCollection.toArray().then((data) =>
      data.map((u) => {
        return { userId: u.userId, name: u.name };
      })
    );
  }

  //add function to load single user details
  findUserById(id: string) {
    return this.userCollection.get(id).then((data) => {
      if (data) {
        return data;
      }
      return null;
    });
  }
}
