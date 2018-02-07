import {AuthorisationService} from '../authorisation.service';
import { Component, OnInit } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { NgForm } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  constructor(private router:Router,private auth_service:AuthorisationService) { }
 
    handleVerify(verifyForm:NgForm) {
    var email = verifyForm[0].value;
    var code = verifyForm[1].value;

    this.verify(email, code,
        function verifySuccess(result) {
            console.log('call result: ' + result);
            console.log('Successfully verified');
            alert('Verification successful. You will now be redirected to the login');
        },
        function verifyError(err) {
            alert(err);
        }
    );
}


 verify(email, code, onSuccess, onFailure) {
  this.auth_service.createCognitoUser(email).confirmRegistration(code, true,(err, result)=>{
      if (!err) {
          onSuccess(result);
          this.router.navigate(['login'])
      } else {
          onFailure(err);
      }
  });
}


  ngOnInit() {
  }

}
