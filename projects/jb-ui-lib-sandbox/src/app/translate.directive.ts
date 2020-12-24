// import { Directive, Input, ElementRef, Renderer } from '@angular/core';
// import { TranslateService } from './translate.service';
//
// @Directive({
//   selector: '[translate]'
// })
// export class TranslateDirective {
//
//   constructor(
//     private el: ElementRef,
//     private renderer: Renderer,
//     private translate: TranslateService,
//   ) {
//     // console.log('Translate direvtive constructor', el);
//     // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
//
//   }
//
//   @Input('translate') labelValue: string;
//
//   ngOnInit() {
//     let cont = this.el.nativeElement.firstChild.textContent;
//     // console.log('Translate direvtive on Init', cont);
//     // this.el.nativeElement.firstChild.textContent = this.translate.doTranslate(cont);
//     // console.log('Input = ', this.labelValue);
//   }
//
// }
