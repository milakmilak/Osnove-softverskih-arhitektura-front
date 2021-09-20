import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from './../../services/ArticleService/article.service';
import { Article } from './../../types/Article';
import { ProdavacService } from './../../services/ProdavacService/prodavac.service';
import { Component, OnInit } from '@angular/core';
import { Prodavac } from 'src/app/types/Prodavac';

@Component({
  selector: 'app-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.scss']
})
export class OrderCreationComponent implements OnInit {

  porudzbinaForm = new FormGroup ({
    naziv: new FormControl(''),
    kolicina: new FormControl(''),
    cenaKomada: new FormControl(''),
    ukupnaCena: new FormControl('')
  })

  constructor(private prodavacService: ProdavacService, private articleService: ArticleService) { }

  prodavci: Prodavac[] = [];
  artikliOdabranogProdavca: Article[] = [];

  prodavacId: any = '';
  odabraniArtikli: any;

  quantity: number = 0;
  cena: any;

  show: boolean = false;
  buttonShow: boolean = true;
  showMainDiv: boolean = true;
  showFinalOrder: boolean = false;

  public racun(): void {
    console.log(this.odabraniArtikli);
    this.showMainDiv = false;
    this.showFinalOrder = true;
  }

  getProdavci(): void {
    this.prodavacService.getProdavci().then((response) => {
      console.log('PRODAVCI:')
      console.log(response);
      this.prodavci = response;
    })
  }

  getArtikliProdavcaByProdavacUsername(prodavacUsername: string): void {
    this.articleService.getArticlesByUsername(prodavacUsername).then((response) => {
      console.log('ARTIKLI PRODAVCA:')
      console.log(response);
      this.artikliOdabranogProdavca = response;
      this.buttonShow = false;
    })
  }

  public getProdavacId(): any {
    this.prodavacId = document.getElementById('prodavacId')?.getAttribute('value');
    return document.getElementById('prodavacId')?.getAttribute('value');
  }

  public display(): void {
    this.show = true;
  }

  public updatePrice(id: any) {
    this.cena = //Number(document.getElementById('kolicina')?.getAttribute('value')) * Number(document.getElementById('cenaArtikla' + id)?.getAttribute('value'));
    
    console.warn('KOLICINA ARTIKLA SA ID-em:' + id);
    console.warn(document.getElementById('kolicina'));
    console.warn('----------------------')
    console.warn('CENA ARTIKLA SA ID-em:' + id);
    console.warn(document.getElementById('cenaArtikla' + id)?.getAttribute('value'));
    console.warn('----------------------')
  }
  
  ngOnInit(): void {
    this.getProdavci();
  }

}
