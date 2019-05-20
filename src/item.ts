export interface Item {
	/**
	 * Unique identification of the item
	 */
	id: string;

	/**
	 * Display name of the item
	 */
	name: string;

	image?: string;

	/**
	 * False if the item can't be removed
	 */
	fixed?: boolean;
}
