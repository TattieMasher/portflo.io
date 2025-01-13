<script>
    export let label = '';
    export let options = [];
    export let value = '';
    export let onChange = () => {};
</script>

<div class="form-control">
    <label class="label">
        <span class="label-text">{label}</span>
    </label>
    <select bind:value class="select select-bordered" on:change={() => onChange(value)}>
        {#each options as option}
        <option value={option.value}>{option.label}</option>
        {/each}
    </select>
</div>
