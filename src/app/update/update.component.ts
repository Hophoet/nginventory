import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  
  public amount?:number;
  public description?:string;
  public type:string;
  public id:string;

  constructor(private route:ActivatedRoute, private router:Router, private authService:AuthService) {
    if(!this.authService.authTokenExists()){
      this.router.navigate(['']);
    }
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
   }

  update = () => {
    if(this.amount && this.description){
      let type = this.route.snapshot.params['type'];
      let id = this.route.snapshot.params['id'];
      this._update(type, id);
    }
    else if(!this.amount){
      alert('invalid amount');
    }
    else if(!this.description){
      alert('invalid description')
    }
  }

  _update = (type:string, id:string) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.authService.getAuthToken());
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"amount":this.amount,"description":this.description});

    var requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      body:raw
    };

    let status_code = 0;

    fetch("http://localhost:8081/"+type+"/"+id+"/update", requestOptions)
      .then(response => {
        status_code = response.status;
        console.log(response)
        return response.text();
      })
      .then(response => {
        // console.log(result)
        if(status_code == 200){
          this.router.navigate(['home'])
        }
        else{
          alert('update failed')
        }
      })
      .catch(error => {
        // alert('error d')
        console.log('error', error)
      });
  }

  
  getData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.authService.getAuthToken());

    var requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    let status_code = 0;

    fetch("http://localhost:8081/"+this.type+"/"+this.id, requestOptions)
      .then(response => {
        status_code = response.status;
        console.log(response)
        return response.json();
      })
      .then(result => {
        console.log(result)
        if(status_code == 200){
          this.amount = result.amount;
          this.description = result.description;
          
        }
        else{
          // alert('error')
        }
      })
      .catch(error => {
        alert('error d')
        console.log('error', error)
      });
  }


  ngOnInit(): void {
    this.getData()
  }

}
