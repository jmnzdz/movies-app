import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent implements OnInit, ControlValueAccessor {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() items!: string[];

  value: any;

  constructor() { }

  ngOnInit(): void { }

  add(event: MatChipInputEvent) {
    if (event.value && !this.includes(event.value)) {
      this.items.push(event.value);
    }
    event.chipInput!.clear();
  }

  includes(value: string) {
    const find = this.items.find(val => val.toLowerCase() == value.toLowerCase());
    return find ? true : false;
  }

  remove(value: string) {
    const index = this.items.indexOf(value);
    this.items.splice(index, 1);
  }

  writeValue(value: string[]): void {
    console.log(value);
    this.value = value;
  }

  registerOnChange(fn: any): void { }

  registerOnTouched(fn: any): void { }
}
