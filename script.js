let usuariosGlobales = [];

async function cargarUsuarios() {
  const lista = document.getElementById("lista");
  lista.innerText = "Cargando...";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    usuariosGlobales = await response.json();
    mostrarUsuarios(usuariosGlobales);
  } catch (error) {
    lista.innerText = "Error al cargar los usuarios.";
    console.log(error);
  }
}

function mostrarUsuarios(usuarios) {
  const lista = document.getElementById("lista");
  lista.innerHTML = usuarios
    .map(
      (usuario) => `
        <div class="user-card" id="user-${usuario.id}">
          <h2>${usuario.name}</h2>
          <p>Email: ${usuario.email}</p>
          <p>Compañía: ${usuario.company.name}</p>
          <button onclick="togglePosts(${usuario.id})">Mostrar Posts</button>
          <div class="posts" id="posts-${usuario.id}"></div>
        </div>
      `
    )
    .join("");
}

function filtrarUsuarios() {
  const filtro = document.getElementById("filtro").value.toLowerCase();
  const usuariosFiltrados = usuariosGlobales.filter((usuario) =>
    usuario.name.toLowerCase().includes(filtro)
  );
  mostrarUsuarios(usuariosFiltrados);
}

async function togglePosts(userId) {
  const postsDiv = document.getElementById(`posts-${userId}`);
  if (postsDiv.classList.contains("visible")) {
    postsDiv.classList.remove("visible");
    return;
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.json();
    postsDiv.innerHTML = `
      <h3>Posts:</h3>
      <ul>
        ${posts.slice(0, 3).map((post) => `<li>${post.title}</li>`).join("")}
      </ul>
    `;
    postsDiv.classList.add("visible");
  } catch (error) {
    postsDiv.innerText = "Error al cargar los posts.";
    console.log(error);
  }
}

cargarUsuarios();

let postsCache = {};

async function togglePosts(userId) {
  const postsDiv = document.getElementById(`posts-${userId}`);
  if (postsDiv.classList.contains("visible")) {
    postsDiv.classList.remove("visible");
    return;
  }

  if (postsCache[userId]) {
    postsDiv.innerHTML = postsCache[userId];
    postsDiv.classList.add("visible");
    return;
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.json();
    const html = `
      <h3>Posts:</h3>
      <ul>
        ${posts.slice(0, 3).map((post) => `<li>${post.title}</li>`).join("")}
      </ul>
    `;
    postsCache[userId] = html;
    postsDiv.innerHTML = html;
    postsDiv.classList.add("visible");
  } catch (error) {
    postsDiv.innerText = "Error al cargar los posts.";
    console.log(error);
  }
}