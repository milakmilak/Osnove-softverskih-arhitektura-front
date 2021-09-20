import { ImageService } from './../../services/ImageService/image.service';
import { AkcijaService } from './../../services/AkcijaService/akcija.service';
import { TokenService } from './../../services/TokenService/token.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleUpdate } from './../../types/ArticleUpdate';
import { Router } from '@angular/router';
import { ArticleService } from './../../services/ArticleService/article.service';
import { Component, OnInit } from '@angular/core';
import { ProdavacService } from 'src/app/services/ProdavacService/prodavac.service';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  articleDetailsForm = new FormGroup({
    naziv: new FormControl(''),
    opis: new FormControl(''),
    cena: new FormControl('')
  })

  updateArticleForm = new FormGroup({
    naziv: new FormControl(''),
    opis: new FormControl(''),
    cena: new FormControl('')
  })

  createArticleForm = new FormGroup({
    naziv: new FormControl(''),
    opis: new FormControl(''),
    cena: new FormControl(''),
    akcijeIds: new FormControl(''),
    putanjaSlike: new FormControl('')
  })

  constructor(private service: ArticleService,
            private akcijaService: AkcijaService,
            private prodavacService: ProdavacService,
            private tokenService: TokenService,
            private imgService: ImageService,
            private router: Router) { }

  article: any;
  akcijeProdavca: any = [];

  getArticleDetailsData(): ArticleUpdate {
    let articleDetails: ArticleUpdate = {
      id: Number(this.getArticleIdFromUrl),
      naziv: this.articleDetailsForm.value.naziv,
      opis: this.articleDetailsForm.value.opis,
      cena: this.articleDetailsForm.value.cena,
      prodavac: this.articleDetailsForm.value.prodavac
    };

    return articleDetails;
  }

  getArticleIdFromUrl(): string {
    const fullRoute = this.router.url;

    if(fullRoute.length < 12) {
      return fullRoute.split('/')[2];
    }
      
    if(fullRoute.length > 12) {
      return fullRoute.split('/')[3];
    }

    return '';
  }

  getArticle() {
    this.service.getArticle(this.getArticleIdFromUrl()).then((response) => {
      this.article = response;
      console.log(this.article);
      console.log('ARTICLE ID:');
      console.log(this.getArticleIdFromUrl())
    })
  }

  getAkcijeProdavcaByUsername() {
    const username: string = this.tokenService.getUsernameFromJwt(this.tokenService.getToken());

    this.akcijaService.getAkcijeByProdavacUsername(username).then((response) => {
      this.akcijeProdavca = response.filter((akcija: any) => {
        if(new Date(akcija.doKad) > new Date()) {
          return akcija;
        }
      });

      console.warn('PRONADJENE AKCIJE PRODAVCA: ' + username);
      console.warn(this.akcijeProdavca);
    })
  }

  public update() {
    this.service.update(this.getArticleIdFromUrl(), this.updateArticleForm.value).then((response) => {
      console.log('UPDATED ARTICLE:');
      console.log(response);
    });
  }

  isKupacLoggedIn(): boolean {
    if(this.tokenService.isAuthenticated()) {
      if(this.tokenService.getRoleFromJwt(this.tokenService.getToken()) === 'ROLE_KUPAC') {
        return true;
      }
    }

    return false;
  }

  isProdavacLoggedIn(): boolean {
    if(this.tokenService.isAuthenticated()) {
      if(this.tokenService.getRoleFromJwt(this.tokenService.getToken()) === 'ROLE_PRODAVAC') {
        return true;
      }
    }

    return false;
  }

  public isUrlMyArticle(): boolean {
    if(this.router.url.split('/').length > 3) {
      return true;
    }

    return false;
  }

  public isArticleDetails(): boolean {
    if(this.router.url.split('/')[2] === this.getArticleIdFromUrl()) {
      return true;
    }

    return false;
  }

  public isNoviArtikal(): boolean {
    if(this.router.url.split('/')[2] === 'kreiraj-artikal') {
      return true;
    }

    return false;
  }

  public create() {
    let username: string = '';

    if(this.tokenService.isAuthenticated()) {
      username = this.tokenService.getUsernameFromJwt(this.tokenService.getToken());
    }

    const img = new FormData();
    img.append('image', this.createArticleForm.get('putanjaSlike')?.value);

    console.warn('KREIRANJE ARTIKLA FORMA:')
    console.warn(this.createArticleForm.value);

    console.warn('Image:');
    console.warn(img.get('image'));

    this.imgService.uploadImg(img).then((response) => {
      const nazivSlike = response.body;
      console.log(response.body);

      this.prodavacService.getProdavacByUsername(username).then((response) => { 
        this.createArticleForm.addControl('prodavac', new FormControl(response));

        this.createArticleForm.patchValue({ putanjaSlike: nazivSlike });

        this.service.create(this.createArticleForm.value).then((response) => { 
          console.warn('KREIRANI ARTIKL:'); console.warn(response);
          this.router.navigate(['/' + username + '/moji-artikli']);
        })
      })
    })
    
  }

  public upload(event: Event) {
    // @ts-ignore: Object is possibly 'null'
    const file = event.target.files[0]

    this.createArticleForm.patchValue({
      putanjaSlike: file
    });
    this.createArticleForm.get('putanjaSlike')?.updateValueAndValidity();
    /*this.imgService.uploadImg(file).then((response) => {
      this.createArticleForm.patchValue({
        putanjaSlike: file
      });
      this.createArticleForm.get('putanjaSlike')?.updateValueAndValidity();
      console.warn('OBRATI PAZNJU EVENT')
      console.warn(this.createArticleForm.value.putanjaSlike)
    })*/
  }


  ngOnInit(): void {
    if(this.router.url.split('/')[2] === 'kreiraj-artikal') {
      this.getAkcijeProdavcaByUsername();
      return;
    } else {
      this.getArticle();
    }
  }

}
