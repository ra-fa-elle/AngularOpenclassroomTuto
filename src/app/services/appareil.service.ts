import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class AppareilService {

  appareilSubject = new Subject<any[]>();

  private appareils = [];

  // constructeur
  constructor( private httpClient: HttpClient) {}

  // Méthode permettant au subject d'émettre la liste private des appareils
  emitAppareilSubject()
  {
    this.appareilSubject.next(this.appareils.slice());
  }
  
  // Méthode de recherche d'appareil par ID
  getAppareilById( id: number )
  {
    const appareil = this.appareils.find(
      (appareilObject) =>
      {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  // Méthodes pour allumer / éteindre les appareils
  switchOnAll() 
  {
    for(let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() 
  {
    for(let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne( index: number ) 
  {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne( index: number ) 
  {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil( name: string, status: string )
  {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    }
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilToServer()
  {
    this.httpClient
      .put('https://angulartuto-openclass-default-rtdb.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () =>{
          console.log('enregistrement terminé');
        },
        (error) => {
          console.log('erreur de sauvegarde' + error);
        }
      )
  }

  getAppareilFromServer()
  {
    this.httpClient
    .get<any[]>('https://angulartuto-openclass-default-rtdb.firebaseio.com/appareils.json')
    .subscribe(
      (response) =>
      {
        this.appareils = response;
        this.emitAppareilSubject();
      },
      (error) =>
      {
        console.log('erreur de chargement' + error);
      }
    )
  }
}