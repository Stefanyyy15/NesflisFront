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


