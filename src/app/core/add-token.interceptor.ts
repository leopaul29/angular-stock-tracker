import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return next.handle(modifiedRequest);
  }
}