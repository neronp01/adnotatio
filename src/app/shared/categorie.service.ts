// Programmeur: Pascal Néron
// Date: 2017-11-18
// Révisuer: nom
// Cette classe de type service permet de donner au module tous l'information relatif aux catégorie d'annotation.
// Celle-ci va chercher les données dans les colections fournies par FireStore.
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface ICategorie { // interface de data dans la collection catégorie
  administrateur ?: string;
  projet ?: string;
}
// interface de la collection catégories. Le id correspond au nom de la catégorie
export interface Item { id: string; data: ICategorie; }
@Injectable()
export class CategorieService {
  categorieCollection: AngularFirestoreCollection<Item>; // Observable parcourrant la collection
  categorieDoc:  AngularFirestoreDocument<ICategorie>; // Observable parcourrant un documet d'une colection
  categorieList: Observable<Item[]>;

  constructor(private dbc: AngularFirestore) { }
// Cette fonction permet de trouver une liste de cattégorie d'annotation d'un administrateur.
  trouverListeCategorie(courriel: string): Observable<Item[]> {
    let tabCategorie: Observable<Item[]>;
    this.categorieCollection = this.dbc.collection('categories', ref => {
      return ref.where('data.administrateur', '==', courriel);
    });
    this.categorieList =  this.categorieCollection.valueChanges();
    tabCategorie = this.categorieList;
    console.log('observable_cat')
    return tabCategorie;
  }
}
