<script lang="ts">
import { Label } from '@/components/ui/label/index.js';
import { Checkbox } from '@/components/ui/checkbox/index.js';

export let id: string;
export let title: string;
export let checked: boolean;
</script>

<div class="items-center flex space-x-4">
	<Checkbox bind:checked class="rounded-none" id={id} />
	<Label
		for={id}
		class="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
	>
		{title}
	</Label>
</div>
