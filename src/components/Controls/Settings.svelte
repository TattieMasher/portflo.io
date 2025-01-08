<script>
  import LayoutSettings from './LayoutSettings.svelte';
  import TextSettings from './TextSettings.svelte';
  import BackgroundSettings from './BackgroundSettings.svelte';
  import BadgeSettings from './BadgeSettings.svelte';
  import ImageSettings from './ImageSettings.svelte';
  import CarouselSettings from './CarouselSettings.svelte';
  import TypographySettings from './TypographySettings.svelte';
  import BorderSettings from './BorderSettings.svelte';
  import RangeSetting from './Modules/RangeSetting.svelte';

  export let selectedComponentType;
  export let settingsConfig = {}; // Config object for dynamic props (to add/remove settings modules from each section)

  const settingsMap = {
    text: [TypographySettings, TextSettings, BackgroundSettings, BorderSettings],
    image: [ImageSettings, BackgroundSettings, BorderSettings],
    carousel: [CarouselSettings, BackgroundSettings, BorderSettings],
    video: [BackgroundSettings, BorderSettings],
    container: [TextSettings, LayoutSettings, BackgroundSettings, BorderSettings],
    project: [TypographySettings, TextSettings, BackgroundSettings, BorderSettings, BadgeSettings],
    user: [BadgeSettings, TypographySettings],
  };

  $: modulesToRender = settingsMap[selectedComponentType] || [];
  $: {
    console.log('selectedComponentType:', selectedComponentType, 'modulesToRender:', modulesToRender);
    console.log(selectedComponentType);
  }
</script>

<div class="settings-container">
  {#if modulesToRender.length > 0}
    {#each modulesToRender as Module}
      <!-- Pass dynamic props based on settingsConfig -->
      <Module {...(settingsConfig[Module.name] || {})} />
    {/each}
  {:else}
    <p>No settings available for this element.</p>
  {/if}
</div>

<style>
  .settings-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
