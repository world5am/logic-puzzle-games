<script>
	import { sudokuGrid, isSudokuValid} from '$lib'
	import Board from '$lib/components/Board.svelte'
	import Keypad from '$lib/components/Keypad.svelte'

	let editSudokuGrid = sudokuGrid

	let /**@type {number}*/ value
	let /**@type {number|undefined}*/ row
	let /**@type {number|undefined}*/ col
	let /**@type {HTMLElement}*/ el
	let /**@type {boolean}*/ isEditable

	/**@param {CustomEvent} ev*/
	function handleSelectedCell(ev) {
		el = ev.detail.element
		isEditable = ev.detail.isEditable
		console.log(el.dataset, `editable: ${isEditable}`)
	}

	/**@param {CustomEvent} ev*/
	function handleDeleteEvent(ev) {
		
		if (el && isEditable) {
			el.innerHTML = ''
			if (row !== undefined && col !== undefined) 
				editSudokuGrid[row][col] = 0
				console.log(isSudokuValid(editSudokuGrid))				

		}

		let oldCells = document.querySelectorAll('.bg-blue-200')
			oldCells.forEach(cell => cell.classList.remove('bg-blue-200'))
	}

	/**@param {CustomEvent} ev*/
	function handleKeypadNumPress(ev) {
		if (el && isEditable) {
			value = ev.detail.num
			row = el.dataset.row ? parseInt(el.dataset.row) : undefined
			col = el.dataset.col ? parseInt(el.dataset.col) : undefined
	
			if (row !== undefined && col !== undefined) {
				el.innerHTML = value.toString()
				editSudokuGrid[row][col] = value
				console.log(isSudokuValid(editSudokuGrid))				
			}

			let oldCells = document.querySelectorAll('.bg-blue-200')
			let cells = document.querySelectorAll('.cell')
			
			oldCells.forEach((cell)=>cell.classList.remove('bg-blue-200'))
						cells.forEach((cell)=>{
					if (cell !== el && cell.innerHTML == el.innerHTML && !cell.classList.contains('bg-blue-200')) {
						cell.classList.add('bg-blue-200')
					}
				})
			
		} 
	}
</script>

<svelte:head>
	<title>Sudoku - world5am</title>
</svelte:head>

<section class="flex sm:justify-center items-center h-screen bg-black">
	<Board on:select={handleSelectedCell} />
	<Keypad
		on:delete={handleDeleteEvent}
		on:keypress-numeric={handleKeypadNumPress}
	/>
</section>







