<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	// ========= PROPS ===========

	/** @type {number} */
	export let cellValue

	/** @type {number} */
	export let colIndex

	/** @type {number} */
	export let rowIndex

	/** @type {boolean} */
	export let isHighlighted

	// ======== INTERNAL VARS ===========

	/** @type {HTMLDivElement} */
	let _selectedCell

	/** @type {boolean} */
	let _isSelected

	let _index = cellValue

	let _displayCellVals = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9]

	// ======= EVENT HANDLING ===========

	/** @param {Event} ev */
	function handleHoveredCell(ev) {
		if (ev.target == _selectedCell) {
			const hoverData = {
				row: rowIndex,
				col: colIndex
			}
			dispatch('hoverCell', hoverData)
		}
	}

	function increment() {
		// make the cell editable only ifit's initial value is zero
		if (cellValue == 0) {
			_index = (_index + 1) % _displayCellVals.length
			updateVals()
		}
	}

	function updateVals() {
		const data = {
			value: _displayCellVals[_index],
			row: rowIndex,
			col: colIndex
		}
		dispatch('updateCell', data)
	}
</script>

<!-- DOM  -->

<svelte:window on:mouseover={(e) => handleHoveredCell(e)} />

<div
	class="border flex justify-center items-center w-16 h-16 select-none cursor-pointer {isHighlighted
		? '!bg-sky-100 !border-sky-300'
		: ''}"
	class:v-separator={colIndex == 2 || colIndex == 5}
	class:h-separator={rowIndex == 2 || rowIndex == 5}
	class:locked={cellValue !== 0}
	on:click={increment}
	on:keydown
	bind:this={_selectedCell}
	role="cell"
	tabindex="0"
>
	{_displayCellVals[_index]}
</div>

<style>
	.locked {
		@apply bg-gray-100;
	}
	.v-separator {
		@apply border-r-gray-400;
	}
	.h-separator {
		@apply border-b-gray-400;
	}
</style>
