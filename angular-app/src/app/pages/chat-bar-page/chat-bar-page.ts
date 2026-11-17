import { Component } from '@angular/core';
import { BmbChatBarComponent } from 'ui-angular';
import { PropertyPlayground } from '../migration/property-playground/property-playground';
import { createDemoConfiguration } from '../migration/property-playground/demo-configurations';

@Component({
  selector: 'app-chat-bar-page',
  imports: [PropertyPlayground],
  templateUrl: './chat-bar-page.html',
  styles: [':host { display: block; min-height: 0; }'],
})
export class ChatBarPage {
  readonly component = BmbChatBarComponent;
  readonly configuration = createDemoConfiguration('chat-bar');
}
