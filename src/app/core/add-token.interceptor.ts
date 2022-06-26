import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const STOCKTOKEN = 'bu4f8kn48v6uehqi3cqg';

export class AddTokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({
      setParams: {
        token: STOCKTOKEN,
      },
    });
    console.log('req', req.url);
    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        if (event instanceof HttpRequest) {
          // add token
        }
      })
    );
  }
}
