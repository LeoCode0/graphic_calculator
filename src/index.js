const main = document.querySelector("main");

const xAxisInput = document.querySelector("#x-axis");
const yAxisInput = document.querySelector("#y-axis");

const buttonSubmit = document.querySelector("#button-submit");
const buttonClear = document.querySelector("#button-clear");
buttonClear.disabled = true;

let arrValuesX = [];
let arrValuesY = [];
const arrColors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
];

// Cartesian plane
const createPlane = () => {
  const plane = document.createElement("canvas");
  plane.id = "plane";
  plane.width = 500;
  plane.height = 500;
  main.prepend(plane);

  const canvasCtx = document.querySelector("#plane").getContext("2d");

  canvasCtx.translate(250, 250);
  canvasCtx.beginPath();
  canvasCtx.moveTo(250, 0);
  canvasCtx.lineTo(-250, 0);
  canvasCtx.stroke();
  canvasCtx.moveTo(0, -250);
  canvasCtx.lineTo(0, 250);
  canvasCtx.stroke();

  canvasCtx.font = "20px sans-serif";
  canvasCtx.fillText("+x", 180, -10);
  canvasCtx.fillText("-y", 10, 180);

  canvasCtx.fillText("-x", -200, -10);
  canvasCtx.fillText("+y", 10, -180);
};

createPlane();

// Functions

const drawCartesianPoint = (x, y) => {
  const planeContext = document.querySelector("#plane").getContext("2d");
  let xTextValue = Number(x) + 5;
  let yTextValue = Number(y) + 5;
  planeContext.fillStyle = arrColors[arrValuesX.length - 1];
  planeContext.fillRect(x, -y, 4, 4);
  planeContext.fillText(`(${x}, ${y})`, xTextValue, -yTextValue);
};

const drawChart = (xValues, yValues) => {
  let chartCtx = document.querySelector("#graph");
  if (!chartCtx) {
    const canvasChart = document.createElement("canvas");
    const container = document.querySelector(".data");
    canvasChart.id = "graph";
    container.appendChild(canvasChart);
    chartCtx = document.querySelector("#graph");
  }
  const myChart = new Chart(chartCtx.getContext("2d"), {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          label: "X Value",
          data: yValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: arrColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const clearValues = () => {
  xAxisInput.value = "";
  yAxisInput.value = "";
};

const clearPlane = () => {
  document.querySelector("#plane").remove();
  createPlane();
};

// Event listeners

buttonSubmit.addEventListener("click", (button) => {
  const xValue = xAxisInput.value;
  const yValue = yAxisInput.value;
  if (
    xValue.length > 0 &&
    yValue.length > 0 &&
    Number(xValue) <= 250 &&
    Number(yValue) <= 250 &&
    Number(xValue) >= -250 &&
    Number(yValue) >= -250
  ) {
    arrValuesX.push(xValue);
    arrValuesY.push(yValue);
    drawCartesianPoint(xValue, yValue);
    clearValues();
    if (arrValuesX.length === 5) {
      button.target.disabled = true;
      xAxisInput.disabled = true;
      yAxisInput.disabled = true;
      buttonClear.disabled = false;
      drawChart(arrValuesY, arrValuesX);
      arrValuesX = [];
      arrValuesY = [];
    }
  }
});

buttonClear.addEventListener("click", (button) => {
  button.target.disabled = true;
  buttonSubmit.disabled = false;

  xAxisInput.disabled = false;
  yAxisInput.disabled = false;

  document.querySelector("#graph").remove();
  clearPlane();
});
