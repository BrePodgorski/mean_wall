import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

@Injectable()
export class MessageService {

  constructor(private _http: Http) { }
  getAllMessages(){
    return this._http.get('/api/messages')
      .map(( messages:Response)=> messages.json())
      .toPromise()
  }
  getCurrentUser(){
  return this._http.get('/api/current')
    .map(( user:Response)=> user.json())
    .toPromise()
  }
  createMessage(message){
    console.log("In the sevice", message)
    return this._http.post('/api/messages', message)
    .map( (messages: Response)=> messages.json())
    .toPromise()
  }
  createComment(comment, id){
    return this._http.post('/api/comments/' + id, comment)
    .map( (comments: Response)=> comments.json())
    .toPromise()
  }

}
//going from service, to routes to controller to make sure that everything corresponds correctly
