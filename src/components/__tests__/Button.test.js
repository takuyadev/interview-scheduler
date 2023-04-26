import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Button from "components/Button/Button.jsx";

afterEach(cleanup);

it("renders without crashing", () => {
   // 1. Render Button component
   render(<Button />);
});

it("renders its `children` prop as text", () => {
   // 1. Render Button with "Default" as its child
   const { getByText } = render(<Button>Default</Button>);
   // 2. Check if "Default" text is present in the document
   expect(getByText("Default")).toBeInTheDocument();
});

it("renders a default button style", () => {
   // 1. Render Button with "Default" text
   const { getByText } = render(<Button>Default</Button>);
   // 2. Check if button has the "button" class
   expect(getByText("Default")).toHaveClass("button");
});

it("renders a confirm button", () => {
   // 1. Render Button with confirm prop and "Confirm" text
   const { getByText } = render(<Button confirm="true">Confirm</Button>);
   // 2. Check if button has the "button--confirm" class
   expect(getByText("Confirm")).toHaveClass("button--confirm");
});

it("renders a danger button", () => {
   // 1. Render Button with danger prop and "Danger" text
   const { getByText } = render(<Button danger="true">Danger</Button>);
   // 2. Check if button has the "button--danger" class
   expect(getByText("Danger")).toHaveClass("button--danger");
});

it("renders a clickable button", () => {
   // 1. Create a mock handleClick function
   const handleClick = jest.fn();

   // 2. Render Button with onClick prop and "Clickable" text
   const { getByText } = render(<Button onClick={handleClick}>Clickable</Button>);

   // 3. Get the button element
   const button = getByText("Clickable");

   // 4. Simulate a click on the button
   fireEvent.click(button);

   // 5. Check if handleClick has been called once
   expect(handleClick).toHaveBeenCalledTimes(1);
});

it("renders a disabled button", () => {
   // 1. Create a mock handleClick function
   const handleClick = jest.fn();
   // 2. Render Button with disabled and onClick props and "Disabled" text
   const { getByText } = render(
      <Button disabled onClick={handleClick}>
         Disabled
      </Button>
   );

   // 3. Get the button element
   const button = getByText("Disabled");

   // 4. Simulate a click on the button
   fireEvent.click(button);

   // 5. Check if handleClick has not been called
   expect(handleClick).toHaveBeenCalledTimes(0);
});
