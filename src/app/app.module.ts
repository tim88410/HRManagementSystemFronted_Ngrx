import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeavesComponent } from './leaves/leaves.component';

import { leavesReducer } from './store/leaves/leaves.reducer';
import { LeavesEffects } from './store/leaves/leaves.effects';

import { LeavesService } from './leaves/leaves.service';
import { AuthService } from './core/services/auth.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LeaveNameDropdownComponent } from './shared/components/leave-name-dropdown/leave-name-dropdown.component';
import { LeavesEditComponent } from './leaves/leaves-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LeavesComponent,
    LeavesEditComponent,
    LeaveNameDropdownComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ leaves: leavesReducer }),
    EffectsModule.forRoot([LeavesEffects])
  ],
  providers: [
    LeavesService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}