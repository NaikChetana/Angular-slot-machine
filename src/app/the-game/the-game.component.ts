import { Component, OnInit } from '@angular/core';
import { AuthorisationService } from 'app/authorisation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-the-game',
  templateUrl: './the-game.component.html',
  styleUrls: ['./the-game.component.css']
})
export class TheGameComponent implements OnInit {

  constructor(private auth_service:AuthorisationService,private router:Router) { 
    if(!auth_service.userPool.getCurrentUser()){
      alert('User needs to login in order to access this view')
      this.router.navigate(['login'])
    }
  }

  ngOnInit() {
  }

}
