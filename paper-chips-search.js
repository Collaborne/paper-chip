/**
A search box in which selected values are collected as chips. This element can
be used to let users enter topics or contacts.

### Example

```html
<paper-chips-search items=[[array]]></paper-chips-search>
```

@demo demo/chips-search.html
*/
import '@polymer/polymer/polymer-legacy.js';

import { IronA11yKeysBehavior } from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import '@polymer/iron-input/iron-input.js';
import './paper-chips.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/polymer-element.js';
Polymer({
    _template: html`<style>
    :host {
        background: white;
        display: block;
        padding: 5px 16px;
        min-height: 32px;
        line-height: 40px;
        @apply --paper-chips-search;
    }

    iron-input {
        width: 40%;
    }

    #input {
        border: 0;
        outline: 0;
        height: 32px;
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
<iron-input bind-value="{{search}}">
    <input
        is="iron-input"
        id="input"
        placeholder="[[_getPlaceholder(items.length, placeholder)]]"
        autofocus="[[autofocus]]"
    >
</iron-input>`,
    is: 'paper-chips-search',
    properties: {
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

        /**
        * Bind this to the `<input is="iron-input">`'s `autofocus` property.
        */
        autofocus: Boolean
    },

    behaviors: [
        IronA11yKeysBehavior
    ],

    keyBindings: {
        'backspace': '_removeLastChip'
    },

    /**
    * Adds a chip
    */
    add: function(item) {
        this.$.chips.add(item);

        // Clear current search term
        this.search = '';

        this.focus();
    },

    /**
    * Focuses the input box
    */
    focus: function() {
        this.$.input.focus();
    },

    /**
    * Only show the placeholder if no non-fixed items are selected
    */
    _getPlaceholder: function(nrItems, placeholder) {
        const nonFixedItems = this.items.filter(item => !item.fixed);
        if (Boolean(nonFixedItems) && nonFixedItems.length > 0) {
            return '';
        }

        return placeholder;
    },

    _removeLastChip: function() {
        // If there is search then backspace will remove some text, otherwise
        // we check whether the last chip is not fixed and should be removed.
        if (this.search.length === 0) {
            if (!this.$.chips.empty && !this.$.chips.items[this.$.chips.items.length - 1].fixed) {
                this.$.chips.removeLast();
            }
        }
    }
});
