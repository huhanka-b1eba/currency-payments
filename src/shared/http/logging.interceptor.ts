import {HttpInterceptorFn} from '@angular/common/http';
import {finalize, tap} from 'rxjs';


export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`-> ${req.method} - ${req.url}`);
  const before = new Date();

  return next(req).pipe(
    finalize(() => {
      const after = new Date();
      console.log(`<- ${req.method} - ${req.url} ${after.getTime() - before.getTime()}ms`);
    })
  );
}
