<script>
  import { mode } from '../../stores/mode.js';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { elementStyles } from '../../stores/elementStyles.js';
  import { getStyleString } from '../../utils/styleUtils.js';
  import { updateComponent } from '../../utils/updateComponent.js'; // Import centralized function

  export let component;
  export let componentIndex;
  export let projectIndex;
  export let containerIndex;

  const componentId = `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`;

  const selectElement = () => {
    selectedElement.set(componentId);
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      updateComponent(projectIndex, containerIndex, componentIndex, { videoUrl: videoURL, videoType: 'file' });
    }
  };

  const handleVideoURLChange = (event) => {
    updateComponent(projectIndex, containerIndex, componentIndex, { videoUrl: event.target.value, videoType: 'url' });
  };

  // Get styles for container and video
  $: containerStyles =
    $elementStyles[componentId] && !$elementStyles[componentId]['video']
      ? $elementStyles[componentId]
      : {};

  $: videoStyles =
    ($elementStyles[componentId] && $elementStyles[componentId]['video']) || {};
</script>

<div
  id={componentId}
  on:click={(e) => {
    if ($mode === 'edit') {
      e.stopPropagation();
      selectElement();
    }
  }}
  class:selected={$mode === 'edit' && $selectedElement === componentId}
  style={getStyleString(containerStyles)}
>
  {#if $mode === 'edit'}
    <!-- Video Upload or URL Input -->
    <div class="form-control w-full max-w-xs mt-2">
      <label class="label">
        <span class="label-text">Upload Video</span>
        <span class="label-text-alt">Max size 10MB</span>
      </label>
      <input
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
        accept="video/*"
        on:change={handleVideoUpload}
      />

      <label class="label mt-4">
        <span class="label-text">Or Enter Video URL (YouTube, Vimeo, etc.)</span>
      </label>
      <input
        type="text"
        class="input input-bordered w-full max-w-xs"
        value={component.videoUrl || ''}
        on:input={handleVideoURLChange}
        placeholder="https://www.youtube.com/watch?v=..."
      />

      {#if component.videoUrl}
        <div class="mt-4">
          {#if component.videoType === 'file'}
            <video
              controls
              src={component.videoUrl}
              style={getStyleString(videoStyles)}
            ></video>
          {:else}
            <iframe
              src={component.videoUrl}
              frameborder="0"
              allowfullscreen
              style={getStyleString(videoStyles)}
            ></iframe>
          {/if}
        </div>
      {/if}
    </div>
  {:else}
    <!-- Display the video -->
    {#if component.videoUrl}
      <div>
        {#if component.videoType === 'file'}
          <video
            controls
            src={component.videoUrl}
            style={getStyleString(videoStyles)}
          ></video>
        {:else}
          <iframe
            src={component.videoUrl}
            frameborder="0"
            allowfullscreen
            style={getStyleString(videoStyles)}
          ></iframe>
        {/if}
      </div>
    {/if}
  {/if}
</div>

<style>
  .selected {
    outline: 2px solid blue !important;
  }
  video,
  iframe {
    width: 100%;
    height: auto;
  }
</style>