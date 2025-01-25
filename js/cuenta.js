const urlUsuario = "http://localhost:8080/api/usuario"; 
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

        async function obtenerDatosUsuario() {
            const respuesta = await peticionGet(urlUsuario);
            if (respuesta) {
                document.getElementById("profile-name").textContent = respuesta.nombre;
                document.getElementById("profile-plan").textContent = `Plan: ${respuesta.plan}`;
                cargarContenidoFavorito(respuesta.contenidoFavorito);
                cargarValoraciones(respuesta.valoraciones);
            }
        }

        // Cargar contenido favorito
        async function cargarContenidoFavorito(contenido) {
            const container = document.getElementById("favorite-content");
            container.innerHTML = "";

            contenido.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("content-item");
                div.textContent = item.titulo;
                container.appendChild(div);
            });
        }

        // Cargar valoraciones
        async function cargarValoraciones(valoraciones) {
            const container = document.getElementById("ratings");
            container.innerHTML = "";

            valoraciones.forEach(valoracion => {
                const div = document.createElement("div");
                div.classList.add("content-item");
                div.textContent = `${valoracion.titulo} - Calificación: ${valoracion.calificacion}`;
                container.appendChild(div);
            });
        }

        document.getElementById("logout-button").addEventListener("click", () => {
            // Lógica para cerrar sesión (p. ej., redirigir o limpiar datos)
            window.location.href = "/login"; // Redirigir a login
        });

        document.getElementById("delete-account-button").addEventListener("click", async () => {
            const confirmacion = confirm("¿Estás seguro de que quieres eliminar tu cuenta?");
            if (confirmacion) {
                const respuesta = await peticionDelete(urlUserData);
                if (respuesta) {
                    alert("Cuenta eliminada con éxito.");
                    window.location.href = "/login"; 
                } else {
                    alert("Hubo un problema al eliminar la cuenta.");
                }
            }
        });

        obtenerDatosUsuario();