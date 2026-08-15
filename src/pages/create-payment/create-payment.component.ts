import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {PaymentService} from '../../entities/payment/model/payment.service';
import {Router} from '@angular/router';
import {Payment} from '../../entities/payment/model/payment.model';
import {debounceTime, distinctUntilChanged, Subscription, tap} from 'rxjs';
import {notTestUserValidator} from '../../entities/payment/help/not-test-user.validator';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-payment',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-payment.component.html',
  styleUrl: './create-payment.component.scss',
})
export class CreatePaymentComponent implements OnInit {

  private readonly paymentService = inject(PaymentService);
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = this.fb.nonNullable.group({
    recipient: ['', [
      Validators.required,
      Validators.minLength(2),
      notTestUserValidator
    ]],
    amount: [0, [
      Validators.required,
      Validators.min(1),
    ]],
    currency: ['USD' as Payment['currency'], [
      Validators.required,
    ]],
    description: ['', [
      Validators.maxLength(200),
    ]],
    tags: this.fb.array<FormControl<string>>([]),
  })

  ngOnInit() {
    this.form.controls.recipient.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(data => {
        console.log(data)
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }

  hasUnsavedChanges() {
    return this.form.dirty;
  }

  get tags() {
    return this.form.controls.tags;
  }

  addTag() {
    this.tags.push(
      this.fb.nonNullable.control('')
    );
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
  }

  const dto = this.form.getRawValue()

  this.paymentService.createPayment(dto).subscribe({
    next: () => {
      this.form.markAsPristine();
      this.router.navigate(['/payments']);
    },
    error: err => {
      alert(err);
    }
  });
  }
}
