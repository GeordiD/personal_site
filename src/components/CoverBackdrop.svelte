<script>
  import { onMount } from 'svelte';
  import anime from 'animejs';

  onMount(() => {
    anime({
      targets: '.backdrop-line',
      opacity: 0,
      delay: anime.stagger(100),
      translateY: 100,
      duration: 1000,
      direction: 'reverse',
      easing: 'easeInQuart',
    });
  });
</script>

<div class="absolute bottom-0 w-full flex flex-col-reverse gap-8">
  <div class="bg-theme-med w-full h-36 backdrop-line" />
  <div class="bg-theme-med w-full h-24 backdrop-line" />
  <div class="bg-theme-med w-full h-20 backdrop-line" />
  <div class="bg-theme-med w-full h-16 backdrop-line" />
  <div class="bg-theme-med w-full h-12 backdrop-line" />
  <div class="bg-theme-med w-full h-8 backdrop-line" />
  <div class="bg-theme-med w-full h-4 backdrop-line" />
  <div class="bg-theme-med w-full h-2 backdrop-line" />
  <div class="bg-theme-med w-full h-1 backdrop-line" />
</div>

<style>
  .backdrop-line {
    opacity: 1;
  }
</style>
