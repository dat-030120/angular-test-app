import { routes } from './../../../app.routes';
import { ApiService } from './../../../../core/api/api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  constructor(private apiService: ApiService,private router :Router) {}
  ngOnInit(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('access_token');
  }
  senApi() {
    if (this.form.invalid) {
      return;
    }
    this.apiService.login(this.form.value).subscribe({
      next: (value: any) => {
        localStorage.setItem('userName', value?.user?.username);
        localStorage.setItem('access_token', value?.access_token);
        this.router.navigate(['/home'])
      },
      error: (err) => {
        this.form.setErrors({ wrong: true });
      },
    });
  }
}
