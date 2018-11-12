/**
A material design [chip](https://www.google.com/design/spec/components/chips.html)

### Example

```html
<paper-chip>Apples</paper-chip>
```

### Styling
The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--paper-chip-background` | The background color of the chip | `--paper-grey-300`
`--paper-chip-background-selectable` | The background color hover of the chip | `--paper-grey-600`
`--paper-chip-color` | The text color | `--primary-text-color`
`--paper-chip-color-selectable` | The text color hover of the chip | `white`

@demo demo/chip.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/paper-styles/color.js';
import '@polymer/paper-styles/typography.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/polymer-element.js';
Polymer({
    _template: html`
    <style>
			:host {
				display: inline-block;
				background-color: var(--paper-chip-background, var(--paper-grey-300));
				height: 32px;
				line-height: 32px!important;
				padding: 0 12px;
				border-radius: 16px;
				color: var(--paper-chip-color, --primary-text-color);
				font-size: 13px!important;
				@apply --paper-font-body1;
				@apply --paper-chip;
			}

			:host([selectable]) {
				cursor: pointer;
			}

			:host([selectable]:hover) {
				background-color: var(--paper-chip-background-selectable, var(--paper-grey-400));
			}
		</style>

		<slot></slot>
    `,
    is: 'paper-chip',
    properties: {
				selectable: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
				},
    },

});
