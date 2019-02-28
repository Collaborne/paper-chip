import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '@polymer/iron-icon';
import '@polymer/paper-styles/default-theme';

import './paper-chip.js';
import './paper-chip-icons.js';

/**
A list of chips that an be dynamically added/removed. This element can be used
to let users enter a list of topics or names.

### Example

```html
<paper-chips items=[[array]]></paper-chips>
```

### Items

The items given via the `items` property can have these properties:

Property | Description
---------|-------------
`id`     | Unique identification of the item (required)
`name`   | Display name of the item
`fixed`  | Boolean to indicate whether this item can be removed (`fixed` is `false`) or not (`fixed` is `true`)

@demo demo/chips.html
*/
class PaperChips extends GestureEventListeners(PolymerElement) {
	static get template() {
		return html`
		<style>
			.chip {
				@apply --paper-chips-chip;
				margin-right: 5px;
				padding-right: 6px;
				vertical-align: middle;
			}
			.chip:not([has-no-image]) {
				--paper-chip: {
					padding: 0 12px 0 0;
					overflow: hidden;
				}
			}

			img {
				width: 32px;
				height: 32px;
				border-radius: 0 50% 50% 0;
				vertical-align: middle;
				margin-right: 4px;
			}
			.image-spacer {
				margin-left: 12px;
			}

			.delete {
				--iron-icon-height: 20px;
				--iron-icon-width: 20px;
				color: var(--disabled-text-color);
			}

			.chip[selectable]:hover .delete {
				color: black;
			}

			[hidden] {
				display: none;
			}
		</style>

		<template is="dom-repeat" items="[[items]]">
			<paper-chip
				class="chip"
				selectable$="[[!item.fixed]]"
				has-no-image$="[[!item.image]]">
				<img src="[[_defaultToEmpty(item.image)]]" hidden$="[[!item.image]]" />
				[[item.name]]
				<iron-icon
					icon="paper-chip:[[_getIcon(item)]]"
					class="delete"
					on-tap="_delete"
				></iron-icon>
			</paper-chip>
		</template>`;
	}

	static get is() {
		return 'paper-chips';
	}

	static get properties() {
		return {

			/**
			* True if no items are currently known
			*/
			empty: {
				computed: '_computeEmpty(items.length)',
				notify: true,
				type: Boolean,
			},

			/**
			* Array of chips
			*
			* ```js
			* [
			*  { id: 'apples', name: 'Apples', image:'apple.jpg' },
			*  { id: 'pears', name: 'Pears', image:'pear.jpg'},
			*  { id: 'bananas', name: 'Bananas', fixed: true}
			* ]
			* ```
			*/
			items: {
				notify: true,
				type: Array,
				value: [],
			},
		};
	}

	/**
	* Adds a chip
	* @param {object} item To be added chip
	* @returns {void}
	*/
	add(item) {
		// Only chips with a visible name
		if (typeof item.name === 'undefined' || item.name === '') {
			return;
		}

		// Needs to use Polymer push to trigger data binding
		this.push('items', item);
	}

	/**
	* Removes a chip
	*
	* Note that this will also remove chips marked as 'fixed'.
	* @param {number} itemIndex Index of the to be removed chip
	* @returns {void}
	*/
	remove(itemIndex) {
		const removedItemId = this.items[itemIndex].id;

		// Needs to use Polymer splice to trigger data binding
		this.splice('items', itemIndex, 1);

		this.dispatchEvent(new CustomEvent('delete-item', {
			bubbles: true,
			composed: true,
			detail: {
				itemId: removedItemId,
			},
		}));
	}

	/**
	* Removes the last chip
	*
	* Note that this will also remove chips marked as 'fixed'.
	* @returns {void}
	*/
	removeLast() {
		// Ignore if there are no chips left
		if (this.items.length === 0) {
			return;
		}

		this.remove(this.items.length - 1);
	}

	/**
	* Handles clicks on the delete icon
	* @param {any} e Event for deletion
	* @returns {void}
	*/
	_delete(e) {
		if (e.model.item.fixed) {
			// Cannot delete fixed items.
			return;
		}

		const itemIndex = this.items.indexOf(e.model.item);
		if (itemIndex > -1) {
			this.remove(itemIndex);
		}
	}

	_computeEmpty(nrItems) {
		return nrItems === 0;
	}

	/**
	 * @param {string} str String value
	 * @returns {string} Provided value or empty string
	 */
	_defaultToEmpty(str) {
		return str || '';
	}

	_getIcon(item) {
		return item.fixed ? 'lock' : 'cancel';
	}
}
window.customElements.define(PaperChips.is, PaperChips);
