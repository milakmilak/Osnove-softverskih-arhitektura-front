import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KupacRegistrationComponent } from './components/registration/KupacRegistration/kupac-registration.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HeaderComponent } from './components/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProdavacRegistrationComponent } from './components/registration/ProdavacRegistration/prodavac-registration.component';
import { LoginComponent } from './components/login/login.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MojiArtikliComponent } from './components/moji-artikli/moji-artikli.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { OrderCreationComponent } from './components/order-creation/order-creation.component';
import { FormsModule } from '@angular/forms';
import { PravljenjeAkcijeComponent } from './components/pravljenje-akcije/pravljenje-akcije.component';
import { AkcijeComponent } from './components/akcije/akcije.component';
import { KorisniciComponent } from './components/korisnici/korisnici.component';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';


export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    KupacRegistrationComponent,
    HeaderComponent,
    ProdavacRegistrationComponent,
    LoginComponent,
    ArticlesComponent,
    MojiArtikliComponent,
    ArticleDetailsComponent,
    OrderCreationComponent,
    PravljenjeAkcijeComponent,
    AkcijeComponent,
    KorisniciComponent,
    ErrorComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: []
      }
    }),
    NgxSpinnerModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
