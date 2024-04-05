<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import ThemeToggle from './ThemeToggle.svelte';
	import * as Card from '$lib/components/ui/card/';
	import { CopyIcon } from '$lib/components/icons';
	import { Label } from '@/components/ui/label';
	import { Checkbox } from '@/components/ui/checkbox';
	import OptionCheckbox from './OptionCheckbox.svelte';
	import { Slider } from '@/components/ui/slider';
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { Strength, StrengthUtil } from '@/strength';
	import StrengthIndicator from './StrengthIndicator.svelte';

	const MIN_PASSWORD_LEN = 6;
	const MAX_PASSWORD_LEN = 128;

	let passwordLengthRange = [8];
	let includeUppercase = true;
	let includeLowercase = true;
	let includeNumbers = true;
	let includeSymbols = false;
	let generatedPassword = generatePassword();

	$: passwordLengthRange, includeUppercase, includeLowercase, includeNumbers, includeSymbols, generateNewPassword();

	function generatePassword() {
		const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
		const numbers = '0123456789';
		const symbols = '!@#$%^&*()_+';

		let characters = '';
		if (includeUppercase) characters += uppercaseLetters;
		if (includeLowercase) characters += lowercaseLetters;
		if (includeNumbers) characters += numbers;
		if (includeSymbols) characters += symbols;

		let passwordLength = passwordLengthRange[random(0, passwordLengthRange.length - 1)];
		console.log('Generating password with length:', passwordLength);
		let password = '';
		for (let i = 0; i < passwordLength; i++) {
			const randomIndex = random(0, characters.length - 1);
			password += characters[randomIndex];
		}
		return password;
	}

	function generateNewPassword() {
		generatedPassword = generatePassword();
	}

	function random(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	let strength: Strength;

	$: {
		strength = StrengthUtil.fromPassword(generatedPassword);
	}

</script>

<div class="flex flex-col h-screen">
	<nav class="flex justify-end p-4">
		<ThemeToggle />
	</nav>

	<main class="w-full flex flex-1 h-full justify-center items-center">
		<div class="w-full p-4 flex flex-col items-center space-y-4 max-w-screen-md">
			<h1 class="text-[#817D92]">Password Generator</h1>
			<Card.Root class="w-full">
				<Card.Header class="py-4 flex flex-row items-center justify-between">
					<Tooltip.Root>
						<Tooltip.Trigger class="flex-1 truncate">
							<p class="text-2xl text-start truncate">{generatedPassword}</p>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>{generatedPassword}</p>
						</Tooltip.Content>
					</Tooltip.Root>

					<Button class="group" variant="ghost">
						<CopyIcon class="transition-colors group-hover:text-primary" />
					</Button>
				</Card.Header>
			</Card.Root>

			<Card.Root class="w-full">
				<Card.Header class="py-4 space-y-4">
					<div class="flex flex-row items-center justify-between">
						<p class="text-lg">Character Length</p>
						<p class="text-2xl text-primary">{passwordLengthRange}</p>
					</div>
					<Slider bind:value={passwordLengthRange} max={MAX_PASSWORD_LEN} min={MIN_PASSWORD_LEN} />
				</Card.Header>
				<Card.Content class="space-y-4">
					<OptionCheckbox bind:checked={includeUppercase} id="uppercase_letters" title="Include Uppercase Letters" />
					<OptionCheckbox bind:checked={includeLowercase} id="lowercase_letters" title="Include Lowercase Letters" />
					<OptionCheckbox bind:checked={includeNumbers} id="numbers" title="Include Numbers" />
					<OptionCheckbox bind:checked={includeSymbols} id="symbols" title="Include Symbols" />
				</Card.Content>
				<Card.Footer class="flex flex-col space-y-4">
					<div class="p-4 bg-background flex justify-between w-full">
						<p class="text-muted text-sm">
							STRENGTH
						</p>
						<div class="flex space-x-3 items-center">
							<p class="">
								{strength}
							</p>
							<StrengthIndicator strength={strength}/>
						</div>
					</div>
					<Button variant="outline" class="w-full rounded-none py-7 border-primary bg-card text-card-foreground hover:bg-primary hover:text-primary-foreground" disabled={
				!includeUppercase &&
				!includeLowercase &&
				!includeNumbers &&
				!includeSymbols
			} on:click={generateNewPassword}>GENERATE
					</Button>
				</Card.Footer>
			</Card.Root>
		</div>
	</main>

</div>
