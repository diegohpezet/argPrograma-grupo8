const contactForm = document.getElementById("contactForm");

contactForm.onsubmit = (e) => {
  e.preventDefault()
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg").value;

  Email.send({
    SecureToken: "df29c4f5-66fd-43c3-9463-f7473f4e42fe",
    To: `${email}`,
    From: "edu.codeandoaprendo@gmail.com",
    Subject: `${name}, hemos recibido tu mensaje`,
    Body: `Tu mensaje ("${msg}") ha sido recibido y nos pondremos en contacto cuanto antes contigo`,
  }).then(Swal.fire("El mensaje ha sido enviado", "Puedes revisar tu casilla de correo electrónico", "success"));
};
