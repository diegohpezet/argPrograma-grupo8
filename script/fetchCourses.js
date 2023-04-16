const table = document.getElementById("table-content");

fetch("../courses.json")
  .then((response) => response.json())
  .then((data) => {
    const table = document.getElementById("table-content");
    var i = 0,
      maxRow = 10;
    function loadTable(i, maxRow) {
      table.innerHTML = "";
      for (i; i < maxRow; i++) {
        if (data[i]) {
          table.innerHTML += `
          <tr>
            <td>${data[i].name}</td>
            <td>${data[i].schedule}</td>
            <td>${data[i].teacher}</td>
            <td><button onclick='openCourseSignup(${JSON.stringify(
              data[i]
            )})' class="btn btn-primary">+</button></td>
          </tr>
        `;
        }
      }
    }
    loadTable(i, maxRow);

    // Nav de la tabla
    const nextBtn = document.getElementById("nextBtn");
    const previousBtn = document.getElementById("previousBtn");
    nextBtn.onclick = () => {
      if (i+10 <= data.length) {
        i += 10;
        maxRow += 10;
        loadTable(i, maxRow);
        if (i+10 > data.length) {
          nextBtn.classList.add("disabled")
        }
      }
      previousBtn.classList.remove("disabled")
    };

    previousBtn.onclick = () => {
      if (i != 0) {
        i -= 10;
        maxRow -= 10;
        loadTable(i, maxRow);
        if (i === 0) {
          previousBtn.classList.add("disabled")
        }
        nextBtn.classList.remove("disabled")
      }
    };
  
    // Filtrar tabla
    const courseInput = document.getElementById("courseInput");
    courseInput.oninput = () => {
      let filter = courseInput.value.toUpperCase();
      table.innerHTML = ""
      data.forEach(element => {
        if(filter != "") {
          if (element.name.toUpperCase().indexOf(filter) > -1) {
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
          }
        } else {
          loadTable(0, 10)
        }        
      });
    }
  
  });
// Stepper form
var user = {
  //Esta variable va a almacenar todos los datos del usuario
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
        text: `Al pulsar el botón, se enviará un correo eléctronico a ${user.contact.email} con los datos acerca del comienzo del curso`,
        currentProgressStep: 2,
        confirmButtonText: "OK",
        showCancelButton: false,
        showClass: { backdrop: "swal2-noanimation" },
        preConfirm: () => {
          Email.send({
            SecureToken: "df29c4f5-66fd-43c3-9463-f7473f4e42fe",
            To: `${user.contact.email}`,
            From: "yourcompany@gmail.com",
            Subject: `${user.data.name}, estás a un paso de acceder a la plataforma!`,
            Body: `<html>
            <p>Tu solicitud para ${course.name} está siendo procesada</p>
            <p>Puedes proceder con el pago haciendo una transferencia al siguiente CBU:</p>
            <ul>
            <li>000000123456789</li>
            <li>Alias: John Doe</li>
            </ul>
            <p>Luego envíe el comprobante a esta misma dirección de correo para ingresarlo al sistema</p>
            </html`,
          }).then(Swal.fire("El mensaje ha sido enviado", "Puedes revisar tu casilla de correo electrónico", "success"));
        },
      });
    }
  }
}
