<script>
  import { googleFonts } from '../../../utils/googleFonts.js';

  export let selectedFont = 'Arial';
  export let onChange = () => {};

  const handleFontChange = (font) => {
    selectedFont = font;
    onChange(font);
  };
</script>

<div class="dropdown" id="font-dropdown">
  <div tabindex="0" class="btn m-1">{selectedFont}</div>
  <ul
    tabindex="0"
    class="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow absolute right-0"
  >
    {#each googleFonts as font}
      <li>
        <a
          style="font-family: {font.name};"
          on:click={() => handleFontChange(font.name)}
        >
          {font.name}
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .dropdown {
    z-index: 100000;
  }
</style>