import { Component, OnInit , Input} from '@angular/core';
import {ICardInfo} from '../../helperClasses/commonIneterfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: ICardInfo;
  imgpath: string = "http://commsdots.itworx.com/Images/reqLogicicon.png" ;
  
  constructor() { 
  }

  ngOnInit() {
   
  }

}
