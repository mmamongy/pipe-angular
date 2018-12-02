import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ApisService } from './services/apis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.apiService.getTags().subscribe(d => {
      console.log('Data => ', d) ;
    })
  }
 
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

