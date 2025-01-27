const urlUsuario = "http://localhost:8080/api/usuario"; // URL para obtener usuarios
const urlContenido = "http://localhost:8080/api/contenido"; // URL para obtener contenidos

// Función para obtener datos del usuario logueado por ID (ejemplo: ID 3)
const obtenerUsuarioPorId = async (idUsuario) => {
  try {
    const respuesta = await fetch(`${urlUsuario}/${idUsuario}`);
    if (respuesta.ok) {
      return await respuesta.json();
    } else {
      console.error("Error al obtener el usuario");
      return null;
    }
  } catch (error) {
    console.error("Error en la petición de usuario:", error);
    return null;
  }
};

// Función para obtener contenido favorito por ID
const obtenerContenidoPorId = async (idContenido) => {
  try {
    const respuesta = await fetch(`${urlContenido}/${idContenido}`);
    if (respuesta.ok) {
      return await respuesta.json();
    } else {
      console.error("Error al obtener contenido favorito");
      return null;
    }
  } catch (error) {
    console.error("Error en la petición de contenido:", error);
    return null;
  }
};

const mostrarDatosUsuario = async () => {
  try {
    const usuarioId = 3; 
    const datosUsuario = await obtenerUsuarioPorId(usuarioId);

    if (!datosUsuario) return;
    document.querySelector("#info h1").textContent = datosUsuario.nombre;
    document.querySelector("#info h3").textContent = datosUsuario.correo;
    const planContainer = document.querySelector("#planContainer");
    planContainer.querySelector("h1").textContent = datosUsuario.plan.nombre;
    planContainer.querySelector("p").textContent = `Calidad de video: ${datosUsuario.plan.calidad_video}, Perfiles: ${datosUsuario.plan.num_perfiles}`;
    planContainer.querySelector("h3").textContent = `$ ${datosUsuario.plan.precio_mensual}`;

    const listaContainer = document.querySelector("#lista-container");
    for (const perfil of datosUsuario.perfiles) {
      for (const contenido of perfil.contenidosFavoritos) {
        const img = document.createElement("img");
        img.src = contenido.imagen_url; 
        img.alt = contenido.nombre;
        listaContainer.appendChild(img);
      }
    }
  } catch (error) {
    console.error("Error mostrando los datos del usuario:", error);
  }
};

// Alternar la visibilidad del contenedor de actualización
document.getElementById("btn-actualizar").addEventListener("click", () => {
  const contenedorRegistro = document.querySelector(".contenedorRegistro");
  if (contenedorRegistro.style.display === "none" || contenedorRegistro.style.display === "") {
    contenedorRegistro.style.display = "flex"; // Mostrar
  } else {
    contenedorRegistro.style.display = "none"; // Ocultar
  }
});
document.addEventListener("DOMContentLoaded", mostrarDatosUsuario);
