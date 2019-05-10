
export function baseUrl(realmId, forumUid, postUid) {
  if (!realmId) realmId = "UNDEF_REALM";
  // TODO: use env variable for the ROOT URL
  let path = [];
  if (forumUid) {
    path.push("/" + forumUid);
  }
  if (postUid) {
    path.push("/posts/" + postUid);
  }
  return "http://localhost:8080/api/v1/" + realmId + "/forums" + path.join("");
}

export async function addPost(realmUid, content) {
  const url = baseUrl(realmUid, content.forumUid) + "/posts";
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(content),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}


export async function fetchThreadPosts(realmUid, forumUid, threadUid, page) {
  if (!page) {
    page = 0;
  }
  const url = baseUrl(realmUid, forumUid, threadUid) + "/thread?page=" + page;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}