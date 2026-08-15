import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      if (err.status == 401) {
        console.log('Unauthorized')
      }

      if (err.status == 404) {
        console.log('Not found')
      }

      if (err.status >= 500) {
        console.log('Server error')
      }

      return throwError(() => err)
    })
  );
}
