import { ProfileComponent } from './components/profile/profile.component';
import { KorisniciComponent } from './components/korisnici/korisnici.component';
import { AkcijeComponent } from './components/akcije/akcije.component';
import { OrderCreationComponent } from './components/order-creation/order-creation.component';
import { MojiArtikliComponent } from './components/moji-artikli/moji-artikli.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { LoginComponent } from './components/login/login.component';
import { ProdavacRegistrationComponent } from './components/registration/ProdavacRegistration/prodavac-registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KupacRegistrationComponent } from './components/registration/KupacRegistration/kupac-registration.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { PravljenjeAkcijeComponent } from './components/pravljenje-akcije/pravljenje-akcije.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { 
    path: ':prodavacUsername/moji-artikli/:artikalId', 
    component: ArticleDetailsComponent 
  },

  { 
    path: ':prodavacUsername/moji-artikli', 
    component: MojiArtikliComponent 
  },

  { 
    path: ':prodavacUsername/kreiraj-artikal', 
    component: ArticleDetailsComponent 
  },

  { 
    path: ':prodavacUsername/kreiraj-akciju', 
    component: PravljenjeAkcijeComponent
  },

  { 
    path: ':kupacUsername/create-order', 
    component: OrderCreationComponent 
  },

  { 
    path: 'artikli/:artikalId', 
    component: ArticleDetailsComponent 
  },

  {
    path: 'profile/:username',
    component: ProfileComponent
  },

  { 
    path: 'registration/kupac', 
    component: KupacRegistrationComponent 
  },

  { 
    path: 'registration/prodavac', 
    component: ProdavacRegistrationComponent 
  },

  { 
    path: 'korisnici/kupci', 
    component: KorisniciComponent 
  },

  { 
    path: 'korisnici/prodavci', 
    component: KorisniciComponent 
  },

  { 
    path: 'login', 
    component: LoginComponent 
  },

  { 
    path: 'akcije', 
    component: AkcijeComponent 
  },

  { 
    path: 'error', 
    component: ErrorComponent 
  },

  { 
    path: '', 
    component: ArticlesComponent 
  }
  // { path: 'order/comment'/*, component: commentOrderComponent*/ },
  // { path: 'order/create'/*, component: createOrderComponent*/ }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
