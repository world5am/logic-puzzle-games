<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	function select(/**@type{number}*/ num) {
		dispatch('keypress-numeric', { num: num })
	}
	const del = () => {
		dispatch('delete')
	}
</script>

<div class="keypad">
	<button on:click={()=>select(1)}>1</button>
	<button on:click={()=>select(2)}>2</button>
	<button on:click={()=>select(3)}>3</button>
	<button on:click={()=>select(4)}>4</button>
	<button on:click={()=>select(5)}>5</button>
	<button on:click={()=>select(6)}>6</button>
	<button on:click={()=>select(7)}>7</button>
	<button on:click={()=>select(8)}>8</button>
	<button on:click={()=>select(9)}>9</button>

	<button
		disabled
		class="copy">COPY</button
	>
	<button
		on:click={del}
		class="delete">DEL</button
	>
</div>

<style lang="postcss">
	.keypad {
		display: grid;
		grid-template-columns: repeat(3, 6em);
		grid-template-rows: repeat(4, 4em);
		grid-gap: 0.5em;
	}

	button {
		@apply bg-sky-500 text-sky-100 font-sourcepro font-bold text-2xl rounded-sm hover:bg-sky-400 hover:text-sky-50 transition duration-150 ease-in
	}

	button.copy {
		@apply bg-blue-500 text-blue-50 disabled:bg-slate-300 disabled:text-slate-50 hover:bg-blue-600 hover:text-blue-100
	}

	button.delete {
		@apply bg-red-500 text-red-50 hover:bg-red-600;
	}
</style>
