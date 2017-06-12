import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  //we want to display messages
  messages: Array<any>;
  user: any;

  constructor(private _messageService: MessageService, private _router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
    //as soon as page loads we want to get messages right away
    this.getAllMessages()
  }
  getCurrentUser(){
    this._messageService.getCurrentUser()
    .then( (user)=> this.user=user)
    .catch((err)=>this._router.navigate(['/login']))
    //if thrre is not a current use then redirect use back to login
  }
getAllMessages(){
  this._messageService.getAllMessages()
  .then( (messages) =>{

   this.messages = messages
   console.log(this.messages);
})
  .catch((err)=> console.log(err))
  //go t service and write getAllMessages service function
}
createMessage(formData){
  console.log("in the component", formData.value);
  this._messageService.createMessage(formData.value)
    .then( (message)=> {
      formData.reset()
      console.log(message)
      this.getAllMessages();
      //once it;s saved correctly, oad the form again and get all messgesx
    })
    .catch((err)=>this._router.navigate(['/login']))
}

createComment(formData, message_id){
  console.log(formData.value);
  this._messageService.createComment(formData.value,message_id)
  .then( () =>{
    this.getAllMessages();
  })
  .catch(err => console.log(err))

  formData.reset();
}
}








//end
