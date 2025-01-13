<script>
    export let label = '';
    export let value = '#ffffff';
    export let onChange = () => {};
</script>

<div class="form-control">
<label class="label">
    <span class="label-text">{label}</span>
</label>
<input
    type="color"
    bind:value
    class="input input-bordered w-full max-w-xs"
    on:input={() => onChange(value)}
/>
</div>
  