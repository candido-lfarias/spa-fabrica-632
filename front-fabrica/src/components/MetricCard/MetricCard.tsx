import './MetricCard.css';

interface MetricCardProps {
  value: string;
  label: string;
  isRisk?: boolean;
  riskTitle?: string;
  riskIcon?: React.ReactNode;
}

export default function MetricCard({ 
  value, 
  label, 
  isRisk = false, 
  riskTitle,
  riskIcon 
}: MetricCardProps) {
  if (isRisk) {
    return (
      <div className="metric-card risk-card">
        <div className="risk-header">
          <span className="risk-title">{riskTitle}</span>
        </div>
        <div className="risk-content">
          <span className="risk-value">{value}</span>
          {riskIcon}
        </div>
      </div>
    );
  }

  return (
    <div className="metric-card">
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
    </div>
  );
}

