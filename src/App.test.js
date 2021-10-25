import { render, screen, fireEvent, getByText } from "@testing-library/react";
import App from "./App";
import Form from "./components/Form";

beforeEach(() => {
  const formApp = render(<Form />);
});

//defined the window.alert as a jest spy.
window.alert = jest.fn();

test("Empty name and email input fields and submit test", () => {
  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email address");
  const subjectInput = screen.getByLabelText("Subject");
  const messageInput = screen.getByLabelText("Message");
  const button = screen.getByText("Submit");

  // Simulate input.
  fireEvent.change(subjectInput, { target: { value: "TEST SUBJECT" } });
  fireEvent.change(messageInput, {
    target: { value: "This is a test message." },
  });
  expect(nameInput.value).toBe("");
  expect(emailInput.value).toBe("");
  expect(subjectInput.value).toBe("TEST SUBJECT");
  expect(messageInput.value).toBe("This is a test message.");

  // Simulate click.
  fireEvent.click(button);

  //clear window alert
  window.alert.mockClear();

  const emptyMessage = screen.getByText(
    "Please fill in all the necessary fields"
  );

  expect(emptyMessage).toBeInTheDocument();
});

test("Invalid email input format and submit test", () => {
  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email address");
  const subjectInput = screen.getByLabelText("Subject");
  const messageInput = screen.getByLabelText("Message");
  const button = screen.getByText("Submit");

  // Simulate input.
  fireEvent.change(nameInput, { target: { value: "User 1" } });
  fireEvent.change(emailInput, {
    target: { value: "User1@gmail.com" },
  });
  fireEvent.change(subjectInput, { target: { value: "TEST SUBJECT" } });
  fireEvent.change(messageInput, {
    target: { value: "This is a test message." },
  });

  expect(nameInput.value).toBe("User 1");
  expect(emailInput.value).toBe("User1@gmail.com");
  expect(subjectInput.value).toBe("TEST SUBJECT");
  expect(messageInput.value).toBe("This is a test message.");

  const emailRegex = /^[a-z]+\.[a-z]+@[a-z]+\.com$/;
  expect("abc.def@abc.com").toMatch(emailRegex);

  expect(emailInput.value).not.toMatch(emailRegex);

  // Simulate click.
  fireEvent.click(button);

  //clear window alert
  window.alert.mockClear();

  const invalidEmailMessage = screen.getByText(
    "Invalid email address format (No uppercase letters, no numbers etc..). An example of a correct format: abc.def@abc.com"
  );

  expect(invalidEmailMessage).toBeInTheDocument();
});
