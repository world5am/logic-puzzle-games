// place files you want to import through the `$lib` alias in this folder.

/**
 * Example sudoku puzzle
 * @type {number[][]}
 */
export let sudokuGrid = [
	[5, 3, 0, 0, 7, 0, 0, 0, 0],
	[6, 0, 0, 1, 9, 5, 0, 0, 0],
	[0, 9, 8, 0, 0, 0, 0, 6, 0],
	[8, 0, 0, 0, 6, 0, 0, 0, 3],
	[4, 0, 0, 8, 0, 3, 0, 0, 1],
	[7, 0, 0, 0, 2, 0, 0, 0, 6],
	[0, 6, 0, 0, 0, 0, 2, 8, 0],
	[0, 0, 0, 4, 1, 9, 0, 0, 5],
	[0, 0, 0, 0, 8, 0, 0, 7, 9]
]

export let displayValues = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * Checks the selected row, column and 3x3 block for duplicates.
 * @param {any[][]} editedGrid
 * @returns {{row: number, col: number, isValid: boolean}}}
 */
export function checkSudoku(editedGrid) {
	// Check rows
	for (let row = 0; row < 9; row++) {
		let rowSet = new Set()
		for (let col = 0; col < 9; col++) {
			const cellValue = editedGrid[row][col]
			if (cellValue === 0) continue // Skip empty cells
			if (rowSet.has(cellValue)) {
				return {
					row: row,
					col: col,
					isValid: false
				}
			}
			rowSet.add(cellValue)
		}
	}

	// Check columns
	for (let col = 0; col < 9; col++) {
		let colSet = new Set()
		for (let row = 0; row < 9; row++) {
			const cellValue = editedGrid[row][col]
			if (cellValue === 0) continue // Skip empty cells
			if (colSet.has(cellValue)) {
				return {
					row: row,
					col: col,
					isValid: false
				}
			}
			colSet.add(cellValue)
		}
	}

	// Check 3x3 block
	for (let blockRow = 0; blockRow < 3; blockRow++) {
		for (let blockCol = 0; blockCol < 3; blockCol++) {
			let blockSet = new Set()
			for (let row = 0; row < 3; row++) {
				for (let col = 0; col < 3; col++) {
					const cellValue = editedGrid[blockRow * 3 + row][blockCol * 3 + col]
					if (cellValue === 0) continue // Skip empty cells
					if (blockSet.has(cellValue)) {
						return {
							row: row,
							col: col,
							isValid: false
						}
					}
					blockSet.add(cellValue)
				}
			}
		}
	}

	return {
		row: -1,
		col: -1,
		isValid: true
	} // If all checks pass then sudoku is valid
}
