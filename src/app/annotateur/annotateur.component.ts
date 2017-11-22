import { Component, OnInit } from '@angular/core';
import { TexteServiceService, IMot} from '../shared/texte-service.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-annotateur',
  templateUrl: './annotateur.component.html',
  styleUrls: ['./annotateur.component.css'],
  providers: [ TexteServiceService ]
})
export class AnnotateurComponent implements OnInit {
  texteSelection = [{nomParent: 'adnotatio'}, {nomTexte: 'fonctions2.txt'}];
  textSelect = 'fonctions2.txt';
  couleurSelection = [];
  step = 0;
  texteHTML: string;
  motClikHTML: string;
  categorieAnn: Array<string>;
  parent = 'annotateur';
  color = 'accent';
  checked = false;
  disabled = false;
  slider= 'Catégories';
  etat = 'categorie';
  collectionNom = 'Catégories';
  courriel = 'neronpascal001@gmail.com';
  motUid: string;
  emplacementMot: number;
  motUpdate= [];
  cats = [
    {value: '1', viewValue: 'Categorie 1'},
    {value: '2', viewValue: 'Categorie 2'},
    {value: '3', viewValue: 'Categorie 3'}
  ];
  motUpdateCat: IMot;
  selectedValueMots: string;
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor(private te: TexteServiceService) { }

  ngOnInit() {
    this.initCouleur();
  }
  categorieCoul(e: any) {
     this.couleurSelection.push({idCat: e[0], couleur: e[1]});
     console.log('coul_' , e);
     if (this.etat === 'categorie') {
       this.changeCouleur( e[0], e[1]);
     } else {
       this.changeCouleurMot( e[0], e[1]);
     }
  }
  checkedClick(e: any) {
    if (e.checked === false ) {
      this.slider = 'Catégories';
      this.etat = 'categorie';
      this.collectionNom = 'Catégories';
    } else {
      this.slider = 'Mots';
      this.etat = 'mot';
      this.collectionNom = 'mots';
    }
  }
  initCouleur() {
    let count: number;
    count = 0;
    this.te.getTExt('fonctions2.txt').subscribe( x => {
      x.forEach( y => {
        this.couleurSelection[count] = '#7e57c2';
        count++;
      });
    });
  }
  changeCouleurMot(idMot: number, couleur: string) {
    let count: number;
    count = 0;
    this.te.getTExt('fonctions2.txt').subscribe( x => {
      x.forEach( y => {
        if (idMot === count) {
          this.couleurSelection[count] = couleur;
        }
        count++;
      });
      console.log(this.couleurSelection);
    });
  }
changeCouleur(idCat: string, couleur: string) {
  let count: number;
  count = 0;
    this.te.getTExt('fonctions2.txt').subscribe( x => {
      x.forEach( y => {
        const temp = y['data'];
        if (temp['categorie'] !== undefined) {
          console.log('mot:' , y )
          temp['categorie'].forEach( z => {
            if (z === idCat) {
              console.log('____' , count);
              this.couleurSelection[count] = couleur;
            }
          });
        }
        count++;
      });
      console.log(this.couleurSelection);
      });
}
texte( e: any) {
    this.texteHTML = e;
}
  motClick(e: any) {
console.log('e' , e);
    this.motClikHTML = e[0];
this.emplacementMot = e[1];
    this.te.readWordCategory(e[1]).subscribe( x => {
      this.motUpdateCat = x[0];
    });
  }
  choixMots() {
    const temp = this.motUpdateCat;
    const temp2 = temp['data'];
    this.trouverUid(this.emplacementMot);
    console.log('choix' , temp2 );
    if ( temp2.categorie !== undefined ) {
    }
  }

  trouverUid(e: number) {
    let trouverUid: Observable<any>;
    trouverUid = this.te.trouverUid.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as IMot;
          const id = a.payload.doc.id;
          this.motUid = id;
          console.log(id);
          if ( e === data['data'].id) {
            const temp = [];
            temp.push(this.selectedValueMots)
            this.te.updateMot(data, id, temp);

          }
          this.motUpdate.push({id: id, data: data});
          //  this.createForm(data);
          return {id, ...data};
        });
      });
    trouverUid.subscribe(
      x => console.log('subscrib', x )
    );
  }
categories( e: any) {
      this.categorieAnn = e;
}
}
