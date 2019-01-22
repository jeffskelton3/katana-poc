import {Component, Type} from '@angular/core';
import {LayoutComponent} from './ui/layout/layout.component';
import {TextInputComponent} from './ui/text-input/text-input.component';
import {SelectBoxComponent} from './ui/select-box/select-box.component';

export interface View {
  viewModel: {
    childViews: View[],
    model: {
      inputs: { name: string, value: any }[],
      outputs: { name: string, handler: any }[]
    }
  };
  view: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  viewConfig: View[] = [
    this.createLayoutViewConfig(),
    this.createTextInputViewConfig(1),
    this.createTextInputViewConfig(2),
    this.createSelectBoxViewConfig(3)
  ];

  private createLayoutViewConfig(): View {
    return {
      view: LayoutComponent,
      viewModel: {
        childViews: [
          this.createTextInputViewConfig(3),
          this.createTextInputViewConfig(4),
          {
            view: LayoutComponent,
            viewModel: {
              childViews: [
                this.createTextInputViewConfig(5),
                this.createTextInputViewConfig(6),
                this.createSelectBoxViewConfig(7),
              ],
              model: null
            }
          }
        ],
        model: null
      }
    };
  }

  private createTextInputViewConfig(id): View {
    return {
      view: TextInputComponent,
      viewModel: {
        childViews: [],
        model: {
          inputs: [{
            name: 'placeholder',
            value: `it worked for id ${id}!!`
          }, {
            name: 'defaultValue',
            value: 'this is my default value'
          }],
          outputs: [{
            name: 'onKeyup',
            handler: (e) => console.log(e.target.value)
          }],
        }
      }
    };
  }

  private createSelectBoxViewConfig(id): View {
    return {
      view: SelectBoxComponent,
      viewModel: {
        childViews: [],
        model: {
          inputs: [{
            name: 'options',
            value: [
              {label: 'foo', value: 'foo'},
              {label: 'bar', value: 'bar'},
            ]
          }, {
            name: 'defaultValue',
            value: 'foo'
          }],
          outputs: [
            {
              name: 'onChange',
              handler: (e) => {
                this.viewConfig.push(this.createSelectBoxViewConfig(8));
              }
            }
          ],
        }
      }
    };
  }
}
