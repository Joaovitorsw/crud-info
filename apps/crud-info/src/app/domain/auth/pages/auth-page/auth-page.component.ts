/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { MyHotToastService } from 'apps/crud-info/src/app/core/services/hot-toast/hot-toast.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'my-workspace-auth-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  singUpForm = new FormGroup({
    email: new FormControl<string>('joaovitorsw@teste.com', [Validators.email]),
    password: new FormControl<string>('123456', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly myHotToastService: MyHotToastService,
    readonly router: Router
  ) {}

  submitForm() {
    const { email, password } = this.singUpForm.value;

    this.authService
      .login({
        email: email ?? '',
        password: password ?? '',
      })
      .pipe(
        catchError((error) => {
          this.myHotToastService.error('Erro ao fazer login');
          throw error;
        })
      )
      .subscribe((user) => {
        this.myHotToastService.success('Seja bem vindo ' + user.name);
        this.router.navigate(['/home']);
      });
  }
}
