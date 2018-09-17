import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { SelectBoxComponent } from './select-box/select-box.component';
import { LayoutComponent } from './layout/layout.component';
import { BladeRendererComponent } from './blade-renderer/blade-renderer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [TextInputComponent, SelectBoxComponent, LayoutComponent],
  exports: [TextInputComponent, SelectBoxComponent, LayoutComponent, BladeRendererComponent],
  declarations: [TextInputComponent, SelectBoxComponent, LayoutComponent, BladeRendererComponent]
})
export class UiModule { }
