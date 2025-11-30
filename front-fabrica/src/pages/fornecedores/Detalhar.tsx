import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fornecedoresService } from "../../services/fornecedores";
import FornecedorDetails from "../../components/fornecedores/FornecedorDetails";
import type { Fornecedor } from "../../types/fornecedor";

export default function DetalharFornecedorPage(){
  const { id } = useParams();
  const [data,setData]=useState<Fornecedor|null>(null); const [loading,setLoading]=useState(true); const [err,setErr]=useState<string|null>(null);
  useEffect(()=>{ (async()=>{ try{ if(!id) return; setData(await fornecedoresService.getById(Number(id))); }
  catch(e:any){ setErr(e.message);} finally{ setLoading(false);} })(); },[id]);
  if (loading) return <p role="status">Carregando...</p>;
  if (err) return <div role="alert" className="alert alert--error">{err}</div>;
  if (!data) return null;
  return (
    <main>
      <div className="card__header">
        <h2>Detalhes do Fornecedor</h2>
        <div className="actions">
          <Link className="btn" to={`/fornecedores/${id}/editar`}>Editar</Link>
          <Link className="btn btn--danger" to={`/fornecedores/${id}/excluir`}>Excluir</Link>
        </div>
      </div>
      <FornecedorDetails f={data}/>
    </main>
  );
}
