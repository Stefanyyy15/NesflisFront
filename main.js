var url1 = "http://localhost:8080/api/administrador";


async function peticion(url) {
  const respuesta = await fetch(url);
  if (respuesta.ok) {
    const info = await respuesta.json();
    return info;
  } else {
    console.log("");
    return [];
  }
}
async function verPersonajes(url) {
  const categorias = await peticion(url);
  console.log(categorias);
}

verPersonajes(url1);