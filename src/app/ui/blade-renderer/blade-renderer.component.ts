import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'kt-blade-renderer',
  templateUrl: './blade-renderer.component.html',
  styleUrls: ['./blade-renderer.component.css']
})
export class BladeRendererComponent implements OnInit {

  @Input() view: any;

  @Input() viewModel: any;

  constructor(private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.buildComponent(this.viewModel, this.view);
  }

  private buildComponent<T>(viewModel, componentToResolve: Type<T>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToResolve);
    const componentRef = this.viewContainerRef.createComponent(
      componentFactory,
      0,
      undefined,
      []
    );
    const componentInstance = componentRef.instance;
    if (viewModel.model) {

      const allowedInputs = componentFactory.inputs;
      viewModel.model.inputs.forEach(input => {
        const allowed = !!allowedInputs.find(ai => ai.propName === input.name);
        if (allowed) {
          componentInstance[input.name] = input.value;
        } else {
          console.error(`invalid input name ${input.name}`);
        }
      });

      const allowedOutputs = componentFactory.outputs;
      viewModel.model.outputs.forEach(output => {
        const allowed = !!allowedOutputs.find(ai => ai.propName === output.name);
        if (allowed) {
          componentInstance[output.name].subscribe(output.handler);
        } else {
          console.error(`invalid output name ${output.name}`);
        }
      });
    }

    if (viewModel.childViews.length) {
      const children = viewModel.childViews.map(v => this.buildComponent(v.viewModel, v.view));
      children.forEach(c => componentRef.location.nativeElement.appendChild(c));
    }

    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location.nativeElement;
  }
}
