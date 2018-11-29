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
    //  console.log(this.element.nativeElement.children[0]);
    //  console.log(this.element.nativeElement.children[0].offsetHeight);
     console.log( document.getElementsByTagName('li')) ;
  
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
  temp : Array<any> ;


  constructor(private http:HttpClient , private api :ApisService , el: ElementRef){
    this.element = el ;
    this.temp =[] ;
    this.getSystemsData().subscribe(data => {
      console.log(data);
      this.apps = data;
      this.filterAll() ;
      
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
   this.mySearch1 ='admin' ;
    if(this.mySearch1 ==''){
      this.temp = this.apps.map(x => Object.assign({}, x));
    }
    this.apps.forEach(e => {
      if (e.Name.toLowerCase().indexOf(this.mySearch1) > -1 ) {
        e.SystemInfos.forEach(t => {
          Object.keys(t).forEach(r => {
            if (typeof(r) =='string'){
              if(r.toLowerCase().indexOf(this.mySearch1) > -1){
                this.temp.push({
                  Name :e.Name , 
                  SystemInfos :{} =  t 
                }) ;
              }
            }
          })
        })
      } else { 
        e.SystemInfos.forEach(t => {
          console.log('TT ' ,t)
          for ( let [key, value] of Object.entries(t)){
            if (typeof(value) =='string'){
              console.log(value.toLowerCase().indexOf(this.mySearch1))
              if (value.toLowerCase().indexOf(this.mySearch1) > -1){
              console.log('Value ' , value) ;
              this.temp.push({ 
                Name :e.Name , 
                SystemInfos :{} =  t 
              }) ; }
           
        }
      }
    });
  }
}) ;
console.log('HAH ' , this.temp);
  
  }
}
