<script>
    export let label = '';
    export let min = 0;
    export let max = 100;
    export let step = 1;
    export let value;
    export let unit = '';
    export let onChange = () => {};
  </script>
  
  <div class="form-control">
    <label class="label">
      <span class="label-text">{label}: {value}{unit}</span>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      bind:value
      class="range range-primary"
      on:input={() => onChange(value)}
    />
  </div>
  