import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  public amount?:number;
  public description?:string;
  public type:string;

  constructor(private route:ActivatedRoute, private router:Router, private authService:AuthService) {
    if(!this.authService.authTokenExists()){
      this.router.navigate(['']);
    }
    this.type = this.route.snapshot.params['type'];

   }

  insert = () => {
    if(this.amount && this.description){
      // alert('valid to insert');
      this._insert(this.type)
    }
    else if(!this.amount){
      alert('invalid amount');
    }
    else if(!this.description){
      alert('invalid description')
    }
  }

  _insert = (type:string) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.authService.getAuthToken());
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"amount":this.amount,"description":this.description});

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body:raw
    };

    let status_code = 0;

    fetch("http://localhost:8081/"+type, requestOptions)
      .then(response => {
        status_code = response.status;
        // console.log(response)
        return response.json();
      })
      .then(response => {
        // console.log(result)
        if(status_code == 200){
          this.router.navigate(['home'])
        }
        else{
          alert('insert failed')
        }
      })
      .catch(error => {
        // alert('error d')
        console.log('error', error)
      });
  }


  ngOnInit(): void {
  }

}
