import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { NbAuthService, NbTokenService } from '@nebular/auth';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: NbAuthService,
    private tokenService: NbTokenService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          console.log('--> error', error);
          if (error.error instanceof ErrorEvent) {
            // client side error
          } else {
            // server side error
            switch (error.status) {
              case 401:
                if (isDevMode()) {
                  this.router.navigateByUrl('/401');
                } else {
                  // auto logout if 401 response returned from api
                  this.tokenService.clear();

                  // if not at the login or forgot password page then reload the page
                  if (location.pathname !== '/login' && location.pathname !== '/forgot') {
                    location.reload();
                  }
                }
                break;

              default:
              // if (!request.url.includes('/api/participants/') || (request.method !== 'GET')) {
              //   this.router.navigateByUrl('/server-error');
              // }
              //
              // do nothing for now
            }
          }
        }

        return throwError(error);
      })
    );
  }
}
