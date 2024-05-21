import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberFormatter]',
  standalone: true
})
export class NumberFormatterDirective {
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef, private control: NgControl) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const formattedValue = this.formatNumber(value);
    if (this.control && this.control.control) {
      this.control.control.setValue(formattedValue, { emitEvent: false });
    }
    this.el.value = formattedValue;
  }


  private formatNumber(value: string): string {
    // Eliminar cualquier carácter que no sea un número, incluidos puntos y comas
    const numericValue = value.replace(/[^0-9]/g, '');
    // Si no hay ningún valor numérico, devolver una cadena vacía
    if (!numericValue) return '';
    // Dividir la parte entera y la parte decimal
    //const [integerPart, decimalPart] = numericValue.split(',');
    // Formatear la parte entera con separador de miles
    const formattedIntegerPart = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    // Combinar parte entera y parte decimal
    const formattedValue = formattedIntegerPart;
    return formattedValue;
  }

}
