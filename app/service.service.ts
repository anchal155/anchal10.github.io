import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = 'https://chatapi.edwisor.com';

  constructor(public https:HttpClient, private _cookie:CookieService) { }

  public getUserInfoFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));
  }//

  public setUserInfoInLocalStorage = (data) =>{

    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  public signUpFunction(data): Observable<any> {

    const params = new HttpParams()
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('mobile', data.mobile)
    .set('email', data.email)
    .set('password', data.password)
    .set('apiKey', data.apiKey);

    return this.https.post(`${this.url}/api/v1/users/signup`, params);

  }

  public signInFunction(data):Observable<any> {

    const params = new HttpParams()
    .set('email', data.email)
    .set('password', data.password);

    return this.https.post(`${this.url}/api/v1/users/login`, params);
  }

  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', this._cookie.get('authtoken'))

    return this.https.post(`${this.url}/api/v1/users/logout`, params);

  } // end logout function

    private handleError(err:HttpErrorResponse) {

      let errorMessage = '';

      if (err.error instanceof Error ){
        errorMessage = `An error occured: ${err.error.message}`;
      } else {

        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  
      } // end condition *if
  
      console.error(errorMessage);
  
      return Observable.throw(errorMessage);
  
    }  // END handleError

    }
  

