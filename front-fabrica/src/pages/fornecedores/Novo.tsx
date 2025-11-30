import PageHero from "../../components/layout/PageHero";
import FornecedorForm from "../../components/fornecedores/FornecedorForm";
import { fornecedoresService } from "../../services/fornecedores";
import { useNavigate } from "react-router-dom";
import type { Fornecedor } from "../../types/fornecedor";

export default function NovoFornecedorPage(){
  const navigate = useNavigate();

  async function handleSubmit(data: Fornecedor){
    await fornecedoresService.create(data); // se estiver usando a fake API
    navigate("/fornecedores");              // feedback depois podemos trocar por toast
  }

  return (
    <>
      <PageHero title="CADASTRAR FORNECEDOR" />
      <div className="page">
        <div className="card">
          <FornecedorForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
