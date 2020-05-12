import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RoleProvider implements NbRoleProvider {
  constructor(private authService: NbAuthService) {}

  getRole(): Observable<string> {
    return this.authService.onTokenChange().pipe(
      map((token: NbAuthJWTToken) => {
        return token.isValid() ? 'user' : 'guest';
      })
    );
  }
}
