const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

function renderRepository(repository) {
  const item = document.createElement("li");
  item.className = "repository";

  const name = document.createElement("p");
  name.className = "repository-name";

  const link = document.createElement("a");
  link.href = repository.url;
  link.textContent = repository.fullName;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  name.append(link);

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const metadata = document.createElement("p");
  metadata.className = "repository-meta";

  const language = document.createElement("span");
  language.textContent = repository.language;

  const date = document.createElement("time");
  date.dateTime = repository.starredAt;
  date.textContent = `Starred ${new Date(`${repository.starredAt}T00:00:00`).toLocaleDateString()}`;

  metadata.append(language, date);
  item.append(name, description, metadata);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(renderRepository));
    statusMessage.textContent = `${repositories.length} repositories`;
  } catch (error) {
    statusMessage.textContent = "Repositories could not be loaded.";
    console.error("Unable to load starred repositories:", error);
  }
}

loadRepositories();