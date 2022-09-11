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
import { catchError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'my-workspace-sing-in',
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
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent {
  singInForm = new FormGroup({
    name: new FormControl<string>('João Vitor'),
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
    const { name, email, password } = this.singInForm.value;

    if (!name || !email || !password) {
      this.myHotToastService.error('Preencha todos os campos');
      return;
    }

    this.authService
      .createUser({
        name,
        email,
        password,
      })
      .pipe(
        catchError((error) => {
          this.myHotToastService.error(
            error.error.message ?? 'Erro ao criar usuário'
          );
          throw error;
        })
      )
      .subscribe((user) => {
        this.myHotToastService.success('Seja bem vindo ' + user.name);
        this.router.navigate(['/home']);
      });
  }
}
