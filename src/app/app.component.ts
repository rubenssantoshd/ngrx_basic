import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';
import * as faker from 'faker';
import { AppState } from './store';
import { Store, select } from '@ngrx/store';
import { PersonNew, PersonAll, PersonUpdate, PersonDelete } from './store/person.actions';
import * as fromPersonSelectors from './store/person.selectors'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  people$: Observable<Person[]>; 

  constructor(private store: Store<AppState>){

  }
  
  addNew(){
    let person: Person ={
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(), 
      country: faker.address.country(),
      age: Math.round(Math.random()*100),
      _id: new Date().getMilliseconds().toString()
    };

    this.store.dispatch(new PersonNew({person}));
  }

  ngOnInit(){
    this.store.dispatch(new PersonAll()); 
    //this.people$ = this.store.pipe(select('people'));

    this.people$ = this.store.select(fromPersonSelectors.selectAll);
 
  }

  delete(p: Person){
    this.store.dispatch(new PersonDelete({id: p._id}));
  }

  update(pp: Person){
    let p: Person =  { 
    name : faker.name.findName(),
    address : faker.address.streetAddress(),
    city : faker.address.city(), 
    country : faker.address.country(),
    age : Math.round(Math.random()*100),   
    _id: pp._id};

     this.store.dispatch(new PersonUpdate({id: p._id,changes: pp}));
  }


}
