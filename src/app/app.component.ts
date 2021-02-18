import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  secondes: number;
  counterSubscription: Subscription;
 
  constructor() {}
 
  // création de l'observable et observation
  ngOnInit() 
  {
    const counter = Observable.interval(1000);
    this.counterSubscription = counter.subscribe
    (
      (value: number) =>
      {
        this.secondes = value;
      }
    );
  }

  // destruction de l'observable
  ngOnDestroy()
  {
    this.counterSubscription.unsubscribe();
  }
}
