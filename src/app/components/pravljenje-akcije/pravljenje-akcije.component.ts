import { Router } from '@angular/router';
import { AkcijaService } from './../../services/AkcijaService/akcija.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TokenService } from './../../services/TokenService/token.service';
import { ArticleService } from './../../services/ArticleService/article.service';
import { Article } from './../../types/Article';
import { Component, OnInit } from '@angular/core';
import { ProdavacService } from 'src/app/services/ProdavacService/prodavac.service';

@Component({
  selector: 'app-pravljenje-akcije',
  templateUrl: './pravljenje-akcije.component.html',
  styleUrls: ['./pravljenje-akcije.component.scss']
})
export class PravljenjeAkcijeComponent implements OnInit {

  pravljenjeAkcije = new FormGroup({
    odKad: new FormControl(''),
    doKad: new FormControl(''),
    tekst: new FormControl(''),
    procenat: new FormControl(''),
    artikliNaAkciji: new FormControl('')
  })

  constructor(private service: AkcijaService, private prodavacService: ProdavacService, private articleService: ArticleService, private tokenService: TokenService, private router: Router) { }

  artikliProdavca: Article[] = [];
  odabraniArtikli: any;

  getArtikliProdavca(username: string): void {
    this.articleService.getArticlesByUsername(username).then((response) => {
      this.artikliProdavca = response;
    });
  }

  getProdavacUsername(): string {
    if(this.tokenService.isAuthenticated()) {
      if(this.tokenService.getRoleFromJwt(this.tokenService.getToken()) === 'ROLE_PRODAVAC') {
        return this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
      }
    }

    return '';
  }

  getUsernameFromToken(): string {
    if(this.tokenService.isAuthenticated()) {
      return this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
    }

    return '';
  }

  public kreirajAkciju() {
    this.prodavacService.getProdavacByUsername(this.tokenService.getUsernameFromJwt(this.tokenService.getToken())).then((response) => {
      this.pravljenjeAkcije.addControl('prodavac', new FormControl(response));
      this.service.create(this.pravljenjeAkcije.value).then((response) => {
        console.warn(response);
        this.router.navigate(['/' + this.getProdavacUsername() + '/moji-artikli']);
      });
    });
  }

  ngOnInit(): void {
    this.getArtikliProdavca(this.getProdavacUsername());
  }

}
