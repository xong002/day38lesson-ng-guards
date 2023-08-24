import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FormComponent } from './components/form/form.component';
import { checkForDirtyForm, checkUser } from './components/guards';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: MainComponent, title: 'Main' },
  { path: 'form', component: FormComponent, title: 'Form', canDeactivate: [checkForDirtyForm]},
  { path : 'form/:userId', component: FormComponent, canActivate: [checkUser]},
  { path: 'notfound', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
