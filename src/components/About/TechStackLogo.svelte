<script lang="ts">
  import Icon from '../Icon.svelte';
  import { Tech } from '../../models/Tech';
  import { parse } from 'node-html-parser';

  export let tech: Tech;
</script>

<div class="flex flex-col items-center gap-2">
  <Icon icon={tech.logo} class="lang-logo" />
  <p class="text-sm font-semibold">{tech.name}</p>
</div>

<style>
  div :global(.lang-logo) {
    @apply w-8 h-8 fill-theme-dark;
    --alt-color: #ad7461;
  }
</style>
