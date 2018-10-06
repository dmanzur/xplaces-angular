import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UsersService } from './services/users.service';
import { HttpClientModule} from '@angular/common/http';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlacesService} from './services/places.service';
import {FileDropModule} from 'ngx-file-drop';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import { AgmCoreModule } from '@agm/core';
import {ChartsModule} from 'ng2-charts';
import {SlideshowModule} from 'ng-simple-slideshow';
import {keys} from './keys';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FileDropModule,
    ReactiveFormsModule,
    ChartsModule,
    SlideshowModule,
    AgmCoreModule.forRoot({
      apiKey: keys['googleKey'],
      libraries : ['places']
    })
  ],
  providers: [UsersService, PlacesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
