import {AuthorisationService} from '../authorisation.service';
import { Component, OnInit } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { NgForm } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  constructor(private router:Router,private auth_service:AuthorisationService) {
      
   }



  signUp(signupForm:NgForm){
    var email=signupForm[0].value;
    var pwd1=signupForm[1].value;
    var pwd2=signupForm[2].value;

    var onSuccess = function registerSuccess(result) {
      var cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      
      var confirmation = ('Registration successful. Please check your email inbox or spam folder for your verification code.');
      if (confirmation) {
        console.log("confirmed")
        alert('Registration successful. Please check your email inbox or spam folder for your verification code.');
        // this.router.navigate(['verify']);
        
      }
      
  };
  var onFailure = function registerFailure(err) {
      alert(err);
  };
  event.preventDefault();

  if (pwd1 === pwd2) {
     this.register(email, pwd1, onSuccess, onFailure);
  } else {
      alert('Passwords do not match');
  }


  }

  register(email, password, onSuccess, onFailure) {
    var dataEmail = {
        Name: 'email',
        Value: email
    };

    this.auth_service.userPool.signUp(this.auth_service.toUsername(email), password, [this.auth_service.getAttributeEmail(dataEmail)], null,
        (err, result)=>{
            if (!err) {
                
                onSuccess(result);
                this.router.navigate(['verify']);
                
            } else {
                onFailure(err);
            }
        }
    );
}


  ngOnInit() {
  }

}
