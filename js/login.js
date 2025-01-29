
const urlUsuario = "http://localhost:5000/api/usuario";

async function peticionGet(url) {
  try {
    console.log('Intentando fetch a:', url);
    const respuesta = await fetch(url, {
      credentials: 'include',  // Incluir cookies si es necesario
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJjYW1wdXNjbCIsInN1YiI6Imx1aXNAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTczODA4NjUzNSwiZXhwIjoxNzM4OTUwNTM1fQ.nn4Eb-_Tv9qtGuEc9qhFeHYhY6cwPV97eVhLKcMZTkQAqSO2wdjuP2lU8nnR0mjWrrpD57K6KEx2ekE5fMNwBw'
      }
    });
    console.log('Estado de la respuesta:', respuesta.status);
    if (respuesta.ok) {
      const info = await respuesta.json();
      return info;
    } else {
      console.error(`Error HTTP: ${respuesta.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error al realizar la petición:", error);
    return null;
  }
}

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
