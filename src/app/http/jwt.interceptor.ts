import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: NbAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    return this.authService.getToken().pipe(
      switchMap((token: NbAuthJWTToken) => {
        if (token && token.getValue()) {
          request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + token.getValue()
            }
          });
        }
        return next.handle(request);
      })
    );
  }
}
