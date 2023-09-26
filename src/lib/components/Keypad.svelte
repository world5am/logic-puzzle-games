<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	function select(/**@type{number}*/ num) {
		dispatch('number', { num: num })
	}
	const del = () => {
		dispatch('delete')
	}
</script>

<div class="keypad">
	<button on:click={() => select(1)}>1</button>
	<button on:click={() => select(2)}>2</button>
	<button on:click={() => select(3)}>3</button>
	<button on:click={() => select(4)}>4</button>
	<button on:click={() => select(5)}>5</button>
	<button on:click={() => select(6)}>6</button>
	<button on:click={() => select(7)}>7</button>
	<button on:click={() => select(8)}>8</button>
	<button on:click={() => select(9)}>9</button>

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
		@apply grid grid-rows-numpad grid-cols-numpad gap-2 lg:gap-4 xl:gap-2
	}

	button {
		@apply flex items-center justify-center bg-sky-500 text-sky-100 font-sourcepro font-bold text-2xl lg:text-5xl xl:text-4xl rounded-sm hover:bg-sky-400 hover:text-sky-50 transition duration-150 ease-in;
	}

	button.copy {
		@apply bg-blue-500 text-blue-50 lg:text-4xl xl:text-2xl  disabled:bg-slate-300 disabled:text-slate-50 hover:bg-blue-600 hover:text-blue-100 overflow-hidden
	}

	button.delete {
		@apply bg-red-500 lg:text-4xl text-red-50 xl:text-2xl hover:bg-red-600;
	}
</style>
