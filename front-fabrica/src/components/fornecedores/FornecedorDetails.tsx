import type { Fornecedor } from "../../types/fornecedor";
export default function FornecedorDetails({ f }: { f: Fornecedor }) {
  return (
    <div className="details">
      <h3>{f.razaoSocial}</h3>
      <p><strong>CNPJ:</strong> {f.cnpj}</p>
      {f.nomeFantasia && <p><strong>Nome Fantasia:</strong> {f.nomeFantasia}</p>}
      {f.inscricaoEstadual && <p><strong>IE:</strong> {f.inscricaoEstadual}</p>}
      {f.categoria && <p><strong>Categoria:</strong> {f.categoria}</p>}
      <p><strong>Status:</strong> {f.status}</p>
      <h4>Contatos</h4>
      <p><strong>Telefone:</strong> {f.contatos?.telefone || "-"}</p>
      <p><strong>E-mail:</strong> {f.contatos?.email || "-"}</p>
      <h4>Endereço</h4>
      <p>{[
        f.endereco?.logradouro, f.endereco?.numero, f.endereco?.bairro,
        f.endereco?.cidade && `${f.endereco.cidade}/${f.endereco?.uf||""}`, f.endereco?.cep
      ].filter(Boolean).join(", ") || "-"}</p>
    </div>
  );
}
