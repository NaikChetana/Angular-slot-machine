import { Component, OnInit } from '@angular/core';
import { Profile } from 'intefaces/profile';
import { LoginService } from 'services/login.service';
import { AuthorisationService } from 'app/authorisation.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
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
        this.profile.email=val.Item.email;
           this.profile.playerName=val.Item.playerName;
           this.profile.DOB=val.Item.DOB;
          //this.profile.profilePicture=val.Item.profilePicture;
              },error =>  console.log( <any>error));


}

update(updateForm:NgForm){
  let data={
    "playerName":updateForm[0].value,
    "DOB":updateForm[1].value
  }
  
  // this.profile.playerName=updateForm[0].value;
  // this.profile.DOB=updateForm[1].value;
  this.auth_service.updateUserDetails(data).subscribe(
    res=>{
      alert('Profile sucessfully updated');
    },
    error=>{
      console.log( <any>error);
    }
  )

}


  ngOnInit() {
  }

}
