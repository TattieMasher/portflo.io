<script>
  import { mode } from '../../stores/mode.js';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { elementStyles } from '../../stores/elementStyles.js';
  import { getStyleString } from '../../utils/styleUtils.js';
  import { updateComponent } from '../../utils/updateComponent.js';

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
    const url = event.target.value.trim();
    const embedUrl = getEmbedUrl(url);
    if (embedUrl) {
      updateComponent(projectIndex, containerIndex, componentIndex, { videoUrl: embedUrl, videoType: 'url' });
    }
  };

  const getEmbedUrl = (url) => {
    // Handle YouTube URLs
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    return null;
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
        <span class="label-text">Or Enter YouTube Video URL</span>
      </label>
      <input
        type="text"
        class="input input-bordered w-full max-w-xs"
        value={component.videoUrl || ''}
        on:input={handleVideoURLChange}
        placeholder="https://www.youtube.com/watch?v=..."
      />

      {#if component.videoUrl}
        <div class="mt-4 video-wrapper">
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
              class="responsive-video"
            ></iframe>
          {/if}
        </div>
      {/if}
    </div>
  {:else}
    <!-- Display the video -->
    {#if component.videoUrl}
      <div class="video-wrapper">
        {#if component.videoType === 'file'}
          <video
            controls
            src={component.videoUrl}
            class="responsive-video"
          ></video>
        {:else}
          <iframe
            src={component.videoUrl}
            frameborder="0"
            allowfullscreen
            class="responsive-video"
          ></iframe>
        {/if}
      </div>
    {/if}
  {/if}
</div>

<style>
  .video-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  .responsive-video {
    width: 100%;
    max-width: 100vh; /* Restrict max width */
    max-height: 60vh; /* Prevent overflow */
  }

  video {
    object-fit: contain; /* Ensure it fits within the bounds */
  }
</style>