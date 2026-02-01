import { MockedProvider } from "@apollo/client/testing/react";
import { mocks } from "./mocks";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function App() {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <RouterProvider router={router} />
    </MockedProvider>
  );
}
