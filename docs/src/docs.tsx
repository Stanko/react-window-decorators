import React, { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Demo from "./demo";

const container = document.getElementById("demo") as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Demo />
  </StrictMode>
);
