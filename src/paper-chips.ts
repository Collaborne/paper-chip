import { css, customElement, html, LitElement, property } from 'lit-element';

import '@polymer/iron-icon';
import '@polymer/paper-styles/default-theme';

import { Item } from './item.js';
import { PAPER_CHIPS_ICONSET } from './paper-chip-icons.js';
import './paper-chip.js';

/**
 * A list of chips that an be dynamically added/removed. This element can be used
 * to let users enter a list of topics or names.
 */
@customElement('paper-chips')
export class PaperChips extends LitElement {
	@property({type: Array})
	public items: Item[] = [];

	static get styles() {
		return css`
			.chip {
				@apply --paper-chips-chip;
				margin-right: 5px;
				padding-right: 6px;
				vertical-align: middle;
			}
			.chip:not([has-no-image]) {
				padding: 0 12px 0 0;
				overflow: hidden;
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
		`;
	}

	protected render() {
		return html`
			${PAPER_CHIPS_ICONSET}
			${this.items.map(item => html`
				<paper-chip
					class="chip"
					?selectable="${!item.fixed}"
					?has-no-image="${!item.image}">
					<img .src="${item.image || ''}" ?hidden="${!item.image}" />
					${item.name}
					<iron-icon
						.icon="${item.fixed ? 'paper-chip:lock' : 'paper-chip:cancel'}"
						class="delete"
						@click="${() => this.fireDeleted(item)}"
					></iron-icon>
				</paper-chip>
			`)}
		`;
	}

	private fireDeleted(item: Item) {
		this.dispatchEvent(new CustomEvent('delete-item', {
			detail: {
				item,
			},
		}));
	}
}
