import {Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef} from '@angular/core';
import {TextInputComponent} from "../text-input/text-input.component";

@Component({
  selector: 'kt-blade-renderer',
  templateUrl: './blade-renderer.component.html',
  styleUrls: ['./blade-renderer.component.css']
})
export class BladeRendererComponent implements OnInit {

  @Input() view: string;

  @Input() viewModel: any;

  constructor(private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    console.log(this.view);
    console.log(this.viewModel);
    this.render(this.view, this.viewModel);
  }

  render(view, viewModel) {
    switch (view) {
      case 'textInput':
        return this.buildTextInput(viewModel);
      case 'selectBox':
        break;
      case 'layout':
        break;
      default:
        // render unknown view UI
        break;
    }
  }

  private buildTextInput(viewModel) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextInputComponent);
    const componentRef = this.viewContainerRef.createComponent(
      componentFactory,
      0,
      undefined,
      []
    );
    const textInput = componentRef.instance;
    viewModel.model.inputs.forEach(input => {
      textInput[input.name] = input.value;
    });
    viewModel.model.outputs.forEach(output => {
      if (textInput[output.name]) {
        textInput[output.name].subscribe(output.handler);
      }
    });
    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location.nativeElement;
  }

  private buildSelectBox(viewModel) {
  }

  private buildLayout(viewModel) {
  }

}
