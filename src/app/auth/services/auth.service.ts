import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor( private http: HttpClient ) { }

  checkAuth(): Observable<boolean> {
    if( !localStorage.getItem('token') ) {
      return of(false);
    }

    return this.http.get<Auth>(`${ this.apiUrl }/usuarios/1`)
              .pipe(
                // It transform the data
                map( auth => {
                  this._auth = auth;
                  return true;
                } )
              );
  }

  login() {
    return this.http.get<Auth>(`${ this.apiUrl }/usuarios/1`)
              .pipe(
                // Generates a side effect and avoids the subscription to the observable
                tap( auth => this._auth = auth ),
                tap( auth => localStorage.setItem('token', auth.id) )
              );
  }

  logout() {
    this._auth = undefined;
  }
}
