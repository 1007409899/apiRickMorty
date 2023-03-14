import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar,
  ) {

    this.miFormulario = this.fb.group({
      username: ['ejemplo@gmail.com', [Validators.required, Validators.email]],
      password: ['1234567', [Validators.required, Validators.minLength(6)]],
      companyId: ["10", []],
      desdeMs: [true, []],
    })

  }
  ngOnInit(): void {

  }
  get getMiFormulario() {
    return this.miFormulario.controls;
  }

  login() {
    const { username, password } = this.miFormulario.value;

    this.authService.Login(username, password).subscribe(res => {
      if (res.token) {
        console.log(res)
        this.router.navigateByUrl("/dashboard")
      } else {
        this.mostrarSnakbar(res)
      }
    })

  }

  mostrarSnakbar(mensaje: string) {

    this.snackBar.open(mensaje, 'error!', {
      duration: 2500,
    });

  }
}
