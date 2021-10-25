import React, { useState } from "react";

const Form = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submission, setSubmissions] = useState(
    localStorage.getItem("data") || []
  );
  const [alertMessage, setAlertMessage] = useState(null);

  const handleInputChange = (e) => {
    //fields name
    const name = e.target.name;
    //fields value
    const value = e.target.value;

    const inputFields = { ...fields };
    inputFields[name] = value;
    setFields(inputFields);
  };

  const trimFields = () => {
    const trimmedFields = {};
    Object.keys(fields).map((key) => (trimmedFields[key] = fields[key].trim()));
    setFields(trimmedFields);

    return trimmedFields;
  };

  const emailRegex = /^[a-z]+\.[a-z]+@[a-z]+\.com$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    //if no users in users record, show error message

    const trimmedFields = trimFields();

    if (
      !trimmedFields.name ||
      !trimmedFields.email ||
      !trimmedFields.subject ||
      !trimmedFields.message
    ) {
      const emptyFieldsMessage = "Please fill in all the necessary fields";
      setAlertMessage(emptyFieldsMessage);
      alert(emptyFieldsMessage);
    } else {
      //login is verified
      const message = "Validation is successful, data is saved";
      setAlertMessage(message);
      alert(message);
      let newSubmission = [...submission, trimmedFields];
      //set the current user on local storage
      localStorage.setItem("data", JSON.stringify(newSubmission));
      setSubmissions(newSubmission);

      const inputFields = { ...fields };
      const keys = Object.keys(inputFields);
      keys.forEach((key) => {
        inputFields[key] = "";
      });
      setFields(inputFields);
    }
  };

  return (
    <div>
      <div className="container px-5 py-5 ">
        {alertMessage !== null && (
          <div className="alert alert-warning" role="alert">
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Please enter your name"
              onChange={handleInputChange}
              value={fields.name}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Please enter your email address"
              onChange={handleInputChange}
              value={fields.email}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              placeholder="Subject"
              onChange={handleInputChange}
              value={fields.subject}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              rows="4"
              cols="50"
              placeholder="Your message..."
              onChange={handleInputChange}
              value={fields.message}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
