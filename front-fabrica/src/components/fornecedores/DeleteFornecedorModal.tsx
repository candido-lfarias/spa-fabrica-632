export default function DeleteFornecedorModal({ open, onClose, onConfirm, title, message }:{
  open:boolean; onClose:()=>void; onConfirm:()=>void; title?:string; message?:string;
}) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="modal">
      <div className="modal__content">
        <h3>{title || "Confirmar exclusão"}</h3>
        <p>{message || "Tem certeza que deseja excluir?"}</p>
        <div className="modal__actions">
          <button className="btn" onClick={onClose} autoFocus>Cancelar</button>
          <button className="btn btn--danger" onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  );
}
