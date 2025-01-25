
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

async function loginUsuario(email, password) {
    const usuarios = await peticionGet(urlUsuario);
    const usuarioExistente = usuarios.find(usuario => usuario.correo === email);
    if (usuarioExistente && usuarioExistente.contrasena === password) {
      window.location.href = "/Inicio/index.html";
      return true;
    } else {
      alert("Usuario o contraseña incorrectos.");
      return false;
    }
  }
  
  // BOTONES
  
  document.getElementById("btn-entrar").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email && password) {
      loginUsuario(email, password);
    } else {
      alert("Por favor ingrese su correo y contraseña.");
    }
  });
