import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="stat-card">
      {icon && <div className="card-icon">{icon}</div>}
      <h2>{title}</h2>
      <p className="stat-value">{value}</p>
    </div>
  );
}

