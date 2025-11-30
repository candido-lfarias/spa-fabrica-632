import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import ListarFornecedoresPage from "./pages/fornecedores/Listar";
import NovoFornecedorPage from "./pages/fornecedores/Novo";
import EditarFornecedorPage from "./pages/fornecedores/Editar";
import DetalharFornecedorPage from "./pages/fornecedores/Detalhar";
import ExcluirFornecedorPage from "./pages/fornecedores/Excluir";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // rotas relativas ao "/"
      { path: "fornecedores", element: <ListarFornecedoresPage /> },
      { path: "fornecedores/novo", element: <NovoFornecedorPage /> },
      { path: "fornecedores/:id", element: <DetalharFornecedorPage /> },
      { path: "fornecedores/:id/editar", element: <EditarFornecedorPage /> },
      { path: "fornecedores/:id/excluir", element: <ExcluirFornecedorPage /> },
    ],
  },
]);
