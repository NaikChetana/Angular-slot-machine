import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthorisationService } from 'app/authorisation.service';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})



export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    name:string

    @ViewChild("navbar-cmp") button;

    constructor(location:Location, private renderer : Renderer, private element : ElementRef,private auth_service:AuthorisationService,private router:Router) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

        this.name=auth_service.userPool.getCurrentUser().getUsername();
    }

    ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }
    getTitle(){
        var titlee = window.location.pathname;
        titlee = titlee.substring(1);
        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === titlee){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];

        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    goUser(){
        this.router.navigate(['user']);
    }

    logOut(){
        this.auth_service.userPool.getCurrentUser().signOut();
        this.router.navigate(['home'])
    }

    deleteAccount(){
        this.auth_service.deleteUser().subscribe(val=>{
            console.log(val);
            alert('account successfully deleted');
            this.router.navigate(['home']);
        });
        
    }
}
