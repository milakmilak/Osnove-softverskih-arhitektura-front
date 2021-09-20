import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ProdavacRegistrationRequest } from 'src/app/types/ProdavacRegistrationRequest';

@Component({
  selector: 'app-prodavac-registration',
  templateUrl: './prodavac-registration.component.html',
  styleUrls: ['./prodavac-registration.component.scss']
})
export class ProdavacRegistrationComponent implements OnInit {

  prodavacRegistrationForm = new FormGroup({
    ime: new FormControl(''),
    prezime: new FormControl(''),
    email: new FormControl(''),
    adresa: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    repeatedPassword: new FormControl(''),
    naziv: new FormControl('')
  })

  registrationUrl = environment.baseUrl + '/registration/prodavac';

  constructor(private http: HttpClient, private router: Router) { }

  getRepeatedPassword(): string {
    return this.prodavacRegistrationForm.value.repeatedPassword();
  }

  getRegistrationData(): ProdavacRegistrationRequest {
    let request: ProdavacRegistrationRequest = {
      ime: this.prodavacRegistrationForm.value.ime,
      prezime: this.prodavacRegistrationForm.value.prezime,
      email: this.prodavacRegistrationForm.value.email,
      adresa: this.prodavacRegistrationForm.value.adresa,
      username: this.prodavacRegistrationForm.value.username,
      password: this.prodavacRegistrationForm.value.password,
      naziv: this.prodavacRegistrationForm.value.naziv
    };

    return request;
  }

  public register(): void {
    if(this.getRegistrationData().password === this.prodavacRegistrationForm.value.password) {
      this.http.post(this.registrationUrl, this.getRegistrationData()).toPromise().then(response => console.log(response));
      this.router.navigate(['/']);

      return;
    }

    console.log('Password\'s do not match!!!');
  }

  ngOnInit(): void {
  }

}
