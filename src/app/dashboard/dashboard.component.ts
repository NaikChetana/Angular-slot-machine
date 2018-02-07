import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { LoginService } from 'services/login.service';
import { NgForm } from '@angular/forms';
import { AuthorisationService } from 'app/authorisation.service';
import { Router } from '@angular/router';


declare var $:any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  reward:number = 0; 
  tokens: number = 0;
  amount:number=0;
  static playCount: number=0;
  category:string="candies";
  bet=10;
  hs:number=0;
  constructor(private auth:AuthorisationService,private router:Router) {
    auth.getTokenDetails().subscribe(val=>{
       console.log(val);
      this.tokens=parseInt(val.tokens);
      this.reward=parseInt(val.rewards);
    })
    auth.getUserDetails().subscribe(val=>{
      this.hs=val.Item.highScore;
    })
  }


  selectCategory(catForm:NgForm){
    this.category=catForm[0].value;

  }

  buyMore(){
    this.router.navigate(['game/buyTokens']);
  }


  playGame(){
    //alert('bleh');

if(this.tokens-this.bet<=0){
  alert('Tokens are too less.Buy more Tokens');

}
else{


    $( "#slotGif" ).show();
    $(".slots").hide();
    $(".playBtn").hide();
    let data={
      "bet":this.bet,
      "category":this.category
    }
    this.auth.getSlotResults(data).subscribe(val=>{
      console.log(val);
      console.log(val.leftItem.Image.S);
     this.tokens=this.tokens-this.bet;
      
      
      $('#leftSlot').attr("src","../assets/img/"+val.leftItem.Image.S);
      $('#middleSlot').attr("src","../assets/img/"+val.midItem.Image.S);
      $('#rightSlot').attr("src","../assets/img/"+val.rightItem.Image.S);
      $( "#slotGif" ).hide();
      $( ".slots" ).show();
      
      $(".playBtn").show();
      $( "#playBtn" ).text("Play Again");
      let sum;
      // if(val.leftItem.item_id.N==val.midItem.item_id.N && val.leftItem.item_id.N==val.rightItem.item_id.N){
      //  this.amount=100;
      //  alert("You've Won...Keep playing for more rewards")

      // }
      // else if(val.leftItem.item_id.N==val.midItem.item_id.N ||val.leftItem.item_id.N==val.rightItem.item_id.N 
      // ||val.midItem.item_id.N==val.rightItem.item_id.N ){
      //   this.amount=50;
      // }
      // else{
      //   this.amount=0;
      // }
    //  this.reward=this.reward+this.amount*this.bet*0.2;
      this.reward=this.reward+val.Rewards;
      if(val.isWinner){
        alert("You've Won...Keep playing for more rewards")
      }
      if(this.reward>this.hs){
        this.hs=this.reward;
      }
      this.auth.saveTokenDetails({'rewards':this.reward,'tokens':this.tokens,'highScore':this.hs}).subscribe(val=>{
        console.log(val);
      })
    });
  }    	
    // DashboardComponent.playCount++;
    
    // $( "#slotGif" ).show();
    // $(".slots").hide();
    // $(".playBtn").hide();
    // setTimeout(function(){
    //   console.log("Entered in timeout")
    //   var left = Math.floor((Math.random() * 8) + 1);
    //   var middle = Math.floor((Math.random() * 8) + 1);
    //   var right = Math.floor((Math.random() * 8) + 1);
    //   //alert(left+"::"+middle+"::"+right);
    
      // $('#leftSlot').attr("src","../assets/img/"+);
      // $('#middleSlot').attr("src","");
      // $('#rightSlot').attr("src","");
      // $( "#slotGif" ).hide();
    //   $( ".slots" ).show();
    //   $(".playBtn").show();
    //   $( "#playBtn" ).text("Play Again");
    //   var score = 0;
    //   if(left==middle && middle==right){
    //     if(left=7){
    //       score = 100;
    //     }
    //     else score = 80;
    //   }
    //   else if(left==middle || left==right || middle==right){
    //     score = 50;
    //   }
    //   else{
    //     score =  Math.floor((Math.random() * 29) + 1);
    //   }
      
    //   DashboardComponent.tokens += (score);
    //   //alert(this.tokens);
      
    //   $("#rewardNum").html("<p>Rewards</p>$"+score);
    //   $("#tokensNum").html("<p>Tokens</p>$"+DashboardComponent.tokens);
    
    //   if(DashboardComponent.playCount==3){

    //   DashboardComponent.playCount = 0;
        
    //   $(".playBtn").show();
    //   $( "#playBtn" ).text("Play Now");
    //   DashboardComponent.tokens=0;
    //   setTimeout(function(){$( ".slots" ).hide();$("#tokensNum").html("<p>Tokens</p>$"+DashboardComponent.tokens);},3000);
    //   }
    // },2500);

  
    
  }
    ngOnInit(){
      $("#slotGif").hide();
      $(".slots").hide();
      // $("#rewardNum").html("<p>Rewards</p>$"+this.reward);
      //alert(this.tokens);
    }
}
