<script setup lang="ts">
import { useData } from 'vitepress';

const { page, frontmatter } = useData();
</script>

<template>
  <div>
    <p class="text-2xl font-semibold">{{ page.title }}</p>
    <p class="text-slate-400">{{  frontmatter.date }}</p>
  </div>
</template>