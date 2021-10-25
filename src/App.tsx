import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./styles/theme";
import Routes from "./routes";
import { ProductsProvider } from "./contexts/useProducts";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ProductsProvider>
          <ChakraProvider resetCSS theme={theme}>
            <Routes />
          </ChakraProvider>
        </ProductsProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
