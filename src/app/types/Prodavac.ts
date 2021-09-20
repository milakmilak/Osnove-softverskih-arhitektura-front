import { Article } from './Article';
export interface Prodavac {
    id: string,
    ime: string,
    prezime: string,
    email: string,
    username: string,
    password: string,
    artikli: Article[]
}