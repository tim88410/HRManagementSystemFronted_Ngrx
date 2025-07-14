import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-leave-name-dropdown',
  template: `
    <select (change)="onChangeHandler($event)" (blur)="onTouchedHandler()" required>
      <option value="">-- 請選擇假別 --</option>
      <option *ngFor="let option of options" [value]="option">{{ option }}</option>
    </select>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LeaveNameDropdownComponent),
    multi: true
  }]
})
export class LeaveNameDropdownComponent implements ControlValueAccessor {
  options = ['病假', '事假', '公假', '生日假', '喪假', '婚假'];
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  onChangeHandler(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.onChange(value);
  }
  onTouchedHandler(): void {
    this.onTouched();
  }
}
