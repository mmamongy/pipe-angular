import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDataObjects'
})
export class FilterDataObjectsPipe implements PipeTransform {

  transform(data: any[], filter: string): any[] {
    if (!data || !data.length) return[] ;
    if (!filter) return data;
    return data.filter( v => {
      let match = false ;
      Object.keys(v).forEach( k=> {
        if (typeof(v[k]) === 'string'){
          console.log("is string ") ;
          match = match || v[k].indexOf(filter) >= 0 ;
        } else {
          match = match || v[k] == filter ;
        } 
      }) ;
      return match ;
    });
  }

  }
