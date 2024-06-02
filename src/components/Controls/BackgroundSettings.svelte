<script>
  export let styles;
  export let updateStyle;
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="background-settings" /> 
  <label for="background-settings" class="collapse-title text-xl font-medium">
    Background Settings
  </label>
  <div class="collapse-content"> 
    <div class="form-control">
      <label for="background-color-control" class="label">
        <span class="label-text">Background Color</span>
      </label>
      <input id="background-color-control" type="color" class="input input-bordered" bind:value={$styles.backgroundColor} on:input={(e) => updateStyle('backgroundColor', e.target.value)} />
    </div>
  </div>
</div>

<style>
  .collapse input[type="checkbox"] {
    display: none;
  }
  .collapse input[type="checkbox"]:checked + .collapse-title + .collapse-content {
    display: block;
  }
  .collapse-content {
    display: none;
  }
</style>