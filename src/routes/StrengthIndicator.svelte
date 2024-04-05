<script lang="ts">
	import { Strength } from '@/strength';

	export let strength: Strength;

	const TOTAL_BARS = 4;
	let color: string;
	let coloredBars: number;

	$: {
		switch (strength) {
			case Strength.TOO_WEAK:
				color = 'bg-[#F64A4A]';
				coloredBars = 1;
				break;
			case Strength.Weak:
				color = 'bg-[#FB7C58]';
				coloredBars = 2;
				break;
			case Strength.Medium:
				color = 'bg-[#F8CD65]';
				coloredBars = 3;
				break;
			case Strength.Strong:
				color = 'bg-primary';
				coloredBars = 4;
				break;
		}
	}
</script>

<div class="flex space-x-1">
	{#each Array.from({ length: TOTAL_BARS }) as _, i}
		<div class={`w-2 h-5 ${i < coloredBars ? color : 'border border-foreground'}`}></div>
	{/each}
</div>
