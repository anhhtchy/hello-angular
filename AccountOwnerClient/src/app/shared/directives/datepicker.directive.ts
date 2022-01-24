import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appDatepicker]'
})
export class DatepickerDirective  implements OnInit {
  @Output() public change = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  public ngOnInit() {
    $(this.elementRef.nativeElement).datepicker({
      dateFormat: 'mm/dd/yy',
      changeYear: true,
      yearRange: "-100:+0",
      onSelect: (dateText) => {
        this.change.emit(dateText);
      }
    });
  }
}
