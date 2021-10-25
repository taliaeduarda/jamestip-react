import * as yup from "yup";

const createProductFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  code: yup.number().required().positive().integer(),
  price: yup.string().required("Informe um valor"),
  amount: yup.number().required().positive().integer(),
  provider: yup.string().required("Campo obrigatório"),
  category: yup.string().required("Selecione uma categoria"),
});

export default createProductFormSchema;
