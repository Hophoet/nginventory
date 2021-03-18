import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public loginIsShow:boolean = true;
  public username?:string;
  public email?:string;
  public password?:string;

  constructor(private router:Router, private authService:AuthService) {
    
   }


  toggleAuth(){
    this.loginIsShow = !this.loginIsShow;
  }

  submit(){
    
    if(this.username && this.password && this.loginIsShow){
      if(this.loginIsShow){
        this.signIn();
      }
    }
    else if(this.username && this.password && this.email && !this.loginIsShow){
      this.signUp();
    }
    else if(!this.username){
      alert("Enter your username");
    }
    else if(!this.email && !this.loginIsShow){
      alert("Enter your email");
    }
    else if(!this.password){
      alert("Enter your password");
    }
    // alert(this.username+" "+this.email+" "+this.password);
  }

  signIn = () => {
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"username":this.username,"password":this.password});

      var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let status_code = 0;

      fetch("http://localhost:8081/api/auth/signin", requestOptions)
        .then(response =>{ 
          // console.log(response)
          status_code = response.status
          return response.json()
        })
        .then(result => {
          // console.log(result);
          console.log(result)
          // console.log(status_code)
          if(status_code == 200){
            // alert('login successfully');
            let accessToken = result.accessToken;
            this.authService.setAuthToken(accessToken);
            this.authService.setUser(result);            
          this.router.navigate(['home'])
          }
          else{
            alert('username or password invalid');
          }
        })
        .catch(error => {
          // console.log(error)
          alert('username or password invalid')
        });
  }

  signUp = () => {
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"username":this.username,"password":this.password,"email":this.email});

      var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let status_code = 0

      fetch("http://localhost:8081/api/auth/signup", requestOptions)
        .then(response => {
          status_code = response.status
          return response.json()
        })
        .then(result => {
          console.log(result);
          if(status_code == 200){
            this.toggleAuth();
            // alert('signup successfully');
            // this.router.navigate(['home'])
          }
          else{
            alert('account creation failed\n'+result.message);
          }
        })
        .catch(error => {
          console.log(error)
          alert('login error, console')
        });
  }

 





  ngOnInit(): void {
  }

}
