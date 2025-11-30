import { useEffect, useState } from "react";
import type { Fornecedor } from "../../types/fornecedor";
import { maskCEP, maskCNPJ, maskTelefoneBR } from "../../utils/masks";
import { validarCNPJ } from "../../utils/validateCNPJ";

type Errors = Record<string, string>;

export default function FornecedorForm({
  defaultValues,
  onSubmit,
  submitting,
}: {
  defaultValues?: Fornecedor;
  onSubmit: (d: Fornecedor) => Promise<void> | void;
  submitting?: boolean;
}) {
  const [form, setForm] = useState<Fornecedor>({
    razaoSocial: "",
    cnpj: "",
    status: "Ativo",
    ...defaultValues,
  });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (defaultValues) setForm((prev) => ({ ...prev, ...defaultValues }));
  }, [defaultValues]);

  const setField = (path: string, value: string) => {
    setForm((prev) => {
      const clone: any = structuredClone(prev);
      const keys = path.split(".");
      let ref = clone;
      for (let i = 0; i < keys.length - 1; i++) ref = (ref[keys[i]] ||= {});
      ref[keys.at(-1)!] = value;
      return clone;
    });
  };

  const validate = () => {
    const e: Errors = {};
    if (!form.razaoSocial?.trim()) e["razaoSocial"] = "Razão Social é obrigatória.";
    if (!form.cnpj?.trim()) e["cnpj"] = "CNPJ é obrigatório.";
    else if (!validarCNPJ(form.cnpj)) e["cnpj"] = "CNPJ inválido.";

    if (form.endereco?.cep) {
      const dig = form.endereco.cep.replace(/\D/g, "");
      if (dig.length !== 8) e["endereco.cep"] = "CEP deve ter 8 dígitos.";
    }

    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) (document.querySelector(`[data-err="${first}"]`) as HTMLElement | null)?.focus();
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    // normaliza pequenos detalhes antes de enviar
    const payload: Fornecedor = {
      ...form,
      razaoSocial: form.razaoSocial?.trim(),
      cnpj: form.cnpj,
      endereco: {
        ...form.endereco,
        uf: form.endereco?.uf?.toUpperCase().slice(0, 2),
      },
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={submit} aria-describedby="form-help">
      {/* Identificação */}
      <fieldset className="card">
        <legend>Identificação</legend>
        <div className="form-grid">
          <label>
            Razão Social*
            <input
              data-err="razaoSocial"
              value={form.razaoSocial || ""}
              onChange={(e) => setField("razaoSocial", e.target.value)}
              onBlur={(e) => setField("razaoSocial", e.target.value.trim())}
              placeholder="Ex.: Café Bom Sabor LTDA"
              autoComplete="organization"
              aria-invalid={!!errors["razaoSocial"]}
              aria-describedby={errors["razaoSocial"] ? "err-razao" : undefined}
              required
            />
            {errors["razaoSocial"] && (
              <small id="err-razao" role="alert" className="form-error">
                {errors["razaoSocial"]}
              </small>
            )}
          </label>

          <label>
            CNPJ*
            <input
              data-err="cnpj"
              value={form.cnpj || ""}
              onChange={(e) => setField("cnpj", maskCNPJ(e.target.value))}
              placeholder="00.000.000/0001-00"
              inputMode="numeric"
              autoComplete="off"
              aria-invalid={!!errors["cnpj"]}
              aria-describedby={errors["cnpj"] ? "err-cnpj" : undefined}
              required
            />
            {errors["cnpj"] && (
              <small id="err-cnpj" role="alert" className="form-error">
                {errors["cnpj"]}
              </small>
            )}
          </label>

          <label>
            Nome Fantasia
            <input
              value={form.nomeFantasia || ""}
              onChange={(e) => setField("nomeFantasia", e.target.value)}
              placeholder="Ex.: Bom Sabor"
              autoComplete="organization-title"
            />
          </label>

          <label>
            Inscrição Estadual
            <input
              value={form.inscricaoEstadual || ""}
              onChange={(e) => setField("inscricaoEstadual", e.target.value)}
              placeholder="Ex.: 123456789"
              autoComplete="off"
            />
          </label>

          <label>
            Categoria
            <input
              value={form.categoria || ""}
              onChange={(e) => setField("categoria", e.target.value)}
              placeholder="Ex.: Matéria-prima, Ingredientes, Embalagens"
            />
          </label>

          <label>
            Status
            <select
              value={form.status}
              onChange={(e) => setField("status", e.target.value)}
              aria-label="Status do fornecedor"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </label>
        </div>
      </fieldset>

      {/* Contatos */}
      <fieldset className="card">
        <legend>Contatos</legend>
        <div className="form-grid">
          <label>
            Telefone
            <input
              value={form.contatos?.telefone || ""}
              onChange={(e) => setField("contatos.telefone", maskTelefoneBR(e.target.value))}
              placeholder="(11) 91234-5678"
              inputMode="tel"
              autoComplete="tel"
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              value={form.contatos?.email || ""}
              onChange={(e) => setField("contatos.email", e.target.value)}
              placeholder="contato@fornecedor.com"
              autoComplete="email"
            />
          </label>
        </div>
      </fieldset>

      {/* Endereço */}
      <fieldset className="card">
        <legend>Endereço</legend>
        <div className="form-grid">
          <label>
            CEP
            <input
              data-err="endereco.cep"
              value={form.endereco?.cep || ""}
              onChange={(e) => setField("endereco.cep", maskCEP(e.target.value))}
              placeholder="00000-000"
              inputMode="numeric"
              autoComplete="postal-code"
              aria-invalid={!!errors["endereco.cep"]}
              aria-describedby={errors["endereco.cep"] ? "err-cep" : undefined}
            />
            {errors["endereco.cep"] && (
              <small id="err-cep" role="alert" className="form-error">
                {errors["endereco.cep"]}
              </small>
            )}
          </label>

          <label>
            Logradouro
            <input
              value={form.endereco?.logradouro || ""}
              onChange={(e) => setField("endereco.logradouro", e.target.value)}
              placeholder="Rua / Avenida"
              autoComplete="address-line1"
            />
          </label>

          <label>
            Número
            <input
              value={form.endereco?.numero || ""}
              onChange={(e) => setField("endereco.numero", e.target.value)}
              placeholder="Ex.: 123"
              inputMode="numeric"
              autoComplete="address-line2"
            />
          </label>

          <label>
            Bairro
            <input
              value={form.endereco?.bairro || ""}
              onChange={(e) => setField("endereco.bairro", e.target.value)}
              placeholder="Ex.: Centro"
              autoComplete="address-level3"
            />
          </label>

          <label>
            Cidade
            <input
              value={form.endereco?.cidade || ""}
              onChange={(e) => setField("endereco.cidade", e.target.value)}
              placeholder="Ex.: Taquara"
              autoComplete="address-level2"
            />
          </label>

          <label>
            UF
            <input
              value={form.endereco?.uf || ""}
              onChange={(e) =>
                setField("endereco.uf", e.target.value.toUpperCase().slice(0, 2))
              }
              placeholder="RS"
              maxLength={2}
              autoComplete="address-level1"
            />
          </label>
        </div>
      </fieldset>

      <div className="form__actions">
        <button
          className="btn btn--primary"
          type="submit"
          disabled={!!submitting}
          aria-busy={!!submitting}
        >
          {submitting ? "Salvando..." : "Salvar"}
        </button>
      </div>

      <small id="form-help">Campos com * são obrigatórios.</small>
    </form>
  );
}
