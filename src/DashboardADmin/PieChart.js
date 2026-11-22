import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
const [series, setSeries] = useState([]);
const [labels, setLabels] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchData = async () => {
try {
const response = await fetch(
"https://namasya.onrender.com/fetchCutomerOrder"
);

if (!response.ok) {
throw new Error(`API Error: ${response.status}`);
}

const data = await response.json();

if (!Array.isArray(data.products)) {
throw new Error("Invalid data format");
}

const monthlyEarnings = {};

data.products.forEach((item) => {
const dateObj = new Date(item.date);
const amount = Number(item.amount) || 0;

if (isNaN(dateObj.getTime()) || amount <= 0) return;

const monthKey = `${dateObj.getFullYear()}-${String(
dateObj.getMonth() + 1
).padStart(2, "0")}`;

const monthLabel = dateObj.toLocaleString("en-IN", {
month: "short",
year: "numeric",
});

if (!monthlyEarnings[monthKey]) {
monthlyEarnings[monthKey] = {
label: monthLabel,
amount: 0,
};
}

monthlyEarnings[monthKey].amount += amount;
});

const sortedMonths = Object.keys(monthlyEarnings).sort();

setSeries(
sortedMonths.map((month) => monthlyEarnings[month].amount)
);

setLabels(
sortedMonths.map((month) => monthlyEarnings[month].label)
);
} catch (error) {
console.error("Error fetching chart data:", error);
} finally {
setLoading(false);
}
};

fetchData();
}, []);

const options = {
chart: {
type: "pie",
},
labels: labels,
tooltip: {
y: {
formatter: (value) =>
`₹ ${value.toLocaleString("en-IN", {
maximumFractionDigits: 2,
})}`,
},
},
legend: {
position: "right",
formatter: (seriesName, opts) => {
const value = opts.w.globals.series[opts.seriesIndex];

return `${seriesName}: ₹ ${value.toLocaleString("en-IN", {
maximumFractionDigits: 2,
})}`;
},
},
responsive: [
{
breakpoint: 480,
options: {
chart: {
width: 300,
},
legend: {
position: "bottom",
},
},
},
],
};

if (loading) {
return <div>Loading chart data...</div>;
}

if (series.length === 0) {
return <div>No data available for the chart.</div>;
}

return (
<div className="PieChart-container">
<h3 className="ChartsTg">Monthly Earnings by PieChart</h3>
<label>Sales/Revenue</label>

<ReactApexChart
options={options}
series={series}
type="pie"
className="PieChart"
id="PieChrt"
height={320}
/>
</div>
);
};

export default PieChart;
