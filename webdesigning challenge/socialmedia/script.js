let posts = JSON.parse(localStorage.getItem("posts")) || [];

function createPost() {
  const content = document.getElementById("postContent").value;
  const fileInput = document.getElementById("mediaUpload");
  const tags = document.getElementById("tagsInput").value;
  const mediaFile = fileInput.files[0];

  if (!content && !mediaFile) {
    alert("Please add text or media");
    return;
  }

  const post = {
    id: Date.now(),
    content,
    tags,
    media: mediaFile ? URL.createObjectURL(mediaFile) : null,
    mediaType: mediaFile ? mediaFile.type : null,
    likes: 0,
    comments: []
  };

  posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(posts));
  renderFeed();
  document.getElementById("postContent").value = "";
  document.getElementById("tagsInput").value = "";
  fileInput.value = "";
}

function renderFeed() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "<h2>📢 Feed</h2>";
  document.getElementById("portfolioPostsCount").innerText = posts.length;

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <p>${post.content}</p>
      ${post.media ? renderMedia(post.media, post.mediaType) : ""}
      <p class="tags">${post.tags}</p>
      <button onclick="likePost(${post.id})">❤️ ${post.likes}</button>
      <div class="comments">
        <input id="comment-${post.id}" placeholder="Add comment..." />
        <button onclick="addComment(${post.id})">💬</button>
        <ul>${post.comments.map(c => `<li>${c}</li>`).join("")}</ul>
      </div>
    `;
    feed.appendChild(div);
  });
}

function renderMedia(url, type) {
  if (type.startsWith("image")) {
    return `<img src="${url}" width="100%" />`;
  } else if (type.startsWith("video")) {
    return `<video src="${url}" controls width="100%"></video>`;
  }
  return "";
}

function likePost(id) {
  const post = posts.find(p => p.id === id);
  post.likes++;
  localStorage.setItem("posts", JSON.stringify(posts));
  renderFeed();
}

function addComment(id) {
  const input = document.getElementById(`comment-${id}`);
  const comment = input.value;
  if (!comment) return;
  const post = posts.find(p => p.id === id);
  post.comments.push(comment);
  input.value = "";
  localStorage.setItem("posts", JSON.stringify(posts));
  renderFeed();
}

function openProfile() {
  document.getElementById("portfolioModal").classList.remove("hidden");
}

function closeProfile() {
  document.getElementById("portfolioModal").classList.add("hidden");
}

// Load initial feed
renderFeed();
