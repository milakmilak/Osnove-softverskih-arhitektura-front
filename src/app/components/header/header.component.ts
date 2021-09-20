import { LogoutService } from './../../services/LogoutService/logout-service.service';
import { Router } from '@angular/router';
import { TokenService } from './../../services/TokenService/token.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenService: TokenService, private logoutService: LogoutService, private router: Router) { }

  isNavbarFixed: boolean = false;

  @HostListener('window:scroll', ['$event']) onScroll() {
    if(window.scrollY > 100) {
      this.isNavbarFixed = true;
    } else {
      this.isNavbarFixed = false;
    }
  }

  public login() {
    this.router.navigate(['/login']);
  }

  public logout() {
    this.logoutService.logout();
  }

  public isAnyoneLoggedIn(): boolean {
    return this.tokenService.isAuthenticated();
  }

  public isProdavacLoggedIn(): boolean {
    const jwt = this.tokenService.getToken();

    if(this.tokenService.isAuthenticated()) {
      const role = this.tokenService.getRoleFromJwt(jwt);
      if(role === 'ROLE_PRODAVAC') {
        return true;
      }
    }

    return false;
  }

  public isKupacLoggedIn(): boolean {
    const jwt = this.tokenService.getToken();

    if(this.tokenService.isAuthenticated()) {
      const role = this.tokenService.getRoleFromJwt(jwt);
      if(role === 'ROLE_KUPAC') {
        return true;
      }
    }

    return false;
  }

  public showMojiArtikli() {
    if(this.isProdavacLoggedIn()) {
      const prodavacUsername = this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
      this.router.navigate(['/' + prodavacUsername + '/moji-artikli']);
    }
  }

  public kreirajArtikal() {
    if(this.isProdavacLoggedIn()) {
      const prodavacUsername = this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
      this.router.navigate(['/' + prodavacUsername + '/kreiraj-artikal']);
    }
  }

  public kreirajAkciju() {
    if(this.isProdavacLoggedIn()) {
      const prodavacUsername = this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
      this.router.navigate(['/' + prodavacUsername + '/kreiraj-akciju']);
    }
  }

  public porudzbine() {
    if(this.isKupacLoggedIn()) {
      const kupacUsername = this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
      this.router.navigate(['/' + kupacUsername + '/poruzbine']);
    }
  }

  public akcije() {
    if(this.isKupacLoggedIn()) {
      const kupacUsername = this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
      this.router.navigate(['/akcije']);
    }
  }

  public kreirajPorudzbinu() {
    if(this.isKupacLoggedIn()) {
      const kupacUsername = this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
      this.router.navigate(['/' + kupacUsername + '/create-order']);
    }
  }

  public kupacProfile() {
    if(this.isKupacLoggedIn()) {
      const kupacUsername = this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
      this.router.navigate(['/profile/' + kupacUsername]);
    }
  }

  public prodavacProfile() {
    if(this.isProdavacLoggedIn()) {
      const prodavacUsername = this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
      this.router.navigate(['/profile/' + prodavacUsername]);
    }
  }

  ngOnInit(): void {
  }

}
