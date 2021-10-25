import { createContext, useState, ReactNode, useContext } from "react";

type Product = {
  name: string;
  provider: string;
  code: number;
  category: string;
  price: string;
  amount: number;
  createdAt: string;
};

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContextData {
  products: Product[];
  createProduct: (product: Product) => Promise<void>;
  removeProduct: (productCode: number) => void;
  updateProduct: (productInput: Product) => void;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>(() => {
    const storagedInventory = localStorage.getItem("@JamesTipDash:inventory");

    if (storagedInventory) {
      return JSON.parse(storagedInventory);
    }

    return [];
  });

  async function createProduct(productInput: Product) {
    const newCart = [...products];
    const verifyProduct = newCart.find(
      (product) => product.code === productInput.code
    );

    if (verifyProduct) {
      console.log("Produto já existe");
    } else {
      newCart.push(productInput);
    }
    setProducts(newCart);
    localStorage.setItem("@JamesTipDash:inventory", JSON.stringify(newCart));
  }

  const updateProduct = (productInput: Product) => {
    const newCart = [...products];
    const productIndex = newCart.findIndex(
      (product) => product.code === productInput.code
    );
    newCart[productIndex] = { ...productInput };

    setProducts(newCart);
    localStorage.setItem("@JamesTipDash:inventory", JSON.stringify(newCart));
  };
  const removeProduct = (productCode: number) => {
    try {
      const newInventory = [...products];
      const productIndex = newInventory.findIndex(
        (product) => product.code === productCode
      );

      if (productIndex >= 0) {
        newInventory.splice(productIndex, 1);
        setProducts(newInventory);
        localStorage.setItem(
          "@JamesTipDash:inventory",
          JSON.stringify(newInventory)
        );
      } else {
        throw Error();
      }
    } catch {
      //   toast.error("Erro na remoção do produto");
    }
  };

  return (
    <ProductsContext.Provider
      value={{ products, createProduct, removeProduct, updateProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextData {
  const context = useContext(ProductsContext);

  return context;
}
