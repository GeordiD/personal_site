<script lang="ts">
  import TechStackLogo from './TechStackLogo.svelte';
  import { Tech } from '../../models/Tech';
  import { Tags } from '../../models/Tags';

  const techs: Tech[] = [
    {
      name: 'Vue',
      logo: 'vuejs-original',
      tags: [Tags.Favorite, Tags.FrontEnd],
    },
    {
      name: 'Node',
      logo: 'nodejs-plain-wordmark',
      tags: [Tags.BackEnd],
    },
    {
      name: 'Svelte',
      logo: 'svelte-wordmark',
      tags: [Tags.FrontEnd],
    },
    {
      name: 'Mongo',
      logo: 'mongodb-plain-wordmark',
      tags: [Tags.BackEnd],
    },
    {
      name: 'TypeScript',
      logo: 'typescript-plain',
      tags: [Tags.Favorite, Tags.FrontEnd, Tags.BackEnd],
    },
    {
      name: 'Dot Net',
      logo: 'dotnetcore-plain',
      tags: [Tags.BackEnd],
    },
    {
      name: 'Docker',
      logo: 'docker',
      tags: [],
    },
    {
      name: 'SQL',
      logo: 'microsoftsqlserver-plain-wordmark',
      tags: [Tags.BackEnd],
    },
  ];

  function handleFilterClick() {
    console.log('hi');
  }
</script>

<div
  class="flex flex-col w-full h-full gap-4 p-4 rounded-md bg-theme-light text-theme-dark"
>
  <div class="flex justify-between">
    <p class="text-2xl font-bold uppercase">Tech Stack</p>
    <div class="flex gap-2">
      <div class="filter-option" on:click={() => handleFilterClick()}>All</div>
      <!-- <div
        class="filter-option"
        on:click={() => handleFilterClick(Tags.Favorite)}
      >
        Favorites
      </div>
      <div
        class="filter-option"
        on:click={() => handleFilterClick(Tags.FrontEnd)}
      >
        Front End
      </div>
      <div
        class="filter-option"
        on:click={() => handleFilterClick(Tags.BackEnd)}
      >
        Back End
      </div> -->
    </div>
  </div>

  <div class="flex flex-wrap flex-grow w-full gap-6 pt-2">
    {#each techs as tech}
      <TechStackLogo {tech} />
    {/each}
  </div>
</div>

<style>
  .filter-option {
    @apply rounded-full border-2 border-theme-dark text-theme-dark py-1 text-xs px-2 flex justify-center items-center cursor-pointer;
  }
</style>
