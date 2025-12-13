import { Component, OnInit } from '@angular/core';
import { PrimengModulesModule } from '../../../../Shared/Modules/primeng-modules/primeng-modules.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { NotifecationsService } from '../../../../Shared/Services/notifecations-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    PrimengModulesModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [MessageService],
})
export class ChangePasswordComponent implements OnInit {
  loginForm!: FormGroup;
  visibility: { [key: string]: boolean } = {};
  passwordMaskBinding = ''; // dummy for p-password two-way binding

  constructor(
    private fb: FormBuilder,
    private authService_: AuthServiceService,
    private _notifecationsService: NotifecationsService,
    private router: Router
  ) {
    // تهيئة القيم الابتدائية (اختياري)
    this.visibility['newPassword'] = false;
    this.visibility['confirmPassword'] = false;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      nationalId: [
        localStorage.getItem('nationalId') || '',
        [Validators.required, Validators.pattern(/^\d{14}$/)],
      ],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  togglePassword(key: string) {
    const input = document.getElementById(key) as HTMLInputElement;
    if (!input) return;
    this.visibility[key] = !this.visibility[key];
    input.type = this.visibility[key] ? 'text' : 'password';
    if (this.visibility[key]) {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  get currentPassword() {
    return this.loginForm.get('currentPassword')!;
  }
  get newPassword() {
    return this.loginForm.get('newPassword')!;
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const payload = this.loginForm.value;
    // Call the change-password method
    this.authService_.changePassword(payload).subscribe({
      next: (response) => {
        if (response) {
          this._notifecationsService.showSuccess(
            'نجاح ',
            'تم تغيير كلمة المرور بنجاح '
          );
        }
        setTimeout(() => {
          localStorage.clear();
          this.router.navigate(['login']);
        }, 800);
      },
      error: (err) => {
        this._notifecationsService.showError('خطأ', err.error.error);
      },
    });
    console.log('submit', payload);
  }
}
