import "@testing-library/jest-dom";

// ✅ Mock VIRTUAL de react-router-dom (no requiere que exista/sea resoluble en Jest)
jest.mock(
  "react-router-dom",
  () => ({
    __esModule: true,
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ children }) => <div>{children}</div>,
    Navigate: () => null,
    Link: ({ children }) => <span>{children}</span>,
    useNavigate: () => jest.fn(),
    useParams: () => ({}),
  }),
  { virtual: true }
);

// ✅ Mock GLOBAL del api para que Jest NO importe axios nunca
jest.mock(
  "./api/api",
  () => ({
    __esModule: true,
    default: {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
  }),
  { virtual: true }
);
