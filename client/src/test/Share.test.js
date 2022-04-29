import { render, screen } from "@testing-library/react";
import Share from "../components/Share"
import { MemoryRouter } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
enableFetchMocks()

fetch.mockResponse(
  JSON.stringify({ 
    location: null,
    id: '123',
    auth0Id: '123',
    email: 'wqa@gmail.com',
    username: 'qiuan.wuu',
    picture: ''
  })
);


test("renders share button", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Share />
    </MemoryRouter>
  )
  expect(screen.getByText("Share")).toBeInTheDocument();
});


test("renders empty input onclick button", () => {
  const alertMock = jest.spyOn(window,'alert'); 
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Share />
    </MemoryRouter>
  )
  const shareButton = screen.getByText("Share");
  userEvent.click(shareButton);
  expect(alertMock).toHaveBeenCalledTimes(1);

});