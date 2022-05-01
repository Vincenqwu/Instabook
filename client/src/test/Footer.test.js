import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../components/Footer";
import "@testing-library/jest-dom";

// let mockIsAuthenticated = false;

// jest.mock("@auth0/auth0-react", () => ({
//   ...jest.requireActual("@auth0/auth0-react"),
//   Auth0Provider: ({ children }) => children,
//   useAuth0: () => {
//     return {
//       isLoading: false,
//       user: {
//         sub: "subId",
//         name: "cristian",
//         email: "cris@gmail.com",
//         email_verified: true,
//       },
//       isAuthenticated: mockIsAuthenticated,
//       loginWithRedirect: jest.fn(),
//     };
//   },
// }));

test("renders Footer", () => {
  render(<Footer />);

  //organization part
  expect(screen.getByText("organization")).toBeInTheDocument();
  expect(screen.getByText("about us")).toBeInTheDocument();
  expect(screen.getByText("our projects")).toBeInTheDocument();
  expect(screen.getByText("MSCS Program")).toBeInTheDocument();

  //Technologies
  expect(screen.getByText("Technologies")).toBeInTheDocument();
  expect(screen.getByText("Node.js")).toBeInTheDocument();
  expect(screen.getByText("React")).toBeInTheDocument();
  expect(screen.getByText("MongoDB")).toBeInTheDocument();
  expect(screen.getByText("Auth0")).toBeInTheDocument();

  //Contact part
  expect(screen.getByText("Contact")).toBeInTheDocument();
  expect(
    screen.getByText("410 W Georgia St #1400, Vancouver, BC V6B 1Z3")
  ).toBeInTheDocument();
  expect(screen.getByText("info@northeastern.edu")).toBeInTheDocument();
  expect(screen.getByText("follow us")).toBeInTheDocument();
});
