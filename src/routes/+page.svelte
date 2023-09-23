<script>
	import { sudokuGrid, checkSudoku } from '$lib'
	import Board from '$lib/components/Board.svelte'
	import Keypad from '$lib/components/Keypad.svelte'

	let editSudokuGrid = sudokuGrid

	let /**@type {Board}*/ board
	let /**@type {Set<HTMLElement>}*/ lockedCellSet

	let /**@type {HTMLElement}*/ selectedElement
	let /**@type {boolean}*/ isCellEditable

	let /**@type {number}*/ value
	let /**@type {number|undefined}*/ row
	let /**@type {number|undefined}*/ col

	let /**@type {boolean}*/ isBoardValid = true

	let /**@type {any[] | NodeListOf<Element>}*/ oldCells
	let /**@type {any[] | NodeListOf<Element>}*/ cells

	/**@param {CustomEvent} ev*/
	function handleSelectedCell(ev) {
		selectedElement = ev.detail.element
		isCellEditable = ev.detail.isEditable
	}

	function handleKeypadDeleteEvent() {
		if (
			selectedElement &&
			selectedElement.dataset.row &&
			selectedElement.dataset.col &&
			isCellEditable
		) {
			row = parseInt(selectedElement.dataset.row)
			col = parseInt(selectedElement.dataset.col)

			if (row !== undefined && col !== undefined) {
				selectedElement.innerHTML = ''
				editSudokuGrid[row][col] = 0
				isBoardValid = checkSudoku(editSudokuGrid).isValid
				board.findSameValues(selectedElement, lockedCellSet)
			}
		}
	}

	/**@param {CustomEvent} ev*/
	function handleKeypadEvent(ev) {
		if (
			selectedElement &&
			selectedElement.dataset.row &&
			selectedElement.dataset.col &&
			isCellEditable
		) {
			value = ev.detail.num
			row = parseInt(selectedElement.dataset.row)
			col = parseInt(selectedElement.dataset.col)

			if (row !== undefined && col !== undefined) {
				selectedElement.innerHTML = value.toString()
				editSudokuGrid[row][col] = value
				isBoardValid = checkSudoku(editSudokuGrid).isValid
				board.findSameValues(selectedElement, lockedCellSet)
			}
		}
	}
</script>

<svelte:head>
	<title>Sudoku - world5am</title>
</svelte:head>



<section class="flex justify-around items-center sm:flex-col h-screen mx-auto max-w-6xl">
	<div class="flex flex-col gap-1">
		<Board
			bind:this={board}	
			bind:lockedCellSet
			on:select={handleSelectedCell}
		/>
		{#if isBoardValid}
			<div class="p-1 text-center text-md font-sourcepro text-green-900 bg-green-500">
				Valid
			</div>
		{:else}
		<div class="p-1 text-center font-sourcepro bg-red-500 text-red-900">
			Invalid
		</div>
		{/if}
	</div>
	<div>
		<Keypad
			on:delete={handleKeypadDeleteEvent}
			on:number={handleKeypadEvent}
		/>
	</div>
</section>

<style lang="postcss">
	:global(body){
		@apply bg-black
	}
</style>
