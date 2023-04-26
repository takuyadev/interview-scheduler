import React from "react";
import { render, cleanup } from "@testing-library/react";
import DayListItem from "components/DayList/DayListItem.jsx";

afterEach(cleanup);

it("renders without crashing", () => {
   // 1. Render DayListItem component
   render(<DayListItem />);
});

it("renders 'no spots remaining' when there are 0 spots", () => {
   // 1. Render DayListItem with name "Monday" and 0 spots
   const { getByText } = render(<DayListItem name="Monday" spots={0} />);
   // 2. Check if "no spots remaining" text is present in the document
   expect(getByText("no spots remaining")).toBeInTheDocument();
});

it("renders '1 spot remaining' when there is 1 spot", () => {
   // 1. Render DayListItem with name "Monday" and 1 spot
   const { getByText } = render(<DayListItem name="Monday" spots={1} />);
   // 2. Check if "1 spot remaining" text is present in the document
   expect(getByText("1 spot remaining")).toBeInTheDocument();
});

it("renders '2 spots remaining' when there are 2 spots", () => {
   // 1. Render DayListItem with name "Monday" and 2 spots
   const { getByText } = render(<DayListItem name="Monday" spots={2} />);
   // 2. Check if "2 spots remaining" text is present in the document
   expect(getByText("2 spots remaining")).toBeInTheDocument();
});
