<script>
    export let label = '';
    export let checked = false;
    export let onChange = () => {};
</script>

<div class="form-control">
    <label class="cursor-pointer label">
        <span class="label-text">{label}</span>
        <input
        type="checkbox"
        class="checkbox checkbox-info"
        bind:checked
        on:change={() => onChange(checked)}
        />
    </label>
</div>
