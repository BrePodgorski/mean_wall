import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

@Injectable()
export class LoginService {

  constructor(private _http: Http) { }
    login(user){
    return this._http.post('/api/login', user)//make sure it's same as routes
    //must return this to operate .then and .catch
        .map( (response: Response)=> response.json())
        .toPromise();
    }
   }
//which will call back to our backend
