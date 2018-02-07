import {LoginService} from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'intefaces/profile';
import { AuthorisationService } from 'app/authorisation.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    profile: Profile={ playerName:'Player-Name',
                        UserName:'',
                        email:'@mail',
                        DOB:'',
                        highScore:0,
                        profilePicture:'',
                        tokens:0
};
    constructor(private auth_service:AuthorisationService){
        this.userDetails();

    }


    userDetails(){
        this.auth_service.getUserDetails().subscribe(
            val=>{//console.log(val);
                //this.profile=val.Item;
                //this.profile=JSON.parse(val)
                 this.profile.email=val.Item.email;
                 this.profile.playerName=val.Item.playerName;
                 this.profile.DOB=val.Item.DOB;
                 this.profile.highScore=val.Item.highScore;
                 this.profile.profilePicture=val.Item.profilePicture;
                 this.profile.tokens=val.Item.tokens;
                    },error =>  console.log( <any>error));


    }
    ngOnInit(){ 
        
}
        }


