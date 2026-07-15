import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <Suspense fallback={null}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            direction: "rtl",
          },
        }}
      />
      <Router />
    </Suspense>
  );
};

export default App;
