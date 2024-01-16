<template>
    <div>
        <div class="card custom-body mt-2 me-2">
            <div class="card-body">

                <div class="row">
                    <div class="col-md-4">
                        <div class="card ">
                            <div class="card-body">
                                this is a total sales (P{{ totalSales.totalSales }})
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                Total Products Available ({{ totalProducts.totalProducts }})
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                Total Products Out of Stocks ({{ OutofStocks.OutofStocks }})
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mt-2">
                        <div class="card">
                            <div class="card-body">
                                Registered Users ({{ registeredUsers.registeredUsers }})
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-2">
                        <div class="card">
                            <div class="card-body">
                                monthly Sales Summary 
                                <canvas class="barMonthly2" style="width: 100px; height: 40px;"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-2">
                        <div class="card">
                            <div class="card-header">
                                Weekly Sales Summary Week(
                {{ getCurrentWeekInMonth() }}
                )
                            </div>
                            <div class="card-body">
                                <canvas class="barWeekly2" style="width: 100px; height: 40px;"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AuthenticationService from '@/service/AuthenticationService';
import Chart from 'chart.js/auto';

const totalSales = ref([]);
const totalProducts = ref([]);
const OutofStocks = ref([]);
const registeredUsers = ref([]);


const getCurrentWeekInMonth = () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  const daysInFirstWeek = 7 - firstDayOfMonth.getDay() - 1;
  const daysInMonth = Math.floor((currentDate - firstDayOfMonth) / (24 * 60 * 60 * 1000));
  const currentWeek = Math.ceil((daysInMonth + daysInFirstWeek) / 7);

  return currentWeek;
};
const updateMonthly = (barChartMonthlyLabels,barChartMonthlyData) =>{
    const barMonthlydata = {
          labels: barChartMonthlyLabels,
          datasets: [
            {
              label: 'Monthly Sales',
              data: barChartMonthlyData,
              borderColor: ' #33fa6f',
              backgroundColor: ' #33fa6f',
              fill: false,
            },
          ],
        };

        const barMonthlyconfig = {
          type: 'bar',
          data: barMonthlydata,
          options: {
            responsive: true,
          },
        };

        let bar = document.querySelector('.barMonthly2');

        if (bar) {
          let existingChartViolation = Chart.getChart(bar);

          if (existingChartViolation) {
            existingChartViolation.destroy();
          }

          new Chart(bar, barMonthlyconfig);
        } else {
          console.error(`Error Bar Data`);
        }
}
const updateChart = (barChartLabels,barChartData) => {
        const barWeeklydata = {
          labels: barChartLabels,
          datasets: [
            {
              label: 'Weekly Sales',
              data: barChartData,
              borderColor: ' #07c4fb',
              backgroundColor: '#07c4fb',
              fill: false,
            },
          ],
        };

        const barWeeklyconfig = {
          type: 'bar',
          data: barWeeklydata,
          options: {
            responsive: true,
          },
        };

        let bar = document.querySelector('.barWeekly2');

        if (bar) {
          let existingChartViolation = Chart.getChart(bar);

          if (existingChartViolation) {
            existingChartViolation.destroy();
          }

          new Chart(bar, barWeeklyconfig);
        } else {
          console.error(`Error Bar Data`);
        }
      };

const getISOWeek = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};
const getMonthYear = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

const getAllSummary = async () => {
  try {
    const response = await AuthenticationService.getAllSummary();
    if (response) {
      totalSales.value = response.data.totalSales;
      totalProducts.value = response.data.totalProducts;
      OutofStocks.value = response.data.OutofStocks;
      registeredUsers.value = response.data.registeredUsers;

      const weeklySalesData = response.data.products.reduce((acc, sale) => {
  const updatedDate = new Date(sale.updated);
  const weekNumber = getISOWeek(updatedDate);

  // Check if the week is already in the accumulator
  const existingWeek = acc.find((item) => item.week === weekNumber);

  if (existingWeek) {
    // If the week exists, update the sales
    existingWeek.sales += parseFloat(sale.price);
  } else {
    // If the week doesn't exist, add a new entry
    acc.push({ week: weekNumber, sales: parseFloat(sale.price) });
  }

  return acc;
}, []);
console.log(weeklySalesData)
const barChartLabels = weeklySalesData.map((item) => `Week ${item.week}`);
const barChartData = weeklySalesData.map((item) => item.sales);

console.log(barChartLabels);
console.log(barChartData);

      
      updateChart(barChartLabels,barChartData);

      const monthlySalesData = response.data.products.reduce((acc, sale) => {
  const updatedDate = new Date(sale.updated);
  const monthYear = getMonthYear(updatedDate);

  // Check if the monthYear is already in the accumulator
  const existingMonth = acc.find((item) => item.monthYear === monthYear);

  if (existingMonth) {
    // If the monthYear exists, update the sales
    existingMonth.sales += parseFloat(sale.price);
  } else {
    // If the monthYear doesn't exist, add a new entry
    acc.push({ monthYear, sales: parseFloat(sale.price) });
  }

  return acc;
}, []);

console.log(monthlySalesData);
const barChartMonthlyLabels = monthlySalesData.map((item) => item.monthYear);
const barChartMonthlyData = monthlySalesData.map((item) => item.sales);

console.log(barChartMonthlyLabels);
console.log(barChartMonthlyData);
updateMonthly(barChartMonthlyLabels,barChartMonthlyData)
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getAllSummary();
});
</script>

<style scoped>
.custom-body{
    height: 570px;
    box-shadow: 0 0 20px #080803f3;
    background-color: #080803f3;
    overflow-y: scroll;
}
</style>