import { Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ApisService } from './services/apis.service';
const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [
    {id:"1" , name:'Maryam' , role:'frontend' , age:"24"},
    {id:"2" , name:'Ahmed' , role:'backend' , age:"28"},
    {id:"3" , name:'Mostafa' ,  role:'director', age:"29"},
    {id:"4" , name:'Ramy' , role:'General manager',  age:"31"},
    {id:"3" , name:'Sarah' ,  role:'Leader frontend' , age:"29"},
    {id:"5" , name:'Amira' , role: 'consultant', age:"30"},
    {id:"6" , name:'Menna' , role:'senior frontend' , age:"27"},
    {id:"7" , name:'Beshoy' , role:'frontend' , age:"26"} 
  ]
  title = 'search';
  public model: any;
  public modelStatic: any;
  public mySearch : any ;
  public mines: [];
  constructor(private apiService: ApisService) {
  }
  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )
  searchApi = (text$: Observable<any>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => term.length < 2 ? []
        : this.apiService.searchApi(term).pipe(
          map(response =>
            response[1]
          )
        )
    ));
    formatter = (x: {name: string}) =>{
     return x;
    } ;
  //   map(term => term.length < 2 ? []
  // : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
}

