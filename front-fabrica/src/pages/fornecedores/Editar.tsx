import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fornecedoresService } from "../../services/fornecedores";
import FornecedorForm from "../../components/fornecedores/FornecedorForm";
import type { Fornecedor } from "../../types/fornecedor";

export default function EditarFornecedorPage(){
  const { id } = useParams(); const navigate = useNavigate();
  const [data,setData]=useState<Fornecedor|null>(null); const [loading,setLoading]=useState(true); const [err,setErr]=useState<string|null>(null);
  useEffect(()=>{ (async()=>{
    try{ if(!id) return; setData(await fornecedoresService.getById(Number(id))); }
    catch(e:any){ setErr(e.message);} finally{ setLoading(false); }
  })(); },[id]);
  const onSubmit = async (payload:Fornecedor) => {
    if(!id) return; await fornecedoresService.update(Number(id), payload);
    alert("Fornecedor atualizado!"); navigate("/fornecedores");
  };
  if (loading) return <p role="status">Carregando...</p>;
  if (err) return <div role="alert" className="alert alert--error">{err}</div>;
  if (!data) return null;
  return (<main><h2>Editar Fornecedor</h2><FornecedorForm defaultValues={data} onSubmit={onSubmit}/></main>);
}
