<script>
    import Icon from '@iconify/svelte';
    export let label = '';
    export let options = [];
    export let value = '';
    export let onChange = () => {};
    let isOpen = false;
  
    const handleSelect = (selectedValue) => {
      value = selectedValue;
      onChange(selectedValue);
      isOpen = false;
    };
  </script>
  
  <div class="form-control">
    <label class="label">
      <span class="label-text">{label}</span>
    </label>
  
    <!-- Custom Dropdown -->
    <div class="dropdown select-bordered">
      <!-- Trigger without animation -->
      <div class="dropdown-trigger" on:click={() => (isOpen = !isOpen)}>
        <div class="btn btn-bordered flex items-center no-animation">
          {#if value}
            <span>{options.find((option) => option.value === value)?.label}</span>
          {:else}
            Select an option
          {/if}
          <Icon icon="radix-icons:chevron-down" class="ml-auto text-xl" />
        </div>
      </div>
  
      <!-- Dropdown Menu with Icons -->
      {#if isOpen}
        <div class="dropdown-menu bg-base-100 rounded-box shadow-md mt-2">
          {#each options as option}
            <div
              class="dropdown-item flex items-center gap-2 p-2 hover:bg-base-200 cursor-pointer"
              on:click={() => handleSelect(option.value)}
            >
              {#if option.icon}
                <Icon icon={option.icon} class="text-xl" />
              {/if}
              <span>{option.label}</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  
  <style>
    .dropdown {
      position: relative;
    }
  
    .dropdown-menu {
      position: absolute;
      z-index: 1000;
      width: 100%;
      max-height: 200px;
      overflow-y: auto;
    }
  
    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  
    .btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
  
    .btn-bordered {
      border: 1px solid var(--color-gray-300);
      padding: 0.5rem;
      border-radius: 4px;
    }
  
    /* Remove shrinking animation on click */
    .btn.no-animation:focus,
    .btn.no-animation:active {
      transform: none !important;
      box-shadow: none !important;
    }
  </style>
  