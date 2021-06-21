import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

// This can be implemented in any file that possess a routes variable

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router ) {}

  // It prevents load the module if the user is not authenticated, even if the module has been loaded before
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      return this.authService.checkAuth()
                  .pipe(
                    tap( isAuthenticated => {
                      if (!isAuthenticated) {
                        this.router.navigate(['./auth/login']);
                      }
                    } )
                  );
      
      // if ( this.authService.auth.id ) {
      //   return true;
      // }

      // console.log('Bloqued by Guard - CanActivate');
      // return false;
  }

  // It only restrict if a module can load ( If that module has already load, it is possible to enter by url )
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.checkAuth()
                  .pipe(
                    tap( isAuthenticated => {
                      if (!isAuthenticated) {
                        this.router.navigate(['./auth/login']);
                      }
                    } )
                  );


      // if ( this.authService.auth.id ) {
      //   return true;
      // }

      // console.log('Bloqued by Guard - CanLoad');
      // return false;
  }
}
