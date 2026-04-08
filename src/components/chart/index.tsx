import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

const options: ApexOptions = {
  labels: ["Income", "Expense"],
  colors: ["#213ebf", "#FD5E53"],
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
};

export default function TransactionChartSummary({ expense = 100, income = 100 }: { expense?: number; income?: number }) {
  return (
    <Chart
      options={options}
      series={[income, expense]}
      type="pie"
      width="100%"
      height="100%"
    />
  )
}
