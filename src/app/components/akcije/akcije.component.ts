import { Article } from 'src/app/types/Article';
import { AkcijaService } from './../../services/AkcijaService/akcija.service';
import { ProdavacService } from 'src/app/services/ProdavacService/prodavac.service';
import { Prodavac } from 'src/app/types/Prodavac';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-akcije',
  templateUrl: './akcije.component.html',
  styleUrls: ['./akcije.component.scss']
})
export class AkcijeComponent implements OnInit {

  constructor(private service: AkcijaService, private prodavacService: ProdavacService) { }

  showIzborProdavaca: boolean = true;
  showListaAkcija: boolean = false;
  showListaArtikala: boolean = false;

  myAkcijaSelect: any;
  myProdavacSelect: any;

  odabranaAkcijaId: any;
  procenat: number = 10;

  prodavci: Prodavac[] = [];
  artikliNaAkciji = null;
  akcijeOdabranogProdavca: any;
  prodavacId: any = '';
  akcijaId: any = '';

  getProdavci(): void {
    this.prodavacService.getProdavci().then((response) => {
      console.log('PRODAVCI:')
      console.log(response);
      this.prodavci = response;
    })
  }

  public getProdavacId(): any {
    this.prodavacId = document.getElementById('prodavacId')?.getAttribute('value');
    return document.getElementById('prodavacId')?.getAttribute('value');
  }

  getAkcijeProdavcaByProdavacUsername(prodavacUsername: string): void {
    this.service.getAkcijeByProdavacUsername(prodavacUsername).then((response) => {
      console.log('AKCIJE PRODAVCA ' + prodavacUsername + ': ');

      this.akcijeOdabranogProdavca = response;

      this.akcijeOdabranogProdavca = response.filter((akcija: any) => {
        console.log('TRENUTNI ID AKCIJE KOJA JE U FILTERU:' + akcija.id);
        if(new Date(akcija.doKad) > new Date()) {
          console.warn(akcija.id);
          return akcija;
        }
      });

      this.showIzborProdavaca = false;
      this.showListaAkcija = true;
    })
  }

  public getAkcijaId(): any {
    this.akcijaId = document.getElementById('akcijaId')?.getAttribute('value');
    return document.getElementById('akcijaId')?.getAttribute('value');
  }

  public getArtikliAkcije(akcijaId: string) {
    this.service.getArtikliAkcijeById(akcijaId).then((response) => {
      this.artikliNaAkciji = response;
      console.warn(this.artikliNaAkciji);
      this.showListaAkcija = false;
      this.showListaArtikala = true;
    });
  }

  public selectAkcijaChange() {
    console.log('AKCIJA SELECT CHANGE: ');
    console.log(this.myAkcijaSelect);
    this.odabranaAkcijaId = this.myAkcijaSelect;
    this.getArtikliAkcije(this.myAkcijaSelect);
    console.log(this.getAkcijaPopust());
  }

  public selectProdavacChange() {
    console.log('PRODAVAC SELECT CHANGE: ');
    console.log(this.myProdavacSelect);
    this.getAkcijeProdavcaByProdavacUsername(this.myProdavacSelect);
  }

  getAkcijaPopust() {
    this.service.getAkcijaById(this.myAkcijaSelect).then((response) => {
      this.procenat = response.procenat;
      return this.procenat;
    })
  }

  ngOnInit(): void {
    this.getProdavci();
  }

}
