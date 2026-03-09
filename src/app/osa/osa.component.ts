import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountdownHeaderComponent } from '../countdown-header/countdown-header.component';

@Component({
  selector: 'app-osa',
  imports: [CountdownHeaderComponent, ReactiveFormsModule],
  templateUrl: './osa.component.html',
  styleUrl: './osa.component.scss'
})
export class OsaComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    attending: ['', Validators.required],
    email: [''],
    phone: [''],
    fridayPredrinks: [''],
    dietary: [''],
  });

  attending = toSignal(this.form.controls.attending.valueChanges, { initialValue: '' });

  submitted = false;

  constructor() {
    effect(() => {
      const value = this.attending();
      const { email, phone, fridayPredrinks, dietary } = this.form.controls;

      if (value === 'ja') {
        email.setValidators([Validators.required, Validators.email]);
        phone.setValidators(Validators.required);
        fridayPredrinks.setValidators(Validators.required);
      } else {
        email.clearValidators();
        phone.clearValidators();
        fridayPredrinks.clearValidators();
        email.setValue('');
        phone.setValue('');
        fridayPredrinks.setValue('');
        dietary.setValue('');
      }

      email.updateValueAndValidity();
      phone.updateValueAndValidity();
      fridayPredrinks.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted = true;
  }
}
