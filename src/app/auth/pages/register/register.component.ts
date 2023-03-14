import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup;

  constructor(private fb: FormBuilder,
    private router:Router,
    private authService:AuthService,
    private snackBar: MatSnackBar
    ) {

    this.miFormulario = this.fb.group({
      nombre: ['manuel', [Validators.required]],
      apellido: ['guzman', [Validators.required]],
      doctoIdent: ['1007409899', [Validators.required]],
      email: ['manuelguma25@gmail.com', [Validators.required, Validators.email]],
      cia: ['10', []],
      clave: ['1234567', [Validators.required, Validators.minLength(6)]],
      claveConfirm: ['1234567', Validators.required]
    }, {
      validators: this.passwordsIguales('clave', 'claveConfirm')
    })



  }
  passwordsIguales(arg0: string, arg1: string): any {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(arg0);
      const pass2Control = formGroup.get(arg1);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }
  ngOnInit(): void {

  }

  registro(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
    console.log(this.miFormulario.controls);
    if (this.miFormulario.valid) {
      const userRegister: RegisterRequest ={
        nombre: this.miFormulario.get('nombre')?.value,
        apellido: this.miFormulario.get('apellido')?.value,
        email: this.miFormulario.get('email')?.value,
        doctoIdent: this.miFormulario.get('doctoIdent')?.value,
        cia: this.miFormulario.get('cia')?.value,
        clave: this.miFormulario.get('clave')?.value
      };

   const {}= this.miFormulario.value;



    this.authService.register(userRegister).subscribe(resp=>{
      console.log("resp", resp);

      if(resp.token){
        this.router.navigateByUrl("/dashboard")
      }else{
        this.mostrarSnakbar(resp);
      }

    })
    //this.router.navigateByUrl("/dashboard")
  }
  }

  mostrarSnakbar(mensaje: string) {

    this.snackBar.open(mensaje, 'error!', {
      duration: 2500,



    });

  }
}
