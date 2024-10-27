<script>
  import { badgeClass } from '../../stores/badgeClass.js';

  const presetThemes = [
    { name: 'Primary', class: 'badge-primary' },
    { name: 'Secondary', class: 'badge-secondary' },
    { name: 'Accent', class: 'badge-accent' },
    { name: 'Success', class: 'badge-success' },
    { name: 'Warning', class: 'badge-warning' },
    { name: 'Error', class: 'badge-error' },
    { name: 'Info', class: 'badge-info' },
  ];

  const updateBadgeClass = (newClass) => {
    badgeClass.set(newClass);
  };
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="badge-settings" />
  <label for="badge-settings" class="collapse-title text-xl font-medium">
    Badge Settings
  </label>
  <div class="collapse-content">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Badge Theme</span>
      </label>
      <div class="flex flex-wrap gap-2">
        {#each presetThemes as theme}
          <button
            class="btn btn-sm {theme.class}"
            on:click={() => updateBadgeClass(theme.class)}
          >
            {theme.name}
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
