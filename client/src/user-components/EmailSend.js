import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../style.css";

const EmailSend = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_553qxhh",
        "template_3nvr97d",
        form.current,
        "RURADc_u41f4iIBAP"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <section>
      <div className="emailsenddiv">
        <h2>SEND YOUR MAIL</h2>
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            placeholder="Enter name"
            name="userName"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            name="userEmail"
            required
          />
          <input
            type="text"
            placeholder="Enter subject"
            name="userSubject"
            required
          />
          <textarea name="message" cols="40" rows="10"></textarea>
          <button type="submit">Send mail</button>
        </form>
      </div>
    </section>
  );
};

export default EmailSend;
