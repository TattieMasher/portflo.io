<script>
    import { onMount } from 'svelte';
    import { exportPortfolio } from '../stores/projects.js';
    import { writable } from 'svelte/store';
  
    let portfolioData = writable('{}');
  
    async function fetchPortfolioData() {
      const data = await exportPortfolio();
      portfolioData.set(data);
    }
  
    onMount(fetchPortfolioData);
  
    const copyToClipboard = async () => {
      await navigator.clipboard.writeText($portfolioData);
      alert('Portfolio JSON copied to clipboard!');
    };
  </script>
  
  <div class="debug-output bg-gray-900 text-white p-4">
    <div class="flex justify-between">
      <h2 class="text-lg font-bold">Portfolio JSON Structure</h2>
      <button class="btn btn-primary" on:click={copyToClipboard}>Copy JSON</button>
    </div>
    <pre class="whitespace-pre-wrap overflow-auto text-sm">{$portfolioData}</pre> <!-- TODO: Should be reactive, but isn't? Maybe not running when it should -->
    <button class="btn btn-secondary" on:click={fetchPortfolioData}>
      Refresh JSON
    </button>
  </div>
  
  <style>
    .debug-output {
      min-height: 400px;
      max-height: 90vh;
      overflow-y: auto;
      border: 1px solid #ccc;
      padding: 10px;
      font-family: monospace;
    }
  </style>
  