import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const Interceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router)
  const token = localStorage.getItem('access_token');
  
  if (token) {
    const AuthRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(AuthRequest);
  } else {
    return next(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('login')) {
          router.navigate(['/login']);
          localStorage.removeItem('access_token');
        }
        // } else {
        //   return throwError(() => error);
        // }
        // router.navigate(['/login']);
        // localStorage.removeItem('access_token');
        return throwError(() => error);
      })
    );
  }
};
