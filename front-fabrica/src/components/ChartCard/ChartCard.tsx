import './ChartCard.css';

interface ChartCardProps {
  title: string;
  value: string;
  trend?: string;
  children?: React.ReactNode;
}

export default function ChartCard({ title, value, trend, children }: ChartCardProps) {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="chart-value">{value}</div>
      </div>
      {trend && <div className="trend-indicator">{trend}</div>}
      <div className="chart-container">
        {children}
      </div>
    </div>
  );
}

