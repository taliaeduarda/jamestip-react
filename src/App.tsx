import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./styles/theme";
import Routes from "./routes";
import { ProductsProvider } from "./contexts/useProducts";
import { AuthContextProvider } from "./contexts/AuthContext";

import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <ProductsProvider>
            <ChakraProvider resetCSS theme={theme}>
              <Routes />
            </ChakraProvider>
          </ProductsProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
