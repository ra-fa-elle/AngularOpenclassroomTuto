import { Subject } from 'rxjs/Subject';

export class AppareilService {

  appareilSubject = new Subject<any[]>();

  private appareils = [
    {
      id: 1,
      name: 'TV',
      status: 'allumé'
    },
    {
      id: 2,
      name: 'PC',
      status: 'éteint'
    },
    {
      id: 3,
      name: 'Box internet',
      status: 'allumé'
    }
  ];

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
}