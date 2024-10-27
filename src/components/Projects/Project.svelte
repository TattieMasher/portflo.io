<script>
  import Container from './Container.svelte';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { elementStyles } from '../../stores/elementStyles.js';
  import { mode } from '../../stores/mode.js';
  import { getStyleString } from '../../utils/styleUtils.js';
  import { projects } from '../../stores/projects.js';
  import { user } from '../../stores/user.js';
  import { badgeClass } from '../../stores/badgeClass.js';

  export let project;
  export let projectIndex;

  const selectElement = () => {
    selectedElement.set(`project-${projectIndex}`);
  };

  // Local variables for project properties
  let projectTitle = project.title;
  let projectDescription = project.description;
  let projectURL = project.project_url;
  let projectSkills = project.skills || [];

  // Watch for changes in project properties
  $: if (projectTitle !== project.title) {
    projectTitle = project.title;
  }
  $: if (projectDescription !== project.description) {
    projectDescription = project.description;
  }
  $: if (projectURL !== project.project_url) {
    projectURL = project.project_url;
  }
  $: if (projectSkills !== project.skills) {
    projectSkills = project.skills || [];
  }

  const updateProject = (changes) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((projItem, idx) => {
        if (idx === projectIndex) {
          return {
            ...projItem,
            ...changes,
          };
        }
        return projItem;
      });
      return updatedProjects;
    });
  };

  const handleTitleChange = (event) => {
    updateProject({ title: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    updateProject({ description: event.target.value });
  };

  const handleURLChange = (event) => {
    updateProject({ project_url: event.target.value });
  };

  // Handle skills selection
  const toggleSkill = (skill) => {
    if (!$user.skills.includes(skill)) {
      // Skill is no longer available in user.skills
      return;
    }
    const skillsSet = new Set(projectSkills);
    if (skillsSet.has(skill)) {
      skillsSet.delete(skill);
    } else {
      skillsSet.add(skill);
    }
    const updatedSkills = Array.from(skillsSet);
    updateProject({ skills: updatedSkills });
    projectSkills = updatedSkills;
  };

  // Watch for changes in $user.skills
  $: {
    const validSkills = projectSkills.filter((skill) => $user.skills.includes(skill));
    if (validSkills.length !== projectSkills.length) {
      projectSkills = validSkills;
      updateProject({ skills: validSkills });
    }
  }
</script>

<div
  id={`project-${projectIndex}`}
  class="card"
  on:click={$mode === 'edit' ? selectElement : null}
  class:selected={$mode === 'edit' && $selectedElement === `project-${projectIndex}`}
  style={getStyleString(
    $selectedElement === `project-${projectIndex}`
      ? $selectedElementStyles
      : $elementStyles[`project-${projectIndex}`] || {}
  )}
>
  <div class="card-body">
    {#if $mode === 'edit'}
      <!-- Input fields for editing project -->
      <div class="flex flex-wrap -mx-2">
        <!-- Left Column -->
        <div class="w-full md:w-1/2 px-2">
          <label class="label">
            <span class="label-text">Project Title</span>
          </label>
          <input
            class="input input-bordered w-full"
            type="text"
            bind:value={projectTitle}
            on:input={handleTitleChange}
            placeholder="Project Title"
          />
          <label class="label">
            <span class="label-text">Project Description</span>
          </label>
          <textarea
            class="textarea textarea-bordered w-full mt-2"
            bind:value={projectDescription}
            on:input={handleDescriptionChange}
            placeholder="Project Description"
          ></textarea>
        </div>
        <!-- Right Column -->
        <div class="w-full md:w-1/2 px-2">
          <label class="label">
            <span class="label-text">Project URL (if applicable)</span>
          </label>
          <input
            class="input input-bordered w-full"
            type="text"
            bind:value={projectURL}
            on:input={handleURLChange}
            placeholder="Project URL"
          />

          <!-- Skills Selection -->
          <label class="label mt-4">
            <span class="label-text">Project Skill Badges</span>
          </label>
          <div class="flex flex-wrap gap-2">
            {#each $user.skills as skill}
              <label class="cursor-pointer flex items-center">
                <input
                  type="checkbox"
                  checked={projectSkills.includes(skill)}
                  on:change={() => toggleSkill(skill)}
                  class="checkbox checkbox-primary mr-2"
                />
                <span>{skill}</span>
              </label>
            {/each}
          </div>
        </div>
      </div>
    {:else}
      <!-- Display fields for project -->
      <h2
        class="card-title"
        style={getStyleString(
          $elementStyles[`project-${projectIndex}`]?.title || {}
        )}
      >
        {project.title}
      </h2>
      <p
        style={getStyleString(
          $elementStyles[`project-${projectIndex}`]?.description || {}
        )}
      >
        {project.description}
      </p>
      {#if project.project_url}
        <a href={project.project_url} target="_blank" class="text-blue-600 hover:underline">
          View Project
        </a>
      {/if}

      <!-- Display associated skills as badges -->
      {#if project.skills && project.skills.length > 0}
        <div class="mt-4 flex flex-wrap gap-2">
          {#each project.skills as skill}
            {#if $user.skills.includes(skill)}
              <div class="badge {$badgeClass}">
                {skill}
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    {/if}

    <!-- Render containers within the project -->
    {#each project.containers as container, containerIndex}
      <Container {container} {containerIndex} {projectIndex} />
    {/each}
  </div>
</div>

<style>
  .selected {
    border: 2px solid blue !important; /* Maybe use outline instead? */
  }
</style>