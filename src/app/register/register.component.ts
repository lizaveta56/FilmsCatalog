import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(320), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    confirm: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
  })


  constructor(private authService: AuthService, private toastr: ToastrService) { }

  onRegister(): void {
    if (this.registerForm.controls.password.value == this.registerForm.controls.confirm.value && !this.registerForm.invalid) {
      this.authService.register(new User({ email: this.registerForm.controls.email.value, password: this.registerForm.controls.password.value}))
        .subscribe((data) => {
          this.toastr.success('Success Register!', 'Films Service');
          this.authService.login(new User({ email: this.registerForm.controls.email.value, password: this.registerForm.controls.password.value}))
            .subscribe((data) => {
              this.toastr.success('Success login!', 'Films Service');
            })
        })
    }
  }

  ngOnInit() {
  }

}
