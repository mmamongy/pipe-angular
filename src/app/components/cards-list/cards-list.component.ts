import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICardInfo} from '../../helperClasses/commonIneterfaces';
import { getSystemsListAPI} from '../../helperClasses/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {

  apps : ICardInfo[];
  mySearch1 : any ;
  selcetedTag : number = 1;
  selectedTgaVlue: string ='All Departments' ;
  tags = [
    { id: 1 , value :'All Departments'}  ,
    { id: 2 , value: 'Administration'},
    { id: 3 , value : 'Communications' },
    { id: 4 , value : 'Facility' } ,
    { id: 5 , value: 'Marketing' },
    { id: 6 , value: 'MIS' },
    { id: 7 , value: 'Procurement' },
    { id: 8 , value: 'Talent' }
  ] ;
  selectedTags :Array<any>[] ;

  constructor(private http:HttpClient) {

    this.getSystemsData().subscribe(data => {
      console.log(data);
      this.apps = data;
  });
   }

  ngOnInit() {    

  }

  getSystemsData(): Observable<any> {
    return this.http.get(getSystemsListAPI)
  }

  filterByTag(id ,value){
    this.selcetedTag = id ; 
    this.selectedTgaVlue = value ;
  }

  checkTag(value) {
    if (value.find( o => o == this.selectedTgaVlue)){
      return true ;
    } else {
    }
  }
   
}
