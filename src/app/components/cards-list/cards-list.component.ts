import { Component, OnInit, ElementRef , AfterViewInit, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICardInfo} from '../../helperClasses/commonIneterfaces';
import { getSystemsListAPI} from '../../helperClasses/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { ApisService } from './../../services/apis.service' ;
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
     console.log(this.element.nativeElement.children[0]);
     console.log(this.element.nativeElement.children[0].offsetHeight);
  
  }

  apps : ICardInfo[];
  mySearch1 : any ;
  selcetedTag : number = 1;
  selectedTgaVlue: string ='' ;
  tags = [
    "Administration",
    "Communications",
    "Facility",
    "Marketing",
    "MIS",
    "OPEX",
    "Procurement",
    "Quality",
    "Talent"
  ] ;
  selectedTags :Array<any>[] ;
  element : ElementRef ;
  status: boolean = false;
  showCategory : true ;
  count : number = 0 ;


  constructor(private http:HttpClient , private api :ApisService , el: ElementRef){
    this.element = el ;
    this.getSystemsData().subscribe(data => {
      console.log(data);
      this.apps = data;
  });

  // this.api.getTags().subscribe(data => {
  //   console.log("tags "  ,data) ;
  // })
   }

  ngOnInit() {    

  }

  getSystemsData(): Observable<any> {
    return this.http.get(getSystemsListAPI)
  }

  filterByTag(value){
    this.status = !this.status;     ;
    console.log('sEeclted value => ' , this.selectedTgaVlue) ;
    this.selectedTgaVlue = value ;
  }

  checkTag(value) {
    if (value==this.selectedTgaVlue){
      return true ;
    } else if (this.selectedTgaVlue ==''){
      return true ;
    } else {
       return false;
    }
  }


  filterAll(){
    this.apps = this.apps.filter( v => {
      if (this.mySearch1 =='' &&  this.selectedTgaVlue==''){
        return this.apps ;
      }else if (this.mySearch1 !==''){
        let match = false ;
        Object.keys(v).forEach( k=> {
          if (typeof(v[k]) === 'string'){
            console.log(v[k]) ;
            match = match || v[k].toLowerCase().indexOf(this.mySearch1) >= 0 ;
          } else if(typeof(v[k] === 'object')){
            v[k].forEach(y => {
              if( typeof(v[k][y]) === 'string')
              match = match || v[k][y].toLowerCase().indexOf(this.mySearch1) >= 0 ;             
            });
          }
           else {
            match = match || v[k] === this.mySearch1 ;
          } 
        }) ;
        console.log(match) ;
        return match ;
    } 
      }
    );
    }
   
}

