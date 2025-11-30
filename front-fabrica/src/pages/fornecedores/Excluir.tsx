import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteFornecedorModal from "../../components/fornecedores/DeleteFornecedorModal";
import { fornecedoresService } from "../../services/fornecedores";
import type { Fornecedor } from "../../types/fornecedor";

export default function ExcluirFornecedorPage(){
  const { id } = useParams(); const navigate = useNavigate();
  const [open,setOpen] = useState(true); const [fornecedor,setFornecedor]=useState<Fornecedor|null>(null);
  useEffect(()=>{ (async()=>{ if(!id) return; try{ setFornecedor(await fornecedoresService.getById(Number(id))); }
  catch{ navigate("/fornecedores"); } })(); },[id,navigate]);
  const confirm = async () => { if(!id) return; await fornecedoresService.remove(Number(id)); alert("Fornecedor excluído!"); navigate("/fornecedores"); };
  return <DeleteFornecedorModal open={open} onClose={()=>navigate(-1)} onConfirm={confirm} title="Excluir fornecedor" message={`Excluir "${fornecedor?.razaoSocial||"este fornecedor"}"?`}/>;
}
