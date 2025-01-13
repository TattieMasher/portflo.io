const API_BASE_URL = 'https://TODO-CHANGE.com/api';

export async function fetchProjects() {
    /*
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
  */
}

export async function updateProject(projectId, data) {
    /*
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
  */
}

export async function syncElementStylesToAPI(elementId, styles) {
    /*
  await fetch(`${API_BASE_URL}/elements/${elementId}/styles`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(styles),
  });
  */
}
