import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { KorisniciService } from 'src/app/services/KorisniciService/korisnici.service';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.scss']
})
export class KorisniciComponent implements OnInit {

  constructor(private service: KorisniciService, private router: Router) { }

  showKupci: boolean = false;
  showProdavci: boolean = false;

  kupci: any;
  prodavci: any;

  checkKupci() {
    if(this.router.url.split('/')[2] === 'kupci') {
      this.showKupci = true;
    }
  }

  checkProdavci() {
    if(this.router.url.split('/')[2] === 'prodavci') {
      this.showProdavci = true;
    }
  }

  public getKupci() {
    this.service.getKupci().then((response) => {
      this.kupci = response;

      console.warn('SVI KUPCI:');
      console.warn(this.kupci);
    });
  }

  public getProdavci() {
    this.service.getProdavci().then((response) => {
      this.prodavci = response;

      console.warn('SVI PRODAVCI:');
      console.warn(this.prodavci);
    })
  }

  public blockKupac(kupacId: string): void {
    this.service.blockKupac(kupacId).then((response) => {
      console.log('NAVODNO BLOKIRANI KUPAC SA ID: ' + kupacId);
      console.log(response);
    });
  }

  public blockProdavac(prodavacId: string): void {
    this.service.blockProdavac(prodavacId).then((response) => {
      console.log('NAVODNO BLOKIRANI PRODAVAC SA ID: ' + prodavacId);
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.checkKupci();
    this.checkProdavci();

    this.getKupci();
    this.getProdavci();
  }

}
