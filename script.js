let usuariosGlobales = [];
let postsCache = {};
const lista = document.getElementById("lista");

async function cargarUsuarios() {
  lista.innerHTML = '<span class="loading">Cargando usuarios...</span>';
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Error en la API");
    usuariosGlobales = await response.json();
    mostrarUsuarios(usuariosGlobales);
  } catch (error) {
    lista.innerText = `Error al cargar los usuarios: ${error.message}`;
    console.error(error);
  }
}

function mostrarUsuarios(usuarios) {
  lista.innerHTML = usuarios
    .map(
      (usuario) => `
        <div class="user-card" id="user-${usuario.id}">
          <h2>${usuario.name}</h2>
          <p>Email: ${usuario.email}</p>
          <p>Compañía: ${usuario.company.name}</p>
          <button onclick="togglePosts(${usuario.id}, this)">Mostrar Posts</button>
          <div class="posts" id="posts-${usuario.id}"></div>
        </div>
      `
    )
    .join("");
}

const debounceFilter = debounce(filtrarUsuarios, 300);
document.getElementById("filtro").oninput = debounceFilter;

function filtrarUsuarios() {
  const filtro = document.getElementById("filtro").value.toLowerCase();
  const usuariosFiltrados = usuariosGlobales.filter(
    (u) =>
      u.name.toLowerCase().includes(filtro) ||
      u.email.toLowerCase().includes(filtro) ||
      u.company.name.toLowerCase().includes(filtro)
  );
  mostrarUsuarios(usuariosFiltrados);
}

async function togglePosts(userId, button) {
  const postsDiv = document.getElementById(`posts-${userId}`);
  if (postsDiv.classList.contains("visible")) {
    postsDiv.classList.remove("visible");
    button.textContent = "Mostrar Posts";
    return;
  }

  if (postsCache[userId]) {
    postsDiv.innerHTML = postsCache[userId];
    postsDiv.classList.add("visible");
    button.textContent = "Ocultar Posts";
    return;
  }

  postsDiv.innerHTML = '<span class="loading">Cargando posts...</span>';
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!response.ok) throw new Error("Error en la API de posts");
    const posts = await response.json();
    const html = posts.length > 0
      ? `
        <h3>Posts:</h3>
        <ul>
          ${posts.slice(0, 3).map((post) => `<li>${post.title}</li>`).join("")}
        </ul>
      `
      : "<p>No hay posts disponibles.</p>";
    postsCache[userId] = html;
    postsDiv.innerHTML = html;
    postsDiv.classList.add("visible");
    button.textContent = "Ocultar Posts";
  } catch (error) {
    postsDiv.innerText = `Error al cargar los posts: ${error.message}`;
    console.error(error);
  }
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

cargarUsuarios();