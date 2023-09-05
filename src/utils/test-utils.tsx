import { render as rtlRender } from "@testing-library/react";
import React, { ReactElement } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export const mockUseRouter = {
  route: "/",
  pathname: "",
  query: "",
  asPath: "",
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  prefetch: jest.fn(() => null),
};

const render = (ui: ReactElement, isLogin: boolean = true) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });

  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      id: "1",
      name: "MockUserName",
      email: "mock@email.com",
      accessToken: "accessTokenMock",
      refreshToken: "refreshTokenMock",
      accessTokenExpires: Date.now() + 1000 * 1000,
    },
  };

  const Wrapper = ({ children }: { children: React.ReactElement }) => (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={null}>
        <SessionProvider session={isLogin ? mockSession : null}>
          {children}
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );

  return {
    ...rtlRender(ui, { wrapper: Wrapper }),
  };
};

export * from "@testing-library/react";
export { render };
