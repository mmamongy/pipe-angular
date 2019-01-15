import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterDataPipe } from './pipes/filter-data.pipe';
import { FilterDataObjectsPipe } from './pipes/filter-data-objects.pipe';
import { CardComponent } from './components/card/card.component' ;
import { CardsListComponent } from './components/cards-list/cards-list.component' ;
import { AppRoutingModule } from './app-routing.module';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FilterDataPipe,
    FilterDataObjectsPipe,
    CardComponent,
    CardsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
