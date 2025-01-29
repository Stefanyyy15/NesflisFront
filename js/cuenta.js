const urlUsuario = "http://localhost:5000/api/usuario"; // URL para obtener usuarios
const urlContenido = "http://localhost:5000/api/contenido"; // URL para obtener contenidos

const peticionGet = async (url) => {
  try {
    console.log('Intentando fetch a:', url);
    const respuesta = await fetch(url, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJjYW1wdXNjbCIsInN1YiI6Imx1aXNAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTczODA4NjUzNSwiZXhwIjoxNzM4OTUwNTM1fQ.nn4Eb-_Tv9qtGuEc9qhFeHYhY6cwPV97eVhLKcMZTkQAqSO2wdjuP2lU8nnR0mjWrrpD57K6KEx2ekE5fMNwBw'
      }
    });
    console.log('Estado de la respuesta:', respuesta.status);
    if (respuesta.ok) {
      const info = await respuesta.json();
      console.log('Datos obtenidos:', info); // Añadir log para ver los datos obtenidos
      return info;
    } else {
      console.error(`Error HTTP: ${respuesta.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error al realizar la petición:", error);
    return null;
  }
};


// PETICION POST
async function peticionPost(url, data) {
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJjYW1wdXNjbCIsInN1YiI6Imx1aXNAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTczODA4NjUzNSwiZXhwIjoxNzM4OTUwNTM1fQ.nn4Eb-_Tv9qtGuEc9qhFeHYhY6cwPV97eVhLKcMZTkQAqSO2wdjuP2lU8nnR0mjWrrpD57K6KEx2ekE5fMNwBw'
      },
      body: JSON.stringify(data)
    });

    console.log('Estado de la respuesta POST:', respuesta.status);
    
    if (respuesta.ok) {
      return await respuesta.json();
    } else {
      console.error(`Error HTTP: ${respuesta.status}`);
      const textoError = await respuesta.text();
      console.error('Detalle del error:', textoError);
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
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJjYW1wdXNjbCIsInN1YiI6Imx1aXNAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTczODA4NjUzNSwiZXhwIjoxNzM4OTUwNTM1fQ.nn4Eb-_Tv9qtGuEc9qhFeHYhY6cwPV97eVhLKcMZTkQAqSO2wdjuP2lU8nnR0mjWrrpD57K6KEx2ekE5fMNwBw'
      },
      body: JSON.stringify(data)
    });

    console.log('Estado de la respuesta PUT:', respuesta.status);

    if (respuesta.ok) {
      return await respuesta.json();
    } else {
      console.error(`Error HTTP: ${respuesta.status}`);
      const textoError = await respuesta.text();
      console.error('Detalle del error:', textoError);
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
    const respuesta = await fetch(url, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJjYW1wdXNjbCIsInN1YiI6Imx1aXNAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTczODA4NjUzNSwiZXhwIjoxNzM4OTUwNTM1fQ.nn4Eb-_Tv9qtGuEc9qhFeHYhY6cwPV97eVhLKcMZTkQAqSO2wdjuP2lU8nnR0mjWrrpD57K6KEx2ekE5fMNwBw'
      }
    });

    console.log('Estado de la respuesta DELETE:', respuesta.status);

    if (respuesta.ok) {
      return true;
    } else {
      console.error(`Error HTTP: ${respuesta.status}`);
      const textoError = await respuesta.text();
      console.error('Detalle del error:', textoError);
      return false;
    }
  } catch (error) {
    console.error("Error al realizar la petición DELETE:", error);
    return false;
  }
}



const obtenerUsuarioPorId = async (idUsuario) => {
  try {
    const respuesta = await peticionGet(`${urlUsuario}/${idUsuario}`);
    if (respuesta) {
      return respuesta;
    } else {
      console.error("Error al obtener el usuario");
      return null;
    }
  } catch (error) {
    console.error("Error en la petición de usuario:", error);
    return null;
  }
};

const obtenerContenidoPorId = async (idContenido) => {
  try {
    const respuesta = await peticionGet(`${urlContenido}/${idContenido}`);
    if (respuesta) {
      return respuesta;
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
    console.log("Mostrando datos del usuario...");
    const usuarioId = 3;
    const datosUsuario = await obtenerUsuarioPorId(usuarioId);

    if (!datosUsuario) return;

    console.log("Datos del usuario:", datosUsuario); // Verifica que los datos estén correctos

    document.querySelector("#info h1").textContent = datosUsuario.nombre;
    document.querySelector("#info h3").textContent = datosUsuario.correo;
    
    const planContainer = document.querySelector("#planContainer");
    planContainer.querySelector("h1").textContent = datosUsuario.plan.nombre;
    planContainer.querySelector("p").textContent = `Calidad de video: ${datosUsuario.plan.calidad_video}, Perfiles: ${datosUsuario.plan.num_perfiles}`;
    planContainer.querySelector("h3").textContent = `$ ${datosUsuario.plan.precio_mensual}`;

    const listaContainer = document.querySelector("#lista-container");
    /* for (const perfil of datosUsuario.perfiles) {
      for (const contenido of perfil.contenidosFavoritos) {
        const img = document.createElement("img");
        img.src = contenido.imagen_url;
        img.alt = contenido.nombre;
        listaContainer.appendChild(img);
      }
    } */
  } catch (error) {
    console.error("Error mostrando los datos del usuario:", error);
  }
};

document.addEventListener("DOMContentLoaded", mostrarDatosUsuario);


document.getElementById("btn-actualizar").addEventListener("click", () => {
  const contenedorRegistro = document.querySelector(".contenedorRegistro");
  if (contenedorRegistro.style.display === "none" || contenedorRegistro.style.display === "") {
    contenedorRegistro.style.display = "flex"; // Mostrar
  } else {
    contenedorRegistro.style.display = "none"; // Ocultar
  }
});

