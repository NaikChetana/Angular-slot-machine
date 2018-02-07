import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'ti-panel', class: '' },
    { path: 'about', title: 'About', icon: 'ti-eye', class: '' },
    { path: 'user', title: 'User Profile',  icon:'ti-user', class: '' },
    { path: 'updateProfile', title: 'Edit Profile',  icon:'ti-user', class: '' },
    { path: 'leaderboard', title: 'LeaderBoard', icon:'ti-crown', class: '' },
    { path: 'team', title: 'Team', icon:'ti-vector', class: '' },
   // { path: 'deleteUser', title:'Delete Account',icon:'ti-vector', class: '' }
    
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

}
