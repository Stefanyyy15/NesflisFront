// URLS

const urlAdministrador = "http://localhost:8080/api/administrador";
const urlPlanes = "http://localhost:8080/api/plan";
const urlUsuario = "http://localhost:8080/api/usuario";

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

  async function peticionPost(url, datos) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });

        if (!response.ok) {
            throw new Error('Error al hacer la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en la petición POST:', error);
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

// FUNCION PARA CARGAR LOS PLANES
async function cargarPlanesDropdown() {
  const planes = await peticionGet(urlPlanes);
  const dropdown = document.getElementById("plan");

  if (planes && planes.length > 0) {
    planes.forEach((plan) => {
      const option = document.createElement("option");
      option.value = plan.id; 
      option.textContent = `${plan.nombre} - $ ${plan.precio_mensual} USD`;
      dropdown.appendChild(option);
    });
  } else {
    console.error("No se encontraron planes.");
  }
}

cargarPlanesDropdown();

async function cargarPlanes() {
  try {
    const planes = await peticionGet(urlPlanes); 
    const contPlanes = document.getElementById("planesContainer");

    if (planes && planes.length > 0) {
      planes.forEach((plan) => {
        const divPlan = document.createElement("div");
        divPlan.className = "plan";
        divPlan.innerHTML = `
          <h2>${plan.nombre}</h2>
          <p>Calidad de video: ${plan.calidad_video}</p>
          <p>Perfiles disponibles: ${plan.num_perfiles}</p>
          <h4>Precio: $${plan.precio_mensual} USD</h4>
        `;
        contPlanes.appendChild(divPlan);
      });
    } else {
      console.error("No se encontraron planes.");
      contPlanes.innerHTML = "<p>No hay planes disponibles.</p>";
    }
  } catch (error) {
    console.error("Error al cargar los planes:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarPlanes();
});


// HACER LA FUNCION PARA REGISTRAR POST !!!!!!!!!!



async function cargarAdministradores() {
  const administradores = await peticionGet("http://localhost:8080/api/administrador");
  const dropdown = document.getElementById("administrador");

  administradores.forEach(admin => {
    const option = document.createElement("option");
    option.value = admin.id_administrador;
    option.textContent = admin.nombre;
    dropdown.appendChild(option);
  });
}

async function cargarGeneros() {
  const generos = await peticionGet("http://localhost:8080/api/genero");
  const dropdown = document.getElementById("generos");

  generos.forEach(genero => {
    const option = document.createElement("option");
    option.value = genero.id_genero;
    option.textContent = genero.nombre;
    dropdown.appendChild(option);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  cargarAdministradores();
  cargarGeneros();
});


async function eliminarUsuario(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma convencional

  // Obtén el ID del usuario que se va a eliminar
  const idUsuario = document.getElementById("id_usuario").value;

  // Validar que el ID del usuario esté presente
  if (!idUsuario) {
    alert("Por favor, ingresa el ID del usuario a eliminar.");
    return;
  }

  // Realizar la petición DELETE
  const resultado = await peticionDelete(`http://localhost:8080/api/usuario/${idUsuario}`);

  // Resultado de la petición
  if (resultado) {
    alert("Usuario eliminado exitosamente.");
    console.log("Respuesta del servidor:", resultado);
  } else {
    alert("Hubo un error al eliminar el usuario.");
  }
}

// Función para realizar la solicitud DELETE
async function peticionDelete(url) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Agrega cualquier otro encabezado necesario, por ejemplo, para la autenticación
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el usuario');
    }

    return await response.json();  // Retorna la respuesta JSON si todo va bien
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
    return null;
  }
}


async function registrarUsuario(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma convencional

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const planId = parseInt(document.getElementById("plan").value); // Plan seleccionado
  const perfiles = Array.from(document.querySelectorAll("#perfiles option:checked")).map(option => {
    return {
      id_perfil: parseInt(option.value), // ID del perfil
      nombre: option.text // Nombre del perfil
    };
  });

  // Validar campos necesarios
  if (!nombre || !correo || !contrasena || !planId) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  


  

  // Estructura del objeto nuevoUsuario
  const nuevoUsuario = {
    nombre: nombre,
    correo: correo,
    contrasena: contrasena,
    // La fecha de registro la maneja el servidor automáticamente
    fecha_registro: new Date().toISOString(),  // Si lo necesitas, puedes enviar la fecha desde el frontend
    plan: {
      id_plan: planId
    },
    perfiles: perfiles
  };

  // Realizar la petición POST
  const resultado = await peticionPost("http://localhost:8080/api/usuario", nuevoUsuario);

  // Resultado de la petición
  if (resultado) {
    alert("Usuario registrado exitosamente.");
    console.log("Respuesta del servidor:", resultado);
  } else {
    alert("Hubo un error al registrar el usuario.");
  }
}


async function registrarContenido(event) {
  event.preventDefault(); 

  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const anioEstreno = parseInt(document.getElementById("anioEstreno").value);
  const clasificacion = document.getElementById("clasificacion").value;
  const tipo = document.getElementById("tipo").value;
  const administradorId = parseInt(document.getElementById("administrador").value); 
  const generoIds = Array.from(document.querySelectorAll("#generos option:checked")).map(option => parseInt(option.value)); 

  if (!titulo || !descripcion || !anioEstreno || !clasificacion || !tipo || !administradorId || generoIds.length === 0) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const nuevoContenido = {
    titulo: titulo,
    descripcion: descripcion,
    anio_Estreno: anioEstreno,
    clasificacion: clasificacion,
    tipo: tipo,
    administrador: { id_administrador: administradorId },
    generos: generoIds.map(id => ({ id_genero: id })), 
  };

  const resultado = await peticionPost("http://localhost:8080/api/contenido", nuevoContenido);

  if (resultado) {
    alert("Contenido registrado exitosamente.");
    console.log("Respuesta del servidor:", resultado);
  } else {
    alert("Hubo un error al registrar el contenido.");
  }
}

