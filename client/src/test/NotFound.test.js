import { render, screen } from "@testing-library/react";
import NotFound from "../pages/NotFound"
import '@testing-library/jest-dom'

test("renders share input hint", () => {
  render(<NotFound />);
  expect(screen.getByText("NotFound")).toBeInTheDocument();
});
