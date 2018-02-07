import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorisationService } from 'app/authorisation.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-buy-tokens',
  templateUrl: './buy-tokens.component.html',
  styleUrls: ['./buy-tokens.component.css']
})
export class BuyTokensComponent implements OnInit {

  reward:number=0;
  tokens:number=0;
  points:number=0;
  hs:number=0;

  constructor(private auth:AuthorisationService,private router:Router) { 

    this.auth.getTokenDetails().subscribe(val=>{
      this.reward=parseInt(val.rewards);
      this.tokens=parseInt(val.tokens);
    })
    auth.getUserDetails().subscribe(val=>{
      this.hs=val.Item.highScore;
    })

  }

  buy(form:NgForm){
    this.points=form[0].value;

    if(this.reward-this.points<0){
      alert('you do not have enough points for this transection')
    }
    else{
      this.tokens=this.tokens+Math.floor(this.points/2);
      console.log('tokens : '+this.tokens)
      this.reward=this.reward-this.points;
      console.log('reward : '+this.reward);

      this.auth.saveTokenDetails({'rewards':this.reward,'tokens':this.tokens,'highScore':this.hs}).subscribe(val=>{
        console.log(val);
      })
      alert('sucessful transaction')
    }
  }

  ngOnInit() {
  }

}
