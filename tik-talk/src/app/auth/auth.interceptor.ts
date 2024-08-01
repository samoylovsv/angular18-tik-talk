import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, switchMap, throwError} from "rxjs";

let isRefreshing: boolean = false

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token: string | null = authService.token
  if (!!token) {
    req = addToken(req, token)
  }

  if (isRefreshing) {
    return refreshAndProceed(authService, req, next)
  }

  return next(req)
    .pipe(
      catchError((error) => {
        if (error.status === 403) {
          return refreshAndProceed(authService, req, next)
        }
        return throwError(error)
      })
    )
}

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn) => {
  if (!isRefreshing) {
    isRefreshing = true
    return authService.refreshAuthToken()
      .pipe(
        switchMap((resp) => {
          isRefreshing = false
          return next(addToken(req, resp.access_token))
        })
      )
  }
  return next(addToken(req, authService.token!))

}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}
