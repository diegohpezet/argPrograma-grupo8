const table = document.getElementById("table-content");
const courseInput = document.getElementById("courseInput");

fetch("../courses.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const table = document.getElementById("table-content");
      table.innerHTML += `
      <tr>
        <td>${element.name}</td>
        <td>${element.schedule}</td>
        <td>${element.teacher}</td>
        <td><button onclick='openCourseSignup(${JSON.stringify(
          element
        )})' class="btn btn-primary">+</button></td>
      </tr>
      `;
    });
  });

// Stepper form
var user = {
  //This is going to contain all user's data
};
async function openCourseSignup(course) {
  const Queue = Swal.mixin({
    progressSteps: ["1", "2", "3"],
    confirmButtonText: "Next >",
    allowOutsideClick: false,
    showCloseButton: true,
  });

  await Queue.fire({
    title: `${course.name}`,
    currentProgressStep: 0,
    html: `
      <hr />
      <input type="number" id="dni" class="swal2-input" placeholder="DNI">
      <input type="text" id="name" class="swal2-input" placeholder="Nombre">
      <input type="text" id="surname" class="swal2-input" placeholder="Apellido">
      `,
    showClass: { backdrop: "swal2-noanimation" },

    preConfirm: () => {
      const dni = Swal.getPopup().querySelector("#dni").value;
      const name = Swal.getPopup().querySelector("#name").value;
      const surname = Swal.getPopup().querySelector("#surname").value;
      if (!dni || !name || !surname) {
        Swal.showValidationMessage(`Por favor, completa todas las casillas`);
      }
      return (user = {
        data: {
          dni: dni,
          name: name,
          surname: surname,
        },
      });
    },
  });
  if (user.data) {
    await Queue.fire({
      title: `Información de contacto`,
      currentProgressStep: 1,
      html: `
      <hr />
      <input type="number" id="tel" class="swal2-input" placeholder="Teléfono">
      <input type="email" id="email" class="swal2-input" placeholder="Email" />
      `,
      preConfirm: () => {
        const tel = Swal.getPopup().querySelector("#tel").value;
        const email = Swal.getPopup().querySelector("#email").value;
        if (!tel || !email) {
          Swal.showValidationMessage(`Por favor, completa todas las casillas`);
        }
        return (user = {
          ...user,
          contact: {
            tel: tel,
            email: email,
          },
        });
      },
    });
    if (user.contact) {
      await Queue.fire({
        title: "Confirmación",
        text: `Al pulsar el botón, se enviará un correo eléctronico a ${user.email} con los datos acerca del comienzo del curso`,
        currentProgressStep: 2,
        confirmButtonText: "OK",
        showCancelButton: false,
        showClass: { backdrop: "swal2-noanimation" },
        preConfirm: () => {
          // Enviar mail
        },
      });
    }
  }
}

//Visualización de datos tipo formulario donde muestre los distintos cursos que ofrecemos!
