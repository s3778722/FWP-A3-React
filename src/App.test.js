import { render, screen, fireEvent, getByText } from "@testing-library/react";
import Form from "./components/Form";

//before each test
beforeEach(() => {
  //render the form component
  const formApp = render(<Form />);
});

//defined the window.alert as a jest spy because an alert message box is used in the form component
window.alert = jest.fn();

//To test if empty fields of name and input fields will provide an empty field alert error.
test("Empty name and email input fields and submit test", () => {
  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email address");
  const subjectInput = screen.getByLabelText("Subject");
  const messageInput = screen.getByLabelText("Message");
  const button = screen.getByText("Submit");

  //Simulate input for both subject and message fields..
  fireEvent.change(subjectInput, { target: { value: "TEST SUBJECT" } });
  fireEvent.change(messageInput, {
    target: { value: "This is a test message." },
  });

  //Expect name and email fields input to be empty.
  expect(nameInput.value).toBe("");
  expect(emailInput.value).toBe("");
  expect(subjectInput.value).toBe("TEST SUBJECT");
  expect(messageInput.value).toBe("This is a test message.");

  //Simulate click.
  fireEvent.click(button);

  //Clear window alert
  window.alert.mockClear();

  //Find the text
  const emptyMessage = screen.getByText(
    "Please fill in all the necessary fields"
  );
  //Expect the Empty Fields Error message to appear.
  expect(emptyMessage).toBeInTheDocument();
});

//To test if an invalid email input will provide an invalid email format alert error.
test("Invalid email input format and submit test", () => {
  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email address");
  const subjectInput = screen.getByLabelText("Subject");
  const messageInput = screen.getByLabelText("Message");
  const button = screen.getByText("Submit");

  // Simulate input.
  fireEvent.change(nameInput, { target: { value: "User 1" } });
  //Incorrect input for the email field is entered with an Uppercase letter and Number without a 'dot' in the middle before @
  fireEvent.change(emailInput, {
    target: { value: "User1@gmail.com" },
  });
  fireEvent.change(subjectInput, { target: { value: "TEST SUBJECT" } });
  fireEvent.change(messageInput, {
    target: { value: "This is a test message." },
  });

  //Expect all fields to be the same as input value.
  expect(nameInput.value).toBe("User 1");
  expect(emailInput.value).toBe("User1@gmail.com");
  expect(subjectInput.value).toBe("TEST SUBJECT");
  expect(messageInput.value).toBe("This is a test message.");

  //Correct Email Regex
  const emailRegex = /^[a-z]+\.[a-z]+@[a-z]+\.com$/;
  //Test with a sample correct email addrest with the Regex
  expect("abc.def@abc.com").toMatch(emailRegex);

  //Test the invalid email input we provided
  expect(emailInput.value).not.toMatch(emailRegex);

  // Simulate click.
  fireEvent.click(button);

  //clear window alert
  window.alert.mockClear();

  //Find error message
  const invalidEmailMessage = screen.getByText(
    "Invalid email address format (No uppercase letters, no numbers etc..). An example of a correct format: abc.def@abc.com"
  );
  //Expect the Invalid Email Error message to appear.
  expect(invalidEmailMessage).toBeInTheDocument();
});
