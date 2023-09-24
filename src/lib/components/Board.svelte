<script>
	import { sudokuGrid, displayValues } from '$lib'
	import { createEventDispatcher, onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	const dispatch = createEventDispatcher()

	let /**@type {Element|null}*/ previousCell

	export let lockedCellSet = new Set() // set of uneditable clue cells given at the start

	export let /**@type {boolean}*/ isBoardValid

	// ===== FUNCTIONALITY STARTS HERE =========

	onMount(() => {
		let cells = document.querySelectorAll('.cell')
		cells.forEach((cell) => {
			if (cell instanceof HTMLElement && cell.innerHTML !== '') {
				lockedCellSet.add(cell)

				cell.dataset.row == '2' || cell.dataset.row == '5'
					? cell.classList.add('bg-slate-200/40', 'border-b-2', 'border-b-red-500')
					: cell.classList.add('bg-slate-200/40', 'border-b', 'border-b-slate-300')
			} else {
				cell.classList.add('text-blue-600')
			}
		})
	})

	/** @param {MouseEvent} ev */
	function handleCellClick(ev) {
		previousCell = document.querySelector('.bg-blue-100')

		/** 
		 * Resets background and text-color of locked cells,
		 * highlighted previously. 
		 */
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

			/* BG Color and Text Color handling */
			trg.classList.remove('bg-slate-200/40')
			trg.classList.add('bg-blue-100', 'text-blue-900')

			/* Border Bottom handling */
			if (trg.dataset.row == '2' || trg.dataset.row == '5')
				trg.classList.add('border-b-2', 'border-b-red-500')
			else trg.classList.add('border-b', 'border-b-slate-300')

			dispatch('select', {
				element: trg,
				isEditable: !lockedCellSet.has(trg)
			})

			findSameValues(ev.target, lockedCellSet)
		}
	}

	/**
	 * @param {HTMLElement} elmt
	 * @param {Set<any>} lockedCellSet
	 */
	export function findSameValues(elmt, lockedCellSet) {
		let cells = document.querySelectorAll('.cell')
		cells.forEach((cell) => {
			if (
				cell instanceof HTMLElement &&
				elmt instanceof HTMLElement &&
				cell.innerHTML !== ''
			) {
				lockedCellSet.has(cell)
					? cell.classList.replace('bg-blue-200', 'bg-slate-200/40')
					: cell.classList.remove('bg-blue-200')

				if (
					elmt.innerHTML == cell.innerHTML &&
					elmt !== cell &&
					lockedCellSet.has(cell)
				) {
					cell.classList.replace('bg-slate-200/40', 'bg-blue-200')
				} else if (
					elmt.innerHTML == cell.innerHTML &&
					elmt !== cell &&
					!lockedCellSet.has(cell)
				)
					cell.classList.add('bg-blue-200')
			}
		})
	}
</script>

<div class="board" class:incorrect={!isBoardValid}>
	{#each sudokuGrid as rows, i}
		<div class="row">
			{#each rows as cell, j}
				<div
					data-row={i}
					data-col={j}
					on:click={handleCellClick}
					on:contextmenu|preventDefault
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
	
	.incorrect {
		@apply border-8 border-red-500 box-content
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
