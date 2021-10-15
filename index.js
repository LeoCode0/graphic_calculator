const main = document.querySelector("main");

const xAxis = document.querySelector("#x-axis");
const yAxis = document.querySelector("#y-axis");

const buttonSubmit = document.querySelector("#button-submit");
const buttonClear = document.querySelector("#button-clear");
buttonClear.disabled = true;

let arrValues = [];

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
  document.querySelector("#plane").getContext("2d").fillRect(x, -y, 4, 4);
};

const drawChart = (arrValues) => {
  let chartCtx;
  if (!chartCtx) {
    const canvasChart = document.createElement("canvas");
    const container = document.querySelector(".data");
    canvasChart.id = "graph";
    container.appendChild(canvasChart);
    chartCtx = document.querySelector("#graph");
  } else {
    chartCtx = document.querySelector("#graph");
  }
  const myChart = new Chart(chartCtx.getContext("2d"), {
    type: "bar",
    data: {
      labels: ["X1", "X2", "X3", "X4", "X5"],
      datasets: [
        {
          label: "X Values",
          data: arrValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
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
  xAxis.value = "";
  yAxis.value = "";
};

const clearPlane = () => {
  document.querySelector("#plane").remove();
  createPlane();
};

// Event listeners

buttonSubmit.addEventListener("click", (button) => {
  const xValue = xAxis.value;
  const yValue = yAxis.value;
  if (
    xValue.length > 0 &&
    yValue.length > 0 &&
    Number(xValue) <= 300 &&
    Number(yValue) <= 300
  ) {
    arrValues.push(xValue);
    if (arrValues.length === 5) {
      button.target.disabled = true;
      buttonClear.disabled = false;
      drawChart(arrValues);
      arrValues = [];
    }
    drawCartesianPoint(xValue, yValue);
    clearValues();
  }
});

buttonClear.addEventListener("click", (button) => {
  button.target.disabled = true;
  buttonSubmit.disabled = false;
  document.querySelector("#graph").remove();
  clearPlane();
});
