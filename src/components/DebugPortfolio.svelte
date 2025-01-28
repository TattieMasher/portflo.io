<script>
    import { onMount } from 'svelte';
    import { exportPortfolio } from '../stores/projects.js';
  
    let portfolioData = '{}'; // Default empty JSON
  
    onMount(() => {
      portfolioData = exportPortfolio(); // Use the updated function
    });
  
    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(portfolioData);
      alert('Portfolio JSON copied to clipboard!');
    };
  </script>
  
  <div class="debug-output bg-gray-900 text-white p-4">
    <div class="flex justify-between">
      <h2 class="text-lg font-bold">Portfolio JSON Structure</h2>
      <button class="btn btn-primary" on:click={copyToClipboard}>Copy JSON</button>
    </div>
    <pre class="whitespace-pre-wrap overflow-auto text-sm">{{ portfolioData }}</pre>
  </div>
  
  <style>
    .debug-output {
      max-height: 400px;
      overflow-y: auto;
      border: 1px solid #ccc;
      padding: 10px;
      font-family: monospace;
    }
  </style>