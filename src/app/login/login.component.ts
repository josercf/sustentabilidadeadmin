import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: User = new User();
  hasError: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  logar(){
    if(this.model.email == "admin@sustentabilidadeescolar" &&
      this.model.password == "ad1m1napp"){
        this.hasError = false;
        this.router.navigate(['/all']);
      }else{
          this.hasError = true;
      }
  }

}
