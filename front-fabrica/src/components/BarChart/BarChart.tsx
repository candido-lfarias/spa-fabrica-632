import './BarChart.css';

interface BarChartProps {
  heights: number[];
}

export default function BarChart({ heights }: BarChartProps) {
  return (
    <div className="bar-chart">
      {heights.map((height, index) => (
        <div 
          key={index} 
          className="bar" 
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

