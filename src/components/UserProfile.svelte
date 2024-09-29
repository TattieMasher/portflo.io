<script>
  import { selectedElement } from '../stores/selectedElement.js';
  import { elementStyles } from '../stores/elementStyles.js';
  import { mode } from '../stores/mode.js';

  export let user;

  const selectElement = () => {
    selectedElement.set('user');
  };
</script>

<svelte:head>
  <title>{user.full_name} | Portflo.io</title> 
</svelte:head> 

<div
  id="user"
  class="card"
  style={$elementStyles['user']}
  on:click={$mode === 'edit' ? selectElement : null}
  class:selected={$mode === 'edit' && $selectedElement === 'user'}
>
  <figure class="px-10 pt-10">
    <img src={user.profile_picture} alt="Profile Picture" class="rounded-full w-24 h-24" />
  </figure>
  <div class="card-body items-center text-center">
    {#if $mode === 'edit'}
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Upload profile picture</span>
          <span class="label-text-alt">Max size 1MB</span>
        </div>
        <input type="file" class="file-input file-input-bordered w-full max-w-xs" />
        <div class="label"></div>
      </label>    

      <input class="input input-bordered w-full max-w-xs" type="text" bind:value={user.full_name} />
      <textarea class="textarea textarea-bordered w-full max-w-xs mt-2" bind:value={user.bio}></textarea>
    {:else}
      <h2 class="card-title">{user.full_name}</h2>
      <p>{user.bio}</p>
    {/if}
    <div class="divider"></div> 
  </div>
</div>

<style>
  .selected {
    border: 2px solid blue;
  }
</style>
