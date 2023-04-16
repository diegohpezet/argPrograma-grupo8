const contactForm = document.getElementById("contactForm");

contactForm.onsubmit = (e) => {
  e.preventDefault()
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg").value;

  Email.send({
    SecureToken: "bf3705ed-77eb-4373-91d1-672d84513d46",
    To: `${email}`,
    From: "diegohpezet@gmail.com",
    Subject: `${name}, hemos recibido tu mensaje`,
    Body: `Tu mensaje ("${msg}") ha sido recibido y nos pondremos en contacto cuanto antes contigo`,
  }).then(Swal.fire("El mensaje ha sido enviado", "Puedes revisar tu casilla de correo electrónico", "success"));
};
