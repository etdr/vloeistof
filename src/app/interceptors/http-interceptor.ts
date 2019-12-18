import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor (private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.token) {
      // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.

      if (req.url.indexOf("thecocktaildb") >= 0) return next.handle(req);

      const authReq = req.clone({ setHeaders: {
        Authorization: this.authService.token,
        "Content-Type": 'application/json',
      } });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}