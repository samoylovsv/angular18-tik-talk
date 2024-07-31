import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profile} from "../data/interfaces/profile.interface";
import {FormControl, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient)

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/'

  constructor() { }

  login(payload: ɵTypedOrUntyped<{ password: FormControl<null>; username: FormControl<null> }, ɵFormGroupValue<{ password: FormControl<null>; username: FormControl<null> }>, any>): Observable<any> {
    const fd = new FormData()
    fd.append('username', `${payload.username}`)
    fd.append('password', `${payload.password}`)
    return this.http.post(
      `${this.baseApiUrl}auth/token`,
      fd
    )
  }
}
