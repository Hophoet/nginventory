import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { InsertComponent } from './insert/insert.component';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    AuthComponent,
    UpdateComponent,
    InsertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
