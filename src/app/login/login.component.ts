import {AuthorisationService} from '../authorisation.service';
import { Component, OnInit } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { NgForm } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private auth_service:AuthorisationService) { }


  signup(){
      this.router.navigate(['signup'])
  }
  login(loginForm:NgForm) {
    var email =loginForm[0].value;
    var password =loginForm[1].value;

    this.signin(email, password,()=>{

            
        },
        function signinError(err) {
            alert(err);
        }
    );
}


public signin(email, password, onSuccess, onFailure) {
  var authenticationDetails = new AuthenticationDetails({
      Username: this.auth_service.toUsername(email),
      Password: password
  });

  var cognitoUser = this.auth_service.createCognitoUser(email);
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result)=>{
          this.auth_service.setToken(result.getIdToken().getJwtToken());
          console.log('Successfully Logged In');
          this.router.navigate(['game/dashboard']);
      },
      onFailure: onFailure
  });




}







  ngOnInit() {
  }

}
