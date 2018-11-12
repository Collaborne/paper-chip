/**
A section of chips

### Example

```html
<paper-chips-section header="Fruits" labels=[[arrayOfStrings]]></paper-chips-section>
```

@demo demo/chips-section.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/paper-styles/typography.js';
import './paper-chip.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/polymer-element.js';

Polymer({
	_template: html`
		<style>
			:host {
				display: block;
				padding: 0 16px 10px 16px;
			}

			.header {
				@apply --paper-font-subhead;
				color: var(--secondary-text-color);
				margin-top: 10px;
			}

			.label {
				margin-top: 10px;
				margin-right: 10px;
			}
		</style>

		<div class="header" hidden=[[!header]]>[[header]]</div>
		<template is="dom-repeat" items=[[labels]] as="label">
			<paper-chip class="label">[[label]]</paper-chip>
		</template>
	`,
    is: 'paper-chips-section',
    properties: {
		/**
		* Text shown in the header
		*/
		header: String,

		/**
		* Array of labels, e.g. [ 'Apples', 'Pears', 'Oranges' ]
		*/
		labels: Array
    }
});
