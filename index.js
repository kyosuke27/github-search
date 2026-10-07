console.log("index.js: loaded");
const userId = "js-primer-example";

async function main() {
  try {
    const userId = getUserId();
    const userInfo = await fetchUesrInfo(userId);
    const view = createView(userInfo);
    desplayView(view);
  } catch (error) {
    console.error(`エラーが発生しました (${error})`);
  }
}
function fetchUesrInfo(userId) {
  return fetch(
    `https://api.github.com/users/${encodeURIComponent(userId)}`,
  ).then((response) => {
    if (!response.ok) {
      console.log("エラーレスポンス", response);
      return Promise.reject(new Error(`${response.status}`));
    } else {
      console.log(response.status);
      return response.json();
    }
  });
}

function getUserId() {
  const value = document.getElementById("userId").value;
  return encodeURIComponent(value);
}

function createView(userInfo) {
  return escapeHTML`
  <h4>${userInfo.name} (@${userInfo.login})</h4>
  <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
  <dl>
      <dt>Location</dt>
      <dt>${userInfo.location}</dt>
      <dt>repositories</dt>
      <dt>${userInfo.public_repos}</dt>
  </dl>
    `;
}

function desplayView(view) {
  const result = document.getElementById("result");
  result.innerHTML = view;
}

function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "$lt;")
    .replace(/>/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value == "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}
