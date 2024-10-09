<script>
  import { selectedElement } from '../stores/selectedElement.js';
  import { elementStyles } from '../stores/elementStyles.js';
  import { selectedElementStyles } from '../stores/selectedElementStyles.js';
  import { mode } from '../stores/mode.js';
  import Icon from '@iconify/svelte';

  export let user;

  const selectElement = () => {
    selectedElement.set('user');
    console.log('User Profile selected, selectedElement set to:', 'user');
  };

  // Mapping JS styles to CSS properties
  const cssPropertyMap = {
    backgroundColor: 'background-color',
    fontSize: 'font-size',
    textAlign: 'text-align',
    color: 'color',
  };

  // Default styles
  const defaultStyles = {
    backgroundColor: 'transparent',
    fontSize: '16px',
    textAlign: 'left',
    color: '#ffffff',
  };

  // Function to generate style string from styles object
  const getStyleString = (styles) => {
    const combinedStyles = { ...defaultStyles, ...styles };
    return Object.entries(combinedStyles)
      .map(([key, value]) => `${cssPropertyMap[key] || key}: ${value};`)
      .join(' ');
  };

  // For adding new skills
  let newSkill = '';
  const addSkill = () => {
    if (newSkill.trim() !== '') {
      user.skills = [...user.skills, newSkill.trim()];
      newSkill = '';
    }
  };

  const removeSkill = (index) => {
    user.skills = user.skills.filter((_, i) => i !== index);
  };

  // **Reactive variable for badgeClass**
  $: badgeClass = $elementStyles['user']?.badgeClass || 'badge-primary';
</script>

<svelte:head>
  <title>{user.full_name} | Portflo.io</title>
</svelte:head>

<div
  id="user"
  class="card"
  style={getStyleString($selectedElement === 'user' ? $selectedElementStyles : $elementStyles['user'])}
  on:click={$mode === 'edit' ? selectElement : null}
  class:selected={$mode === 'edit' && $selectedElement === 'user'}
>
  <figure class="px-10 pt-10">
    <img src={user.profile_picture} alt="Profile Picture" class="rounded-full w-24 h-24" />
  </figure>
  <div class="card-body items-center text-center">
    {#if $mode === 'edit'}
      <!-- Existing inputs for profile picture, name, and bio -->
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

      <!-- Skills editing -->
      <div class="mt-4 w-full max-w-xs">
        <label class="label">
          <span class="label-text">Skills</span>
        </label>
        <div class="flex flex-wrap gap-2">
          {#each user.skills as skill, index}
            <div class="badge badge-primary flex items-center">
              {skill}
              <button class="ml-1" on:click={() => removeSkill(index)}>
                <Icon icon="mdi:close" class="inline-block w-4 h-4" />
              </button>
            </div>
          {/each}
        </div>
        <div class="mt-2 flex">
          <input
            class="input input-bordered w-full"
            type="text"
            placeholder="Add a skill"
            bind:value={newSkill}
            on:keydown={(e) => e.key === 'Enter' && addSkill()}
          />
          <button class="btn btn-primary ml-2" on:click={addSkill}>Add</button>
        </div>
      </div>
    {:else}
      <!-- Display fields for user -->
      <h2 class="card-title" style={getStyleString($selectedElementStyles)}>
        {user.full_name}
      </h2>
      <p style={getStyleString($selectedElementStyles)}>{user.bio}</p>

      <!-- Display skills -->
      {#if user.skills && user.skills.length > 0}
        <div class="mt-4 flex flex-wrap gap-2 justify-center">
          {#each user.skills as skill}
            <div class="badge {badgeClass}">
              {skill}
            </div>
          {/each}
        </div>
      {/if}
    {/if}
    <div class="divider"></div>
  </div>
</div>

<style>
  .selected {
    border: 2px solid blue;
  }
</style>
