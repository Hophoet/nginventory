import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';



type Data = {
  amount:number,
  description:string,
  id:string
}



@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  public data:Array<Data> = [];
  public expenses:Array<Data> = [];
  public incomes:Array<Data> = [];
  public result:number = 0;
  public resultStatus:string = '';

  constructor(private router:Router, private authService:AuthService) { 
    if(!this.authService.authTokenExists()){
        this.router.navigate(['']);
    }
  }

  insertIncome = () =>{
    this.router.navigate(['insert', 'income'])
  }

  insertExpense = () => {
    this.router.navigate(['insert', 'expense'])
  }

  update = (type:string, id:string) => {
    this.router.navigate(['update', type, id])
  }

  deleteIncome = (incomeId:string) => {
    let isConfirm:boolean = confirm("do you want to delete this income ?")
    if(isConfirm){
      this._deleteIncome(incomeId);

    }
  }

  deleteExpense = (expenseId:string) => {
    let isConfirm:boolean = confirm("do you want to delete this income ?")
    if(isConfirm){
      this._deleteExpense(expenseId);
    }
  }

  getData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.authService.getAuthToken());

    var requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      // mode: 'no-cors'
    };

    let status_code = 0;

    fetch("http://localhost:8081", requestOptions)
      .then(response => {
        status_code = response.status;
        console.log(response)
        return response.json();
      })
      .then(result => {
        console.log(result)
        if(status_code == 200){
          alert('data get')
          this.data = result;
        }
        else{
          alert('error')
        }
      })
      .catch(error => {
        alert('error d')
        console.log('error', error)
      });
  }

  getExpenses = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.authService.getAuthToken());

    var requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      // mode: 'no-cors'
    };

    let status_code = 0;

    fetch("http://localhost:8081/expense", requestOptions)
      .then(response => {
        status_code = response.status;
        console.log(response)
        return response.json();
      })
      .then(result => {
        console.log(result)
        if(status_code == 200){
          // alert('data get')
          this.expenses = result;
        }
        else{
          // alert('error')
        }
      })
      .catch(error => {
        // alert('error d')
        console.log('error', error)
      });
  }

   getIncomes = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.authService.getAuthToken());

    var requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      // mode: 'no-cors'
    };

    let status_code = 0;

    fetch("http://localhost:8081/income", requestOptions)
      .then(response => {
        status_code = response.status;
        console.log(response)
        return response.json();
      })
      .then(result => {
        console.log(result)
        if(status_code == 200){
          // alert('data get')
          this.incomes = result;
        }
        else{
          // alert('error')
        }
      })
      .catch(error => {
        // alert('error d')
        console.log('error', error)
      });
  }

  getResult = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.authService.getAuthToken());

    var requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      // mode: 'no-cors'
    };

    let status_code = 0;

    fetch("http://localhost:8081/result", requestOptions)
      .then(response => {
        status_code = response.status;
        console.log(response)
        return response.json();
      })
      .then(response => {
        // console.log(result)
        if(status_code == 200){
          // alert('data get')
          if(response.result < 0){
            this.result = -response.result;
            this.resultStatus = 'debt'
          }else{
            this.result = response.result;
            this.resultStatus = 'profit';
          }
        }
        else{
          // alert('error')
        }
      })
      .catch(error => {
        // alert('error d')
        console.log('error', error)
      });
  }

  _deleteExpense = (expenseId:string) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.authService.getAuthToken());

    var requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      // mode: 'no-cors'
    };

    let status_code = 0;

    fetch("http://localhost:8081/expense/"+expenseId+"/delete", requestOptions)
      .then(response => {
        status_code = response.status;
        console.log(response)
        return response.text();
      })
      .then(response => {
        // console.log(result)
        if(status_code == 200){ 
            this.getExpenses();
        }
        else{
          alert('delete action failed')
        }
      })
      .catch(error => {
        // alert('error d')
        console.log('error', error)
      });
  }

  _deleteIncome = (incomeId:string) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.authService.getAuthToken());

    var requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      // mode: 'no-cors'
    };

    let status_code = 0;

    fetch("http://localhost:8081/income/"+incomeId+"/delete", requestOptions)
      .then(response => {
        status_code = response.status;
        console.log(response)
        return response.text();
      })
      .then(response => {
        // console.log(result)
        if(status_code == 200){
          this.getIncomes();
        }
        else{
          alert('delete action failed')
        }
      })
      .catch(error => {
        // alert('error d')
        console.log('error', error)
      });
  }




  ngOnInit(): void {
    this.getExpenses();
    this.getIncomes();
    this.getResult();
  }

}
