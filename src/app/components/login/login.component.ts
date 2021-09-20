import { Router } from '@angular/router';
import { TokenService } from './../../services/TokenService/token.service';
import { AuthService } from './../../services/AuthService/auth.service';
import { AuthenticationRequest } from './../../types/AuthenticationRequest';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { KorisniciService } from 'src/app/services/KorisniciService/korisnici.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  showRegistrationType: boolean = false;
  showLogin: boolean = true;

  constructor(private service: AuthService, private userService: KorisniciService, private tokenService: TokenService, private router: Router) { }

  getLoginData(): AuthenticationRequest {
    let request: AuthenticationRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    return request;
  }

  public login(): void {
    /*if(!this.isKupacBlocked(this.loginForm.value.username)) {
      console.warn('IS KUPAC BLOCKED????')
      console.warn(this.isKupacBlocked(this.loginForm.value.username));
      this.router.navigate(['/error']);
      return;
    }
    if(this.isProdavacBlocked(this.loginForm.value.username)) {
      console.warn('IS PRODAVAC BLOCKED?????')
      console.warn(this.isProdavacBlocked(this.loginForm.value.username));
      this.router.navigate(['/error']);
      return;
    }*/

    this.service.authenticate(this.getLoginData()).then((response) => {
      this.tokenService.setToken(response.body);
      this.router.navigate(['/']);
    });
  }

  changeShowLogin(): void {
    this.showLogin = !this.showLogin;
  }

  changeShowRegistrationType(): void {
    this.showRegistrationType = !this.showRegistrationType;
    this.changeShowLogin();
  }

  isKupacBlocked(username: string): boolean {
    this.userService.getKupac(username).then((response) => {
      if(response.isBlokiran) {
        return true;
      }

      return false;
    });

    return false;
  }

  isProdavacBlocked(username: string): boolean {
    this.userService.getProdavac(username).then((response) => {
      if(response.isBlokiran) {
        return true;
      }

      return false;
    })

    return false;
  }


  ngOnInit(): void {
  }

}
