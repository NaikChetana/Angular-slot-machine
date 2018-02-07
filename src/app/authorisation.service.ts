import { Injectable } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import {POOL_ID,CLIENT_ID} from './user-pool-details'
import {Observable} from 'rxjs/Rx';
import { Http,Headers } from '@angular/http';
import { Router } from '@angular/router';
import { LeaderBoard } from 'app/leaderBoard';

@Injectable()
export class AuthorisationService {

  PoolData = {
    UserPoolId: POOL_ID,
    ClientId: CLIENT_ID
  };
  
  public userPool = new CognitoUserPool(this.PoolData);
  
  public toUsername(s){
    return s.replace('@', '-at-');
  }

  public getAttributeEmail(dataEmail){
    return new CognitoUserAttribute(dataEmail);
  }
  
  
  private token:string;
  public setToken(val){
      this.token=val;
  }

  public getToken(){
    return this.token;
  }

  public createCognitoUser(email){
    return new CognitoUser({
      Username: this.toUsername(email),
      Pool: this.userPool
  });
  }

 
  constructor(private http: Http,private router:Router){ 
    
     }




  private  API_PROFILE_URL="https://rqfjpfrte1.execute-api.ap-south-1.amazonaws.com/prod/profile";
  private API_EDIT_PROFILE_URL="https://rqfjpfrte1.execute-api.ap-south-1.amazonaws.com/prod/userprofile";
  private API_DELETE_USER="https://rqfjpfrte1.execute-api.ap-south-1.amazonaws.com/prod/userprofile"
  private API_SLOT_RESULTS_URL="https://84ztkyuwvc.execute-api.ap-south-1.amazonaws.com/prod/slot"
  private API_GET_TOKENS_URL="https://4vgbel14rd.execute-api.ap-south-1.amazonaws.com/prod/gettokens";
  private API_SAVE_TOKENs_URL="https://4vgbel14rd.execute-api.ap-south-1.amazonaws.com/prod/savetokendetails"
  private API_LEADERBOARD="https://84ztkyuwvc.execute-api.ap-south-1.amazonaws.com/prod/leaderboard";
  // authentication functions

  
  





  public getUserDetails():Observable<any>{

      // if(!this.token){
      //     alert('session expired log in again')
      //     this.router.navigate(['login'])
      // }

          
          let body = {};
        let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization',this.token);
          return this.http.post(this.API_PROFILE_URL,JSON.stringify(body),{headers:headers})
                  .map((res) => res.json())
                  .catch((err:any)=>Observable.throw(err.json().error||'server error'));
        
      
  }

  public updateUserDetails(data):Observable<any>{
      // let body = data;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization',this.token);
      return this.http.post(this.API_EDIT_PROFILE_URL,JSON.stringify(data), {headers: headers})
              .map((res) => res.json())
              .catch((err:any)=>Observable.throw(err.json().error||'server error'));

  }

  public deleteUser(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',this.token);
    return this.http.delete(this.API_DELETE_USER, {headers: headers})
            .map((res) => res.json())
            .catch((err:any)=>Observable.throw(err.json().error||'server error'));
  }


  //slot functions

  public getSlotResults(data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',this.token);
      return this.http.post(this.API_SLOT_RESULTS_URL,JSON.stringify(data), {headers:headers})
              .map((res) => res.json())
              .catch((err:any)=>Observable.throw(err.json().error||'server error'));


  }


  // tokens and rewards

  public getTokenDetails():Observable<any>{
    
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization',this.token);
        return this.http.get(this.API_GET_TOKENS_URL,{headers:headers})
        .map(res => res.json())
        .catch((err:any)=>Observable.throw(err.json().error||'server error'));
      }
    

  public saveTokenDetails(data):Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',this.token);
    return this.http.post(this.API_SAVE_TOKENs_URL,JSON.stringify(data), {headers: headers})
            .map((res) => res.json())
            .catch((err:any)=>Observable.throw(err.json().error||'server error'));
  }


  // leaderboard

  public getLeaderBoard():Observable<LeaderBoard[]>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',this.token);
    return this.http.get(this.API_LEADERBOARD,{headers:headers})
    .map(res =>{return <LeaderBoard[]>res.json()})
    .catch((err:any)=>Observable.throw(err.json().error||'server error'));
  }


}
