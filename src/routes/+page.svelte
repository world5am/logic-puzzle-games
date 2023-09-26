<script>
	import { sudokuGrid, checkSudoku } from '$lib'
	import Board from '$lib/components/Board.svelte'
	import Keypad from '$lib/components/Keypad.svelte'

	let /**@type {Board}*/ board
	let /**@type {Set<HTMLElement>}*/ lockedCellSet

	let /**@type {HTMLElement}*/ selectedElement
	let /**@type {boolean}*/ isCellEditable

	let /**@type {number}*/ value
	let /**@type {number|undefined}*/ row
	let /**@type {number|undefined}*/ col

	let /**@type {boolean}*/ isBoardValid = true



	//:::--=--=--  EVENT HANDLERS  --=--::::::


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
				sudokuGrid[row][col] = 0
				isBoardValid = checkSudoku(sudokuGrid).isValid
				board.findSameValues(selectedElement, lockedCellSet)
			}
		}
	}

	/**@param {CustomEvent} ev*/
	function handleKeypadNumEvent(ev) {
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
				sudokuGrid[row][col] = value
				isBoardValid = checkSudoku(sudokuGrid).isValid
				board.findSameValues(selectedElement, lockedCellSet)
			}
		}
	}
</script>

<!-- :::--=--=--  DOM  --=--:::: -->

<svelte:head>
	<title>Sudoku - world5am</title>
</svelte:head>

<section class="flex flex-col xl:flex-row justify-around items-center h-screen mx-auto max-w-6xl">
	<div>
		<Board
			bind:this={board}
			bind:lockedCellSet
			on:select={handleSelectedCell}
			on:contextmenu={handleKeypadDeleteEvent}
			{isBoardValid}
		/>
	</div>
	<div>
		<Keypad
			on:delete={handleKeypadDeleteEvent}
			on:number={handleKeypadNumEvent}
		/>
	</div>
</section>

<!-- :::--=--=-- MORE CSS --=--:::::: -->

<style lang="postcss">
	:global(body) {
		@apply bg-black;
	}
</style>
