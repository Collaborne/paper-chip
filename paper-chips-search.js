import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronA11yKeysBehavior} from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import '@polymer/iron-input';

import './paper-chips.js';

/**
A search box in which selected values are collected as chips. This element can
be used to let users enter topics or contacts.

### Example

```html
<paper-chips-search items=[[array]]></paper-chips-search>
```

@demo demo/chips-search.html
*/
class PaperChip extends mixinBehaviors([IronA11yKeysBehavior], PolymerElement) {
	static get template() {
		return html`
		<style>
			:host {
				background: white;
				display: block;
				padding: 5px 16px;
				min-height: 40px;
				@apply --paper-chips-search;
			}

			paper-chips {
				--paper-chips-chip: {
					margin-top: 4px;
					margin-bottom: 4px;
				}
			}

			iron-input {
				height: 32px;
				width: 40%;
				vertical-align: middle;
			}

			#input {
				border: 0;
				outline: 0;
				padding: 0;
				height: 100%;
				width: 100%;
				@apply --paper-chips-search-input;
			}

			#input::placeholder {
				@apply --paper-chips-search-input-placeholder;
			}
		</style>

		<paper-chips
			id="chips"
			items="{{items}}"
			on-delete-item="focus"
		></paper-chips>
		<iron-input bind-value="{{value}}">
			<input
				id="input"
				placeholder="[[placeholder]]"
				autofocus="[[autofocus]]"
			>
		</iron-input>`;
	}

	static get is() {
		return 'paper-chips-search';
	}

	static get properties() {
		return {
			autofocus: Boolean,

			/**
			* Array of chips, e.g. [
			*  { id: 'apples', name: 'Apples'},
			*  { id: 'pears', name: 'Pears'},
			*  { id: 'bananas', name: 'Bananas', fixed: true}
			* ]
			*/
			items: {
				notify: true,
				type: Array,
				value: [],
			},

			/**
			 * Text shown in the search box if the user didn't enter any search
			 */
			placeholder: {
				type: String,
				value: 'Search',
			},

			/**
			 * Backwards compatibility. Use value instead.
			 */
			search: {
				computed: '_copy(value)',
				type: String,
			},

			/**
			 * Text for which the user is searching
			 */
			value: {
				notify: true,
				type: String,
				value: '',
			},
		};
	}

	get keyBindings() {
		return {
			backspace: '_removeLastChip'
		};
	}

	/**
	* Adds a chip
	* @param {object} item To be added chip
	* @returns {void}
	*/
	add(item) {
		this.$.chips.add(item);

		// Clear current search term
		this.value = '';

		this.focus();
	}

	/**
	* Focuses the input box
	* @returns {void}
	*/
	focus() {
		this.$.input.focus();
	}

	_removeLastChip() {
		// If there is search then backspace will remove some text, otherwise
		// we check whether the last chip is not fixed and should be removed.
		if (this.value.length === 0) {
			if (!this.$.chips.empty && !this.$.chips.items[this.$.chips.items.length - 1].fixed) {
				this.$.chips.removeLast();
			}
		}
	}

	_copy(value) {
		return value;
	}
}
window.customElements.define(PaperChip.is, PaperChip);
