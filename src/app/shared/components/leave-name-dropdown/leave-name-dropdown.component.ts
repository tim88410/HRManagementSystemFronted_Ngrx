import { Component, Input, forwardRef } from '@angular/core';
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
  @Input() options: string[] = [];

  value: string = '';

  onChange = (value: any) => {};
  onTouchedHandler = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedHandler = fn;
  }

  onSelectChange(value: string): void {
    this.value = value;
    this.onChange(value);
  }
}
