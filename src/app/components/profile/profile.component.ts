import { TokenService } from './../../services/TokenService/token.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { KorisniciService } from 'src/app/services/KorisniciService/korisnici.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  promenaPodatakaKupcaForm = new FormGroup({
    imeKupca: new FormControl(''),
    prezimeKupca: new FormControl(''),
    newUsernameKupca: new FormControl(''),
    oldPasswordKupca: new FormControl(''),
    newPasswordKupca: new FormControl(''),
    repeatedPasswordKupca: new FormControl('')
  });

  promenaPodatakaProdavcaForm = new FormGroup({
    imeProdavca: new FormControl(''),
    prezimeProdavca: new FormControl(''),
    newUsernameProdavca: new FormControl(''),
    oldPasswordProdavca: new FormControl(''),
    newPasswordProdavca: new FormControl(''),
    repeatedPasswordProdavca: new FormControl('')
  });

  constructor(private service: KorisniciService, private tokenService: TokenService, private router: Router) { }

  kupac: any;
  isKupac: boolean = false;

  prodavac: any;
  isProdavac: boolean = false;

  getRole(): string {
    return this.tokenService.getRoleFromJwt(this.tokenService.getToken());
  }

  findUser() {
    const username = this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
    if(this.getRole() === 'ROLE_KUPAC') {
      this.service.getKupac(username).then((response) => {
        this.kupac = response;
        this.isKupac = true;
      })
    }

    if(this.getRole() === 'ROLE_PRODAVAC') {
      this.service.getProdavac(username).then((response) => {
        this.prodavac = response;
        this.isProdavac = true;
      })
    }
  }

  public updateProdavac() {
    let request = new FormData();

    request.append('ime', this.promenaPodatakaProdavcaForm.value.imeProdavca);
    request.append('prezime', this.promenaPodatakaProdavcaForm.value.prezimeProdavca);
    request.append('newUsername', this.promenaPodatakaProdavcaForm.value.newUsernameProdavca);
    request.append('newPassword', bcrypt.hashSync(this.promenaPodatakaProdavcaForm.value.newPasswordProdavca, 10));

    if(bcrypt.compare(this.promenaPodatakaProdavcaForm.value.oldPasswordProdavca, this.prodavac.password) && (this.promenaPodatakaProdavcaForm.value.newPasswordProdavca === this.promenaPodatakaProdavcaForm.value.repeatedPasswordProdavca)) {
      this.service.updateProdavac(this.tokenService.getUsernameFromJwt(this.tokenService.getToken()), request)
      .then((response) => {
        console.log(response);
      })
    }
  }

  public updateKupac() {
    let request = new FormData();

    request.append('ime', this.promenaPodatakaKupcaForm.value.imeKupca);
    request.append('prezime', this.promenaPodatakaKupcaForm.value.prezimeKupca);
    request.append('newUsername', this.promenaPodatakaKupcaForm.value.newUsernameKupca);
    request.append('newPassword', bcrypt.hashSync(this.promenaPodatakaKupcaForm.value.newPasswordKupca, 10));

    if(bcrypt.compare(this.promenaPodatakaKupcaForm.value.oldPasswordKupca, this.kupac.passwordKupca) && (this.promenaPodatakaKupcaForm.value.newPasswordKupca === this.promenaPodatakaKupcaForm.value.repeatedPasswordKupca)) {
      this.service.updateKupac(this.tokenService.getUsernameFromJwt(this.tokenService.getToken()), request)
      .then((response) => {
        console.log(response);
      })
    }
  }

  ngOnInit(): void {
    this.findUser();
  }

}
