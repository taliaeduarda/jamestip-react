import { createServer, Model, Factory } from "miragejs";
import faker from "faker";

type Product = {
  name: string;
  provider: string;
  code: number;
  category: string;
  price: string;
  amount: number;
};

export function makeServer() {
  const server = createServer({
    models: {
      product: Model.extend<Partial<Product>>({}),
    },

    factories: {
      product: Factory.extend({
        name() {
          return faker.commerce.productName();
        },
        provider() {
          return faker.company.companyName();
        },
        code() {
          return faker.datatype.number();
        },
        category() {
          return faker.commerce.productMaterial();
        },
        price() {
          return faker.commerce.price();
        },
        amount() {
          return faker.datatype.number();
        },
      }),
    },

    seeds(server) {
      server.createList("product", 5);
    },
    routes() {
      this.namespace = "api";

      this.get("/products", (schema) => {
        return schema.all("product");
      });

      this.get('/products/:id');
      
      this.post("products", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);

        return schema.create("product", attrs);
      });

      this.namespace = "";
      this.passthrough();
    },
  });
  return server;
}
