import './AlertsTable.css';

interface Alert {
  id: string;
  fornecedor: string;
  entregaEstimada: string;
  status: string;
  statusType?: 'atrasado' | 'pendente' | 'entregue';
}

interface AlertsTableProps {
  alerts: Alert[];
  title?: string;
  subtitle?: string;
}

export default function AlertsTable({ 
  alerts, 
  title = 'ALERTAS',
  subtitle 
}: AlertsTableProps) {
  return (
    <div className="alerts-section">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <table className="alerts-table">
        <thead>
          <tr>
            <th>id</th>
            <th>fornecedor</th>
            <th>Entrega estimada</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, index) => (
            <tr key={index}>
              <td>{alert.id}</td>
              <td>{alert.fornecedor}</td>
              <td>{alert.entregaEstimada}</td>
              <td>
                <span className={`status-badge ${alert.statusType || 'atrasado'}`}>
                  {alert.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

