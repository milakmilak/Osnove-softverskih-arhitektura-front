import { Porudzbina } from './Porudzbina';
export interface Kupac {
    id: string,
    ime: string,
    prezime: string,
    username: string,
    password: string,
    isBlokiran: boolean,
    role: string,
    adresa: string,
    porudzbine: Porudzbina[]
}