import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { KupacRegistrationRequest } from '../../../types/KupacRegistrationRequest';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './kupac-registration.component.html',
  styleUrls: ['./kupac-registration.component.scss']
})
export class KupacRegistrationComponent implements OnInit {

  kupacRegistrationForm = new FormGroup({
    ime: new FormControl(''),
    prezime: new FormControl(''),
    adresa: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    repeatedPassword: new FormControl('')
  })

  registrationUrl = environment.baseUrl + '/registration/kupac';

  constructor(private http: HttpClient, private router: Router) { }

  getRepeatedPassword(): string {
    return this.kupacRegistrationForm.value.repeatedPassword;
  }

  getRegistrationData(): KupacRegistrationRequest {
    let request: KupacRegistrationRequest = {
      ime: this.kupacRegistrationForm.value.ime,
      prezime: this.kupacRegistrationForm.value.prezime,
      adresa: this.kupacRegistrationForm.value.adresa,
      username: this.kupacRegistrationForm.value.username,
      password: this.kupacRegistrationForm.value.password
    };

    return request;
  }

  public register(): void {
    if(this.getRegistrationData().password === this.getRepeatedPassword()) {
      this.http.post(this.registrationUrl, this.getRegistrationData()).toPromise().then(response => console.log(response));
      this.router.navigate(['/']);

      return;
    }

    console.log('Password\'s do not match!!!');
  }

  ngOnInit(): void {
  }

}
