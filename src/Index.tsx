import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;

const root = ReactDOM.createRoot(rootElement);

// root에 App 컴포넌트 렌더링
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
