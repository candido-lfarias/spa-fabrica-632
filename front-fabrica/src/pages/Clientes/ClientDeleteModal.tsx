import "./ClientDeleteModal.css";

interface Cliente {
  id: number;
  nome: string;
}

interface Props {
  isOpen: boolean;
  cliente: Cliente | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ClientDeleteModal({ isOpen, cliente, onConfirm, onCancel }: Props) {
  if (!isOpen) return null;

  return (
    <div className="delete-overlay">
      <div className="delete-modal">
        <h2>Confirmar Exclusão</h2>

        <p>
          Tem certeza que deseja excluir <strong>{cliente?.nome}</strong>?<br />
          Todos os seus dados serão removidos.
        </p>

        <div className="buttons">
          <button className="confirm" onClick={onConfirm}>Excluir</button>
          <button className="cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
