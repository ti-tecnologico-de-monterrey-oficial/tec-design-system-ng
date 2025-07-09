import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/file/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6-4892&m=dev',
  {
    props: {
      text: figma.string('Text'),
      state: figma.enum('State', {
        Enabled: 'false',
        Disabled: 'true',
        Hovered: 'false',
        Selected: 'false',
      }),
    },
    example: (props) =>
      html`<button
          BmbButtonDirective
          [disabled]="${props.state}"
          (onClick)="onClick($event)"
        >
          ${props.text}
        </button>

        <script>
          export class Example {
            public onClick() {
              alert("You clicked ${props.text}");
            }
          }
        </script>`,
    imports: [
      "import { BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    ],
  },
);
