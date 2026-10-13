console.log("index.js: loaded");
const userId = "js-primer-example";

const GITHUB_URL = "https://api.github.com";

async function main() {
  try {
    const userId = getUserId();
    const userInfo = await fetchUesrInfo(userId);
    const view = viewTemplates.createUserView(userInfo);
    desplayView(view);
  } catch (error) {
    console.error(`エラーが発生しました (${error})`);
  }
}

async function fetchUserRepository() {
  try {
    const userId = getUserId();
    const userRepo = await fetchRepositoryList(userId);
    console.log(userRepo);
    const view = viewTemplates.createRepositoryView(userRepo);
    desplayView(view);
  } catch (error) {
    console.error(`エラーが発生しました (${error})`);
  }
}
function fetchUesrInfo(userId) {
  return fetch(`${GITHUB_URL}/users/${encodeURIComponent(userId)}`).then(
    (response) => {
      if (!response.ok) {
        console.log("エラーレスポンス", response);
        return Promise.reject(new Error(`${response.status}`));
      } else {
        console.log(response.status);
        return response.json();
      }
    },
  );
}

function fetchRepositoryList(userId) {
  console.log(`${GITHUB_URL}/users/${encodeURIComponent(userId)}/repos`);
  return fetch(`${GITHUB_URL}/users/${encodeURIComponent(userId)}/repos`).then(
    (response) => {
      if (!response.ok) {
        console.log("エラーレスポンス", response);
        return Promise.reject(new Error(`${response.status}`));
      } else {
        console.log(response.status);
        return response.json();
      }
    },
  );
}

function getUserId() {
  const value = document.getElementById("userId").value;
  return encodeURIComponent(value);
}

function desplayView(view) {
  const result = document.getElementById("result");
  result.innerHTML = view;
}

function getProgramIcon(program) {
  const map = {
    C: "c",
    JavaScript: "javascript",
    TypeScript: "typescript",
    "C#": "csharp",
    Rust: "rust",
    Swift: "swift",
    Go: "go",
    Lua: "lua",
    Kotlin: "kotlin",
  };
  console.log(`${program} : ${map[program]}`);
  return map[program] ?? "";
}
