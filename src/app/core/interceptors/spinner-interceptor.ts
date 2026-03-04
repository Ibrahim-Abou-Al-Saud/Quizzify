import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner-service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(SpinnerService);

  const excludePatterns: (string | RegExp)[] = ['/assets/'];
  const skipHeader = req.headers.has('X-Skip-Spinner');

  const sanitizedReq = skipHeader
    ? req.clone({ headers: req.headers.delete('X-Skip-Spinner') })
    : req;

  const shouldExclude = excludePatterns.some((p) =>
    typeof p === 'string' ? sanitizedReq.url.includes(p) : p.test(sanitizedReq.url),
  );

  if (shouldExclude || skipHeader) {
    return next(sanitizedReq);
  }

  spinner.show();

  return next(sanitizedReq).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          spinner.hide();
        }
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          spinner.hide();
        }
      },
    }),
  );
};
