import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../../core/api/api.service';
import { NotificationService } from '../../../../core/service/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,   RouterModule, ReactiveFormsModule,FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public form: FormGroup =new FormGroup ({
    username: new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
  });
  constructor(private apiService: ApiService,private router :Router, private noti :NotificationService) {}

  senApi() {
    if (this.form.invalid) {
      return;
    }
    this.apiService.register(this.form.value).subscribe({
      next: (value: any) => {
        this.noti.success('Đăng ký thành công')
        this.router.navigate(['/login'])
      },  
      error: (err) => {
        this.form.setErrors({ wrong: true });
      },
    });
  }

  
}
