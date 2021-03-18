import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent }  from './auth/auth.component';
import { CoreComponent} from './core/core.component'
import { UpdateComponent} from './update/update.component'
import { InsertComponent} from './insert/insert.component'

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'home', component: CoreComponent},
  {path:'update/:type/:id', component:UpdateComponent },
  {path:'insert/:type', component:InsertComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
