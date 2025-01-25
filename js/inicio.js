
const urlContenido = "http://localhost:8080/api/contenido";

// PETICION GET

async function peticionGet(url) {
    try {
      const respuesta = await fetch(url);
      if (respuesta.ok) {
        return await respuesta.json();
      } else {
        console.error("Error en la respuesta de la API");
        return [];
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      return [];
    }
  }

  // PETICION POST 

  async function peticionPost(url, data) {
    try {
      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (respuesta.ok) {
        return await respuesta.json();
      } else {
        console.error("Error en la respuesta de la API");
        return null;
      }
    } catch (error) {
      console.error("Error al realizar la petición POST:", error);
      return null;
    }
  }

  // PETICION PUT
async function peticionPut(url, data) {
  try {
    const respuesta = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (respuesta.ok) {
      return await respuesta.json();
    } else {
      console.error("Error en la respuesta de la API");
      return null;
    }
  } catch (error) {
    console.error("Error al realizar la petición PUT:", error);
    return null;
  }
}

// PETICION DELETE
async function peticionDelete(url) {
  try {
    const respuesta = await fetch(url, { method: "DELETE" });
    if (respuesta.ok) {
      return true;
    } else {
      console.error("Error en la respuesta de la API");
      return false;
    }
  } catch (error) {
    console.error("Error al realizar la petición DELETE:", error);
    return false;
  }
}

// FUNCIONES PARA CARGAR IMAGENES DE INICIO

  async function peliculasInicio(url) {
    const categorias = await peticionGet(url);
    const container = document.getElementById("image-container");

    const imagenes = categorias.slice(0, 12);

    container.innerHTML = "";

    imagenes.forEach((categoria) => {
      const a = document.createElement("a");
      const img = document.createElement("img");

      img.src = categoria.imagenUrl; 

      a.appendChild(img);
      container.appendChild(a);
    });
  }

  peliculasInicio(urlContenido);

  async function peliculas(url) {
    const categorias = await peticionGet(url);
    const container = document.getElementById("peliculas-container");

    const imagenes = categorias.slice(12, 24);

    container.innerHTML = "";

    imagenes.forEach((categoria) => {
      const a = document.createElement("a");
      const img = document.createElement("img");

      img.src = categoria.imagenUrl; 

      a.appendChild(img);
      container.appendChild(a);
    });
  }

  peliculas(urlContenido);