import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  // It will choose the right value according to the environment 
  // When the production build is generated, it will take the production API
  private apiUrl: string = environment.apiUrl;

  /* Move this api url to the enviroment file and define the values for dev and prod */
  //apiUrl: string = 'http://localhost:3000/heroes'; 

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>( `${this.apiUrl}/heroes` );
  }

  getHeroById( id: string ): Observable<Hero> {
    return this.http.get<Hero>( `${this.apiUrl}/heroes/${id}` );
  }
  
  getSuggestions( term: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>( `${this.apiUrl}/heroes?q=${term}&_limit=6` );
  }
}
