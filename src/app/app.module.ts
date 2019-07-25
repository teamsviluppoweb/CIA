import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/modules/shared.module';
import {CoreModule} from './core';
import { UserComponent } from './layouts/user/user.component';
import { GuestComponent } from './layouts/guest/guest.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    GuestComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
