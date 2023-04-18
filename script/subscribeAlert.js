const subscribeEmail = document.getElementById("subscribeEmail");
const subscribeBtn = document.getElementById("subscribeBtn");

subscribeBtn.onclick = () => {
  //Validación de caracteres del email
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(subscribeEmail.value)) {
    Swal.fire({
      icon: "success",
      title: "Te has suscrito!",
      text: "Empezarás a recibir correos con información sobre nuestros cursos!",
    });
  }
};
