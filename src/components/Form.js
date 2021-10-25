import React, { useState } from "react";

const Form = () => {
  //useState hook for fields
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  //useState hook for submissions. Get from local storage.
  const [submission, setSubmissions] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );

  //useState hook for alert message.
  const [alertMessage, setAlertMessage] = useState(null);

  //Input Event Handler
  const handleInputChange = (e) => {
    //fields name
    const name = e.target.name;
    //fields value
    const value = e.target.value;

    const inputFields = { ...fields };
    inputFields[name] = value;
    setFields(inputFields);
  };

  //Trim fields to eliminate redundant white spaces
  const trimFields = () => {
    const trimmedFields = {};
    Object.keys(fields).map((key) => (trimmedFields[key] = fields[key].trim()));
    setFields(trimmedFields);

    return trimmedFields;
  };

  //Correct Email Regex.
  //Only lowercase letters are allowed.
  //Lowercase letters, followed by '.', lowercase letters, @, lowercase letters and .com
  //Example: abc.abc@gmail.com, blablabla.abc@outlook.com
  const emailRegex = /^[a-z]+\.[a-z]+@[a-z]+\.com$/;

  //Correct Subject Regex
  //Only UPPERCASE letters are allowed. No numbers, no special characters and no lowercase letters are allowed.
  //Example: HI THERE, HELLO, TEST SUBJECT
  const subjectRegex = /^[A-Z ]+$/;

  //Submit event handler
  const handleSubmit = (e) => {
    e.preventDefault();

    //trim fields
    const trimmedFields = trimFields();

    //check if all fields is not empty
    if (
      !trimmedFields.name ||
      !trimmedFields.email ||
      !trimmedFields.subject ||
      !trimmedFields.message
    ) {
      const emptyFieldsMessage = "Please fill in all the necessary fields";
      setAlertMessage(emptyFieldsMessage);
      alert(emptyFieldsMessage);
      //check if the email field pass the email regex validation
    } else if (!emailRegex.test(trimmedFields.email)) {
      const emailFieldsMessage =
        "Invalid email address format (No uppercase letters, no numbers etc..). An example of a correct format: abc.def@abc.com";
      setAlertMessage(emailFieldsMessage);
      alert(emailFieldsMessage);
      //check if the subject field pass the subject regex validation
    } else if (!subjectRegex.test(trimmedFields.subject)) {
      const subjectFieldsMessage =
        "Subject must be filled in UPPER CASE LETTERS only (No numbers, special characters and lower case letters etc..)";
      setAlertMessage(subjectFieldsMessage);
      alert(subjectFieldsMessage);
      //check if the message length has a maximum of 200 characters
    } else if (trimmedFields.message.length > 200) {
      const messageFieldsMessage =
        "Max length of the message is 200 characters.";
      setAlertMessage(messageFieldsMessage);
      alert(messageFieldsMessage);
      //Validation successful. Check passed.
    } else {
      const message = "Validation is successful, data is saved";
      //show success message.
      setAlertMessage(message);
      alert(message);

      //create new variable that consist previous submissions and the latest submission.
      let newSubmission = [...submission, trimmedFields];
      //set the latest data in JSON to local storage.
      localStorage.setItem("data", JSON.stringify(newSubmission));

      //set the submission state with the latest data
      setSubmissions(newSubmission);

      //Reset fields if submission is successful.
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
            <i className="bi bi-person me-2"></i>
            <label htmlFor="name" className="form-label">
              Name
            </label>
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
            <i className="bi bi-envelope me-2"></i>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
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
            <i className="bi bi-bookmark me-2"></i>
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
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
            <i className="bi bi-chat-left-text me-2"></i>
            <label htmlFor="message" className="form-label">
              Message
            </label>
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

          <button htmlFor="submit" type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
