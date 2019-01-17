import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronA11yKeysBehavior } from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';

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
				min-height: 32px;
				line-height: 40px;
				@apply --paper-chips-search;
			}

			#input {
				border: 0;
				outline: 0;
				height: 32px;
				width: 40%;
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
		<input
			id="input"
			value="{{search::input}}"
			placeholder="[[_getPlaceholder(items.length, placeholder)]]"
			autofocus="[[autofocus]]"
		/>`;
	}

	static get is() {
		return 'paper-chips-search';
	}

	static get properties() {
		return {
			/**
			* Text for which the user is searching
			*/
			search: {
				type: String,
				notify: true,
				value: ''
			},

			/**
			* Array of chips, e.g. [
			*  { id: 'apples', name: 'Apples'},
			*  { id: 'pears', name: 'Pears'},
			*  { id: 'bananas', name: 'Bananas', fixed: true}
			* ]
			*/
			items: {
				type: Array,
				notify: true,
				value: []
			},

			/**
			* Text shown in the search box if the user didn't enter any search
			*/
			placeholder: {
				type: String,
				value: 'Search'
			},

			autofocus: Boolean,
		};
	}

	get keyBindings() {
		return {
			'backspace': '_removeLastChip'
		};
	}

	/**
	* Adds a chip
	*/
	add(item) {
		this.$.chips.add(item);

		// Clear current search term
		this.search = '';

		this.focus();
	}

	/**
	* Focuses the input box
	*/
	focus() {
		this.$.input.focus();
	}

	/**
	* Only show the placeholder if no non-fixed items are selected
	*/
	_getPlaceholder(nrItems, placeholder) {
		const nonFixedItems = this.items.filter(item => !item.fixed);
		if (Boolean(nonFixedItems) && nonFixedItems.length > 0) {
			return '';
		}

		return placeholder;
	}

	_removeLastChip() {
		// If there is search then backspace will remove some text, otherwise
		// we check whether the last chip is not fixed and should be removed.
		if (this.search.length === 0) {
			if (!this.$.chips.empty && !this.$.chips.items[this.$.chips.items.length - 1].fixed) {
				this.$.chips.removeLast();
			}
		}
	}
}
window.customElements.define(PaperChip.is, PaperChip);
