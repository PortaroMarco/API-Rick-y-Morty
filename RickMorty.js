const resultsDiv = document.getElementById("results");
const loadAllBtn = document.getElementById("loadAll");
const filterForm = document.getElementById("filterForm");

// Renderizar personajes
function renderCharacters(characters) {
  resultsDiv.innerHTML = "";
  characters.forEach((char) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}" />
      <h3>${char.name}</h3>
      <p><strong>Estado:</strong> ${char.status}</p>
      <p><strong>Especie:</strong> ${char.species}</p>
    `;
    resultsDiv.appendChild(card);
  });
}

// Mostrar error
function showError(message) {
  resultsDiv.innerHTML = `<p class="error">${message}</p>`;
}

// Obtener todos los personajes
loadAllBtn.addEventListener("click", () => {
  fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((data) => renderCharacters(data.results))
    .catch(() => showError("No se pudieron cargar los personajes"));
});

// Filtrar personajes
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const status = document.getElementById("status").value;
  const species = document.getElementById("species").value;
  const type = document.getElementById("type").value;
  const gender = document.getElementById("gender").value;

  const params = new URLSearchParams();
  if (name) params.append("name", name);
  if (status) params.append("status", status);
  if (species) params.append("species", species);
  if (type) params.append("type", type);
  if (gender) params.append("gender", gender);

  fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`)
    .then((res) => {
      if (!res.ok) throw new Error("No hay resultados");
      return res.json();
    })
    .then((data) => renderCharacters(data.results))
    .catch(() => showError("No se encontraron personajes con esos filtros"));
});
