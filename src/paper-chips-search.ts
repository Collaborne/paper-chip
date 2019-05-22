import { css, customElement, html, LitElement, property, query } from 'lit-element';

import '@polymer/iron-input';

import { Item } from './item.js';
import './paper-chips.js';

/**
 * A search box in which selected values are collected as chips. This element can
 * be used to let users enter topics or contacts.
 *
 * @demo demo/chips-search.html
 */
@customElement('paper-chips-search')
export class PaperChipsSearch extends LitElement {
	@property({type: Boolean})
	public autofocus: boolean = false;

	/**
	 * Text shown in the search box if the user didn't enter any search
	 */
	@property({type: String})
	public placeholder: string = 'Search';

	/**
	 * Text for which the user is searching
	 */
	@property({type: String})
	public value?: string;

	/**
	 * Array of chips
	 */
	@property({type: Array})
	public items: Item[] = [];

	@query('#input')
	private inputEl?: HTMLInputElement;

	static get styles() {
		return css`
			:host {
				display: block;
				padding: var(--paper-chips-search-padding, 5px 16px);
				background: var(--paper-chips-search-background, white);
				color: var(--paper-chips-search-color);
				--paper-chips-margin: 2px 0;
				--paper-chips-font-size: var(--paper-chips-search-font-size);
				--paper-chips-font-family: var(--paper-chips-search-font-family);
			}

			#input {
				border: 0;
				outline: 0;
				padding: 0;
				height: 32px;
				width: 40%;
				vertical-align: middle;
				margin: 2px 0;
				background: transparent;
				font-size: var(--paper-chips-search-font-size);
				font-family: var(--paper-chips-search-font-family);
			}

			#input::placeholder {
				color: var(--paper-chips-search-placeholder-color);
			}
		`;
	}

	/**
	 * Adds a chip
	 * @param item To be added chip
	 */
	public add(item: Item) {
		// Only chips with a visible name
		if (!item.name || item.name === '') {
			return;
		}

		// Needs to use Polymer push to trigger data binding
		this.items = this.items.concat(item);

		// Clear current search term
		this.value = '';

		this.focus();
	}

	/**
	 * Focuses the input box
	 */
	public focus() {
		this.inputEl!.focus();
	}

	protected render() {
		return html`
			<paper-chips
				id="chips"
				.items="${this.items}"
				@delete-item="${this.onDeleteItem}"
			></paper-chips>
			<input
				id="input"
				.value="${this.value || ''}"
				.placeholder="${this.placeholder}"
				?autofocus="${this.autofocus}"
				@keydown="${this.onKeydown}"
				@input="${this.onInput}"
			>
		`;
	}

	static get is() {
		return 'paper-chips-search';
	}

	private onDeleteItem(e: any) {
		const { item } = e.detail;
		this.delete(item);

		this.focus();
	}

	private onKeydown(e: any) {
		if (e.key === 'Backspace') {
			this.removeLastChip();
		}
	}

	private onInput() {
		this.value = this.inputEl!.value;
	}

	/**
	 * Handles clicks on the delete icon
	 */
	private delete(item: Item) {
		if (item.fixed) {
			// Cannot delete fixed items.
			return;
		}

		this.items = this.items.filter(aItem => aItem.id !== item.id);

		this.dispatchEvent(new CustomEvent('delete-item', {
			bubbles: true,
			composed: true,
			detail: {
				itemId: item.id,
			},
		}));
	}

	private removeLastChip() {
		// If there is search then backspace will remove some text, otherwise
		// we check whether the last chip is not fixed and should be removed.
		if (!this.value || this.value.length === 0) {
			// Ignore if there are no chips left
			if (this.items.length === 0) {
				return;
			}

			const lastItem = this.items[this.items.length - 1];
			this.delete(lastItem);
		}
	}
}
