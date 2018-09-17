import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  viewConfig = [
    // this.createLayoutViewConfig()
    this.createTextInputViewConfig(1),
    this.createTextInputViewConfig(2)
  ];

  private createLayoutViewConfig() {
    return {
      view: 'layout',
      viewModel: {
        childViews: [
          this.createTextInputViewConfig(3),
          this.createTextInputViewConfig(4)
        ],
        model: null
      }
    };
  }

  private createTextInputViewConfig(id) {
    return {
      view: 'textInput',
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
          outputs: [
            {
              name: 'onKeyup',
              handler: (e) => console.log(`on blur from ${id}`, e)
            }
          ],
        }
      }
    };
  }

}
