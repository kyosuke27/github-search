function escapeSpecialChars(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, string, index) => {
    if (index === 0) {
      return string;
    }

    return result + escapeSpecialChars(values[index - 1]) + string;
  }, "");
}

function createUserView(userInfo) {
  return escapeHTML`
    <article class="user-card">
      <img
        class="user-card__avatar"
        src="${userInfo.avatar_url}"
        alt="${userInfo.login}のアバター"
        width="100"
        height="100"
      >
      <div class="user-card__content">
        <h2 class="user-card__name">
          ${userInfo.name} <span class="user-card__login">(@${userInfo.login})</span>
        </h2>
        <dl class="detail-list">
          <div class="detail-list__item">
            <dt>Location</dt>
            <dd>${userInfo.location}</dd>
          </div>
          <div class="detail-list__item">
            <dt>Repositories</dt>
            <dd>${userInfo.public_repos}</dd>
          </div>
        </dl>
      </div>
    </article>
  `;
}

function createRepositoryView(repositories) {
  const repositoryItems = repositories
    .map((repository) => {
      const language = repository.language ?? "";
      const description = repository.description ?? "記述なし";
      const iconName = getProgramIcon(repository.language);
      if (iconName) {
        return escapeHTML`
        <article class="repository-card">
          <h3 class="repository-card__name">${repository.name}</h3>
          <dl class="detail-list">
<div class="detail-list__item">
              <dt>language</dt>
              <dd><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${getProgramIcon(repository.language)}/${getProgramIcon(repository.language)}-original.svg" width="32" height="32"></dd>
            </div>
            <div class="detail-list__item">
              <dt>Description</dt>
              <dd>${description}</dd>
            </div>
            <div class="detail-list__item">
              <dt>URL</dt>
              <dd>
                <a href="${repository.html_url}" target="_blank" rel="noopener noreferrer">
                  ${repository.name}
                </a>
              </dd>
            </div>
          </dl>
        </article>
      `;
      } else {
        return escapeHTML`
        <article class="repository-card">
          <h3 class="repository-card__name">${repository.name}</h3>
          <dl class="detail-list">
<div class="detail-list__item">
              <dt>language</dt>
              <dd>${language}</dd>
            </div>
            <div class="detail-list__item">
              <dt>Description</dt>
              <dd>${description}</dd>
            </div>
            <div class="detail-list__item">
              <dt>URL</dt>
              <dd>
                <a href="${repository.html_url}" target="_blank" rel="noopener noreferrer">
                  ${repository.name}
                </a>
              </dd>
            </div>
          </dl>
        </article>
      `;
      }
    })
    .join("");

  return `
    <section class="repository-list" aria-labelledby="repository-heading">
      <h2 id="repository-heading" class="repository-list__title">Repositories</h2>
      <div class="repository-list__items">${repositoryItems}</div>
    </section>
  `;
}

const viewTemplates = Object.freeze({
  createUserView,
  createRepositoryView,
});
