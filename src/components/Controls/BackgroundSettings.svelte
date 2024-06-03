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
      <!-- TODO: make this checkbox conditionally render the below background color section -->
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Transparent</span>
          <input type="checkbox" checked="checked" class="checkbox checkbox-info" />
        </label>
      </div>
      <label for="background-color-control" class="label">
        <span class="label-text">Background Colour</span>
      </label>
      <input id="background-color-control" type="color" class="input input-bordered" bind:value={$styles.backgroundColor} on:input={(e) => updateStyle('backgroundColor', e.target.value)} />
    </div>
  </div>
</div>