import { useEffect, useState } from "react";
import { fornecedoresService } from "../../services/fornecedores";
import type { Fornecedor } from "../../types/fornecedor";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function FornecedoresTable() {
  const [data, setData] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(params.get("page") || 1);
  const q = params.get("q") || "";
  const categoria = params.get("categoria") || "";
  const status = params.get("status") || "";

  const setQuery = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    if (k !== "page") next.set("page", "1"); // resetar pagina ao filtrar/buscar
    setParams(next, { replace:true });
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setErr(null);
        const res = await fornecedoresService.list({ page, limit: 10, q, categoria, status });
        setData(res.data);
      } catch (e: any) { setErr(e.message || "Erro ao carregar."); }
      finally { setLoading(false); }
    })();
  }, [page, q, categoria, status, setParams]);

  const empty = !loading && !err && data.length === 0;

 return (
  <>
    {loading && <p role="status">Carregando...</p>}
    {err && <div role="alert" className="alert alert--error">{err}</div>}
    {empty && <div className="empty">Nenhum fornecedor encontrado.</div>}
    {!loading && !err && data.length>0 && (
      <div className="table-wrapper">
        <table className="table" role="table" aria-label="Tabela de fornecedores">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Contato</th>
              <th>Telefone/E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((f)=>(
              <tr key={f.id}>
                <td>{f.razaoSocial}</td>
                <td>{f.categoria || "-"}</td>
                <td>{f.contatos?.email ? f.contatos.email.split("@")[0] : "-"}</td>
                <td>{[f.contatos?.telefone, f.contatos?.email].filter(Boolean).join(" / ") || "-"}</td>
                <td style={{display:"flex", gap:8}}>
                  <Link className="btn btn--ghost" to={`/fornecedores/${f.id}`} aria-label={`Ver ${f.razaoSocial}`}>Ver</Link>
                  <Link className="btn btn--ghost" to={`/fornecedores/${f.id}/editar`} aria-label={`Editar ${f.razaoSocial}`}>Editar</Link>
                  <Link className="btn btn--danger" to={`/fornecedores/${f.id}/excluir`} aria-label={`Excluir ${f.razaoSocial}`}>Excluir</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </>
);
}