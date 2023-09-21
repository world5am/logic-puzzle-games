<script>
	import { sudokuGrid, displayValues} from '$lib'
	import { createEventDispatcher, onMount } from 'svelte'

	const dispatch = createEventDispatcher()

	let lockedCellSet = new Set() // set of uneditable clue cells given at the start

	let /**@type {Element|null}*/ previousCell

	// ===== FUNCTIONALITY STARTS HERE =========

	onMount(() => {
		let cells = document.querySelectorAll('.cell')
		// console.log(cells.length)
		cells.forEach((cell) => {
			if (cell instanceof HTMLElement && cell.innerHTML !== '') {
				lockedCellSet.add(cell)
				if (cell.dataset.row == '2' || cell.dataset.row == '5') {
					cell.classList.add('bg-slate-200/40', 'border-b-2', 'border-b-red-500')
				} else {
					cell.classList.add('bg-slate-200/40', 'border-b', 'border-b-slate-300')
				}
			}
		})

		// console.log(lockedCellSet.size, 81 - lockedCellSet.size)
	})

	/** @param {MouseEvent} ev */
	function handleCellClick(ev) {
		previousCell = document.querySelector('.bg-blue-100')

		if (previousCell !== null) {
			previousCell.classList.remove('bg-blue-100', 'text-blue-900')
			lockedCellSet.has(previousCell)
				? previousCell.classList.add('bg-slate-200/40')
				: undefined
		}

		highlightSelectedCell(ev)
	}
	/** @param {Event} ev*/
	function highlightSelectedCell(ev) {
		if (ev.target instanceof HTMLElement) {
			const trg = ev.target
			trg.classList.remove('bg-slate-200/40')
			trg.classList.add('bg-blue-100', 'text-blue-900')

			if (trg.dataset.row == '2' || trg.dataset.row == '5')
				trg.classList.add('border-b-2', 'border-b-red-500')
			else trg.classList.add('border-b', 'border-b-slate-300')

			dispatch('select', {
				element: trg,
				isEditable: !lockedCellSet.has(trg)
			})
		}
		
		findSameValues(ev)
	}
	
	/** @param {Event} ev */
	function findSameValues(ev) {
	let cells = document.querySelectorAll('.cell')
	cells.forEach((cell)=>{
		if (cell instanceof HTMLElement && ev.target instanceof HTMLElement && cell.innerHTML !== '') {
			cell.classList.remove('bg-blue-200')
			if (ev.target.innerHTML == cell.innerHTML && ev.target !== cell) {
				cell.classList.add('bg-blue-200')
			}
		}
	})
}
	
</script>

<div class="board">
	{#each sudokuGrid as rows, i}
		<div class="row">
			{#each rows as cell, j}
				<div
					data-row={i}
					data-col={j}
					on:click={handleCellClick}
					on:keydown={() => {}}
					role="cell"
					tabindex="0"
					class="cell"
				>
					{displayValues[cell]}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="postcss">
	.board {
		@apply grid grid-rows-sudoku bg-white;
		width: calc(var(--cell-width) * 9); /* @apply w-[calc(var(--cell-width) * 9)] */
	}
	.row {
		@apply h-[--cell-height] grid grid-cols-sudoku border-b border-b-slate-300 last:border-b-0;
	}
	.cell {
		@apply h-[--cell-height] flex justify-center items-center font-sourcepro text-custom select-none cursor-pointer border-r border-r-slate-300 last:border-r-0;
	}

	.cell:nth-child(3n):not(:nth-child(9n)) {
		/** 
		 * Selects multiples of 3. Excludes multiples of 9.
         * Here, we select the 3rd and 6th cell and ignore the 9th.
         */
		@apply border-r-2 border-r-red-500;
	}

	.row:nth-child(3n):not(:nth-child(9n)) {
		@apply border-b-2 border-b-red-500;
	}
</style>
