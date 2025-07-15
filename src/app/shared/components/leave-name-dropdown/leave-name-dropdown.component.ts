import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-leave-name-dropdown',
  templateUrl: './leave-name-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LeaveNameDropdownComponent),
      multi: true
    }
  ]
})
export class LeaveNameDropdownComponent implements ControlValueAccessor {
  options = ['病假', '事假', '公假', '生日假', '喪假', '婚假'];
  value = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj ?? ''; 
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelectChange(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  onTouchedHandler(): void {
    this.onTouched();
  }
}
