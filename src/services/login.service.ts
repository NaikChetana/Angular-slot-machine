import { Injectable } from '@angular/core';
import { Http,Headers,} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { AuthorisationService } from 'app/authorisation.service';
import { Router } from '@angular/router';
@Injectable()
export class LoginService {

    constructor(private http: Http,private auth_service:AuthorisationService,private router:Router){   
        
    }




   

}