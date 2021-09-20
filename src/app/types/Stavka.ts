import { Article } from './Article';
import { Porudzbina } from './Porudzbina';

export interface Stavka {
    id: string,
    kolicina: number,
    porudzbina: Porudzbina,
    artikal: Article
}