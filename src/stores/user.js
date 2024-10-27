import { writable } from 'svelte/store';
import { projects } from './projects.js';

export const user = writable({
  full_name: 'John Doe',
  bio: 'A passionate developer.',
  profile_picture:
    'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/KilmarnockLogo.svg/1200px-KilmarnockLogo.svg.png',
  skills: ['HTML', 'JavaScript', 'CSS'],
});

// Watch for changes in user.skills and update projects
user.subscribe((currentUser) => {
  if (currentUser && currentUser.skills) {
    synchronizeProjectSkills(currentUser.skills);
  }
});

function synchronizeProjectSkills(userSkills) {
  projects.update((projList) => {
    return projList.map((project) => {
      const updatedSkills = project.skills.filter((skill) => userSkills.includes(skill));
      return { ...project, skills: updatedSkills };
    });
  });
}