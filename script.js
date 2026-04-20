// FUNCIÓN PARA MOSTRAR LA INVITACIÓN
// 📌 Leer parámetros de la URL
function obtenerParametros() {
  const params = new URLSearchParams(window.location.search);

  return {
    nombre: params.get("nombre"),
    invitados: params.get("invitados")
      ? params.get("invitados").split(",")
      : []
  };
}

// 📌 Cargar contenido al abrir la página
document.addEventListener("DOMContentLoaded", function () {
  const datos = obtenerParametros();

  const titulo = document.getElementById("tituloInvitado");
  const contenedor = document.getElementById("listaInvitados");

  // Mostrar nombre
  titulo.innerText = `Hola ${datos.nombre} 💖`;

  // 👉 Caso: solo una persona
  if (datos.invitados.length === 1) {
    contenedor.innerHTML = `<p>Confirmá tu asistencia 🎉</p>`;
    return;
  }

  // 👉 Caso: varios invitados
  datos.invitados.forEach((persona) => {
    const item = document.createElement("div");

    item.innerHTML = `
      <label>
        <input type="checkbox" value="${persona}" checked>
        ${persona}
      </label>
    `;

    contenedor.appendChild(item);
  });
});

// 📌 Confirmar asistencia
function confirmarAsistencia() {

  const datos = obtenerParametros();
  const nombre = datos.nombre;

  const opcion = document.querySelector('input[name="asiste"]:checked');

  if (!opcion) {
    alert("Seleccioná una opción");
    return;
  }

  const asistencia = opcion.value;

  // 📌 Obtener confirmados
  let confirmados = [];
  const checks = document.querySelectorAll('#listaInvitados input:checked');

  if (checks.length === 0) {
    confirmados.push(nombre);
  } else {
    checks.forEach(c => confirmados.push(c.value));
  }

  // 🚫 evitar doble envío
  const boton = document.getElementById("btnConfirmar");
  boton.disabled = true;
  boton.innerText = "Enviando...";

  // 🔥 Enviar a Apps Script
  fetch("https://script.google.com/macros/s/AKfycbycQtBlU3O2jyPhyyvMySnxxmdo5S-i8r5EpRE9FNnqY39E6SN4chCB61Lmi1YENssR/exec", {
  method: "POST",
  body: new URLSearchParams({
    nombre: nombre,
    asistencia: asistencia,
    confirmados: confirmados.join(", ")
  })
});

  // 💌 Mensaje final
  setTimeout(() => {
    document.getElementById("contenido").innerHTML = `
      <h2>¡Gracias por confirmar! 💖</h2>
      <p>Te esperamos 🎉</p>
    `;
  }, 800);
}

