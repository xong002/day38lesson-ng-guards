import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserSummary } from 'src/app/models';
import { StorageService } from 'src/app/storage.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  fb = inject(FormBuilder);
  form!: FormGroup;
  svc = inject(StorageService);
  userSvc = inject(UserService);
  router = inject(Router);


  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control<string>('', Validators.required),
      email: this.fb.control<string>('', [
        Validators.email,
        Validators.required,
      ]),
    });


  }

  process() {
    const value: User = this.form.value;
    // this.svc.save(value);
    this.userSvc.save(this.form.value).then((id) => {
      console.log(id);
      this.form.reset();
      this.router.navigate(['/']);
    });
  }
}
