import { Component, inject } from '@angular/core';
import { UserSummary } from 'src/app/models';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  userSvc = inject(UserService);
  users : UserSummary[] = [];

  ngOnInit(){
    this.userSvc.loadUsers().then((array) => {
      this.users = array;
    }
    )
  }
}
