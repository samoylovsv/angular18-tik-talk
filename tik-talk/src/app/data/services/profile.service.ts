import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Profile} from "../interfaces/profile.interface";
import {Pageble} from "../interfaces/pageble.interface";
import {AbstractControl, ValidationErrors, ɵElement, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http: HttpClient = inject(HttpClient)

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/'

  me = signal<Profile | null>(null)

  constructor() { }

  getTestAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getAccount(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
  }

  getMe(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap((res) => this.me.set(res))
      )
  }

  getSubscribersShortList(subsAmount: number = 3): Observable<Profile[]> {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/?page=1&size=${subsAmount}`)
      .pipe(
        // map((res) => res.items.slice(0, subsAmount))
        map((res) => res.items)
      )
  }

  patchProfile(profile: ɵTypedOrUntyped<{
    [K in keyof {
      firstName: (null | ((control: AbstractControl) => (ValidationErrors | null)))[];
      lastName: (null | ((control: AbstractControl) => (ValidationErrors | null)))[];
      stack: any[];
      description: any[];
      username: ({ disabled: boolean; value: null } | ((control: AbstractControl) => (ValidationErrors | null)))[]
    }]: ɵElement<{
      firstName: (null | ((control: AbstractControl) => (ValidationErrors | null)))[];
      lastName: (null | ((control: AbstractControl) => (ValidationErrors | null)))[];
      stack: any[];
      description: any[];
      username: ({ disabled: boolean; value: null } | ((control: AbstractControl) => (ValidationErrors | null)))[]
    }[K], null>
  }, ɵFormGroupValue<{
    [K in keyof {
      firstName: (null | ((control: AbstractControl) => (ValidationErrors | null)))[];
      lastName: (null | ((control: AbstractControl) => (ValidationErrors | null)))[];
      stack: any[];
      description: any[];
      username: ({ disabled: boolean; value: null } | ((control: AbstractControl) => (ValidationErrors | null)))[]
    }]: ɵElement<{
      firstName: (null | ((control: AbstractControl) => (ValidationErrors | null)))[];
      lastName: (null | ((control: AbstractControl) => (ValidationErrors | null)))[];
      stack: any[];
      description: any[];
      username: ({ disabled: boolean; value: null } | ((control: AbstractControl) => (ValidationErrors | null)))[]
    }[K], null>
  }>, any>): Observable<Profile> {
    return this.http.patch<Profile>(
      `${this.baseApiUrl}account/me`,
      profile
    )
  }

  uploadAvatar(file: File): Observable<Profile> {
    const fd = new FormData()
    fd.append('image', file)
    return this.http.post<Profile>(
      `${this.baseApiUrl}account/upload_image`,
      fd
    )
  }

}
