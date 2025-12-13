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
  selector: 'app-login',
  standalone: true,
  imports: [
    PrimengModulesModule,
    InputGroupModule,
    FormsModule,
    CommonModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
// export class LoginComponent {
//   nationalId!: FormControl;
//   password!: FormControl;
//   loginForm!: FormGroup;
//   passwordMaskBinding = ''; // dummy for p-password two-way binding

//   constructor(
//     private authService_: AuthServiceService,
//     private _notifecationsService: NotifecationsService,
//     private router: Router,
//     // private _userData: UserDataService
//   ) {
//     this.initFormControls();
//     this.initFormGroupe();
//   }

//   initFormControls(): void {
//     this.nationalId = new FormControl('', [Validators.required, Validators.pattern(/^\d{14}$/)]);
//     this.password = new FormControl('', [
//       Validators.required,
//       Validators.minLength(6),
//       Validators.maxLength(10),
//     ]);
//   }

//   initFormGroupe(): void {
//     this.loginForm = new FormGroup({
//       nationalId: this.nationalId,
//       password: this.password,
//     });
//   }

//   submit() {
//     if (this.loginForm.valid) {
//       this.siginIn(this.loginForm.value);
//     } else {
//       this.loginForm.markAllAsTouched();
//       Object.keys(this.loginForm.controls).forEach((control) =>
//         this.loginForm.controls[control].markAsDirty()
//       );
//     }
//   }

//   siginIn(data: ILogin): void {
//     this.authService_.login(data).subscribe({
//       next: (response) => {
//         if (response._id) {
//           this._notifecationsService.showSuccess('success', 'success login');
//           localStorage.setItem('token', response._id);
//         }
//         this.router.navigate(['home']);
//       },
//       error: (err) => {
//         this._notifecationsService.showError('Error', err.error.error);
//       },
//     });
//   }
// }
export class LoginComponent implements OnInit {
  visibility: { [key: string]: boolean } = {};
  loginForm!: FormGroup;
  passwordMaskBinding = ''; // dummy for p-password two-way binding

  constructor(
    private fb: FormBuilder,
    private authService_: AuthServiceService,
    private _notifecationsService: NotifecationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      nationalId: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

  get nationalId() {
    return this.loginForm.get('nationalId')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const payload = this.loginForm.value;
    // Call the sign-in method
    this.authService_.login(payload).subscribe({
      next: (response) => {
        if (response.isAuthenticated) {
          this._notifecationsService.showSuccess(
            'نجاح ',
            'تم تسجيل الدخول بنجاح '
          );
          localStorage.setItem('token', response.token);
          // for (const role of response.roles) {
          localStorage.setItem(`role`, response.roles[0]);
          // }
          localStorage.setItem('nationalId', response.nationalId || '');
          localStorage.setItem('fullName', response.fullName || '');
          localStorage.setItem('userId', response.userId || '');
          console.log(response);
          setTimeout(() => {
            this.router.navigate(['/main/home']);
          }, 800);
        }
      },
      error: (err) => {
        this._notifecationsService.showError('خطأ', err.error.error);
      },
    });
    console.log('submit', payload);
  }
}
