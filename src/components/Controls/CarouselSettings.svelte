<script>
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { updateElementStyle } from '../../utils/updateStyles.js';
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="image-settings" />
  <label for="image-settings" class="collapse-title text-xl font-medium">
    Image Settings
  </label>
  <div class="collapse-content">
    <label class="swap" id="carousel-direction">
      <input type="checkbox" />
      <div class="swap-on">Vertical flow</div>
      <div class="swap-off">Horizontal flow</div>
    </label>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Width: </span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        class="range range-primary"
      />
    </div>
    <div class="form-control mt-4">
      <label class="label">
        <span class="label-text">Height </span>
      </label>
      <input
        type="text"
        class="input input-bordered"
        placeholder="e.g., auto, 200"
      />
    </div>
    <div class="form-control mt-4">
      <label class="label">
        <span class="label-text">Border Radius: </span>
      </label>
      <input
        type="range"
        min="0"
        max="50"
        class="range range-primary"
      />
    </div>
  </div>
</div>

<style>
  #carousel-direction {
    text-align: center;
  }
</style>