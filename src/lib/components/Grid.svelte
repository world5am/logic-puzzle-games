<script>
	import Cell from '$lib/components/Cell.svelte'
	import { sudokuGrid, isSudokuValid } from '$lib'

	let editGrid = sudokuGrid

	let /**@type {boolean} */ isValid

	let currCellTarget
	let /** Row index of the hovered cell @type {number} */ r
	let /** Column index of the hovered cell @type {number} */ c
	let /** 3x3 Block index of the hovered cell @type {number} */ b
	let hoverTarget
	const handlehoveredCell = (/** @type {CustomEvent} */ ev) => {
		r = ev.detail.row
		c = ev.detail.col
		b = Math.floor(r / 3) * 3 + Math.floor(c / 3)
		hoverTarget = ev.target
	}

	const handleupdateCell = (/** @type {CustomEvent} */ ev) => {
		let /** @type {number} */ val = parseInt(ev.detail.value)
		let /** @type {number} */ r = ev.detail.row
		let /** @type {number} */ c = ev.detail.col

		if (isNaN(val)) {
			val = 0 // Change empty string to zero
		}

		editGrid[r][c] = val
		// console.log(editGrid)
		const s = isSudokuValid(editGrid)
		s.isValid ? (isValid = true) : (isValid = false)
	}

	let /** Has pointer left the board @type {boolean} */ _ismouseOnGrid
</script>

<div
	class="grid grid-cols-9 m-0 max-w-xl"
	role="none"
	on:mouseenter={() => (_ismouseOnGrid = true)}
	on:mouseleave={() => (_ismouseOnGrid = false)}
>
	{#each sudokuGrid as row, rowIndex}
		{#each row as cellValue, colIndex}
			<Cell
				{cellValue}
				{rowIndex}
				{colIndex}
				isHighlighted={(r === rowIndex ||
					c == colIndex ||
					b == Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3)) &&
					_ismouseOnGrid}
				on:updateCell={handleupdateCell}
				on:hoverCell={handlehoveredCell}
				bind:this={currCellTarget}
			/>
		{/each}
	{/each}
</div>

{#if isValid === true}
	<div class="bg-green-500">Valid</div>
{:else if isValid == false}
	<div class="bg-red-500">Invalid</div>
{/if}
