import { css, customElement, html, LitElement, property } from 'lit-element';

import '@polymer/paper-styles/default-theme';
import '@polymer/paper-styles/typography';

import './paper-chip.js';

/**
 * A section of chips
 * @demo demo/chips-section.html
 */
@customElement('paper-chips-section')
export class PaperChipsSection extends LitElement {
	/**
	 * Text shown in the header
	 */
	@property({type: String})
	public header?: string;

	/**
	 * Array of labels, e.g. [ 'Apples', 'Pears', 'Oranges' ]
	 */
	@property({type: Array})
	public labels: string[] = [];

	/**
	 * Establishes if chips inside the section are selectable
	 */
	@property({type: Boolean})
	public selectable: boolean = false;

	static get styles() {
		return css`
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
		`;
	}

	protected render() {
		return html`
			<div class="header" ?hidden=${!this.header}>${this.header}</div>
			${this.labels.map(label => html`
				<paper-chip
					.selectable=${this.selectable}
					class="label"
					@tap="${(e: any) => this.onTapLabel(label, e)}"
				>${label}</paper-chip>
			`)}
		`;
	}

	private onTapLabel(label: string, e: any) {
		e.stopPropagation();

		if (!this.selectable) {
			// Not selectable, so ignore this.
			return;
		}
		this.dispatchEvent(new CustomEvent('label-tap', {
			bubbles: true,
			composed: true,
			detail: {
				label,
			},
		}));
	}
}
