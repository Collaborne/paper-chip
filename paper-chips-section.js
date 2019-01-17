import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/default-theme';
import '@polymer/paper-styles/typography';

import './paper-chip.js';

/**
A section of chips

### Example

```html
<paper-chips-section header="Fruits" labels=[[arrayOfStrings]]></paper-chips-section>
```

@demo demo/chips-section.html
*/
class PaperChipsSection extends PolymerElement {
	static get template() {
		return html`
		<style>
			:host {
				display: block;
				padding: 0 16px 10px 16px;
			}

			.header {
				@apply(--paper-font-subhead);
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
			<paper-chip class="label" selectable$=[[selectable]] on-tap="_onTapLabel">[[label]]</paper-chip>
		</template>`;
	}

	static get is() {
		return 'paper-chips-section';
	}

	static get properties() {
		return {
			/**
			* Text shown in the header
			*/
			header: String,

			/**
			* Array of labels, e.g. [ 'Apples', 'Pears', 'Oranges' ]
			*/
			labels: Array,
			/**
			* Establishes if chips inside the section are selectable
			*/
			selectable: {
				type: Boolean,
				value: false,
			},
		};
	}

	_onTapLabel(e) {
		e.stopPropagation();

		const label = e.model.label;
		if (!this.selectable) {
			// Not selectable, so ignore this.
			return;
		}
		this.dispatchEvent(new CustomEvent('label-tap', {
			detail: {
				label: label,
			},
			bubbles: true,
			composed: true,
		}));
	}
}
window.customElements.define(PaperChipsSection.is, PaperChipsSection);
