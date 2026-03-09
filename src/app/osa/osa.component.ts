import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CountdownHeaderComponent } from '../countdown-header/countdown-header.component';

@Component({
  selector: 'app-osa',
  imports: [CountdownHeaderComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './osa.component.html',
  styleUrl: './osa.component.scss'
})
export class OsaComponent {
  private fb = inject(NonNullableFormBuilder);
  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private phonePattern = /^(?=(?:.*\d){7})[0-9\s\-+()]{7,20}$/;

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
        email.setValidators([Validators.required, Validators.pattern(this.emailPattern)]);
        phone.setValidators([Validators.required, Validators.pattern(this.phonePattern)]);
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
    this.sanitizeFields();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted = true;
  }

  private sanitizeFields() {
    for (const control of Object.values(this.form.controls)) {
      if (typeof control.value === 'string') {
        control.setValue(this.sanitize(control.value));
      }
    }
  }

  private sanitize(value: string): string {
    let sanitized = value.trim();
    while (/^[=@\t\r]/.test(sanitized)) {
      sanitized = sanitized.slice(1).trim();
    }
    return sanitized;
  }

  resetForm() {
    this.form.reset();
    this.submitted = false;
  }
}
