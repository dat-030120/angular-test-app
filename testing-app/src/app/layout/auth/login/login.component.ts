import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public form: FormGroup =new FormGroup ({
    username: new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
  });
}
