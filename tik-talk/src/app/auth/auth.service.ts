import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Profile} from "../data/interfaces/profile.interface";
import {FormControl, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {TokenResponse} from "./auth.interface";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient)
  cookieService = inject(CookieService)

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/'

  token: string | null = null
  refreshToken: string | null = null

  get isAuth(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get('token')
    }
    return !!this.token
  }

  constructor() { }

  login(payload: ɵTypedOrUntyped<{ password: FormControl<null>; username: FormControl<null> }, ɵFormGroupValue<{ password: FormControl<null>; username: FormControl<null> }>, any>): Observable<any> {
    const fd = new FormData()
    fd.append('username', `${payload.username}`)
    fd.append('password', `${payload.password}`)
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}auth/token`,
      fd
    ).pipe(
      tap((val:TokenResponse) => {
        this.token = val.access_token
        this.refreshToken = val.refresh_token

        this.cookieService.set('token', this.token)
        this.cookieService.set('refreshToken', this.refreshToken)
      })
    )
  }
}
