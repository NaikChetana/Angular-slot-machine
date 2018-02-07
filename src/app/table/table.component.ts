import { Component, OnInit } from '@angular/core';
import { AuthorisationService } from 'app/authorisation.service';
import { LeaderBoard } from 'app/leaderBoard';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    public tableData1: TableData;
    public tableData2: TableData;
    list:LeaderBoard[]
    constructor(private auth:AuthorisationService){
        this.list=[
            {
                name:"name",
                highScore:0
            },
            {
                name:"name",
                highScore:0
            },
            {
                name:"name",
                highScore:0
            },
            {
                name:"name",
                highScore:0
            },
            {
                name:"name",
                highScore:0
            }
        ]
    }
    ngOnInit(){

        this.auth.getLeaderBoard().subscribe(val=>{
            this.list=val;
            console.log(this.list[0].highScore);
            // for (var index = 0; index < val.length; index++) {
            //     console.log(val[index].playerName.S);
            //     this.list[index].name=val[index].playerName.S;
            //     this.list[index].highScore=val[index].highScore.N;
            // }

        })
        this.tableData1 = {
            headerRow: [ 'Rank', 'Player-Name', 'High-Score'],
            dataRows: [
                ['1', 'Anshul Sharma','$36,738'],
                ['2', 'Seema Kad','$30,534'],
                ['3', 'Sneha Joshi','$28,766'],
                ['4', 'Soumya Arora','$26,923'],
                ['5', 'Snigdha Tamot','$20,666'],
                ['6', 'Priya Shetty','$16,222']
            ]
        };
    }
}
