import './Compras.css';
import '../../App.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import InternalNavbar from '../../components/InternalNavbar/InternalNavbar';
import MetricCard from '../../components/MetricCard/MetricCard';
import ChartCard from '../../components/ChartCard/ChartCard';
import BarChart from '../../components/BarChart/BarChart';
import AlertsTable from '../../components/AlertsTable/AlertsTable';

export default function Compras() {
  const navItems = [
    { path: '/', label: 'DASHBOARD' },
    { path: '/compras', label: 'COMPRAS' },
    { path: '/estoque', label: 'ESTOQUE' },
    { path: '/cadastro', label: 'CADASTRO' },
  ];

  const alerts = [
    { id: 'exemplo', fornecedor: 'exemplo', entregaEstimada: '09/04/2025', status: 'atrasado', statusType: 'atrasado' as const },
    { id: 'exemplo', fornecedor: 'exemplo', entregaEstimada: '09/04/2025', status: 'atrasado', statusType: 'atrasado' as const },
    { id: 'exemplo', fornecedor: 'exemplo', entregaEstimada: '09/04/2025', status: 'atrasado', statusType: 'atrasado' as const },
  ];

  return (
    <div className="compras-container">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="compras-content">
          <InternalNavbar items={navItems} />

          <div className="metrics-row">
            <MetricCard value="5 PCs" label="em aberto" />
            <MetricCard value="R$ 120.000,00" label="valor em compras" />
            <MetricCard
              value="5 itens"
              label=""
              isRisk={true}
              riskTitle="ITENS EM RISCO DE RUPTURA"
              riskIcon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#d32f2f">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
              }
            />
            <button className="btn-nova-compra">Nova compra</button>
          </div>

          <div className="insights-section">
            <h2 className="section-title">INSIGHTS DE COMPRA</h2>
            <div className="charts-row">
              <ChartCard
                title="Top 10 produtos comprados"
                value="R$ 125,00"
                trend="Esse mês +10%"
              >
                <BarChart heights={[60, 80, 45, 90, 70, 55]} />
              </ChartCard>
              <ChartCard
                title="Compras por fornecedores"
                value="R$ 125,00"
                trend="Esse mês +10%"
              >
                <BarChart heights={[50, 75, 65, 85, 40, 70]} />
              </ChartCard>
            </div>
          </div>

          <AlertsTable
            alerts={alerts}
            title="ALERTAS"
            subtitle="Ordenados pela ultima entrega"
          />
        </div>
      </div>
    </div>
  );
}

