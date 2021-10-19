const main = document.querySelector("main");
const chartContainer = document.querySelector(".chart-container");

const xAxisInput = document.querySelector("#x-axis");
const yAxisInput = document.querySelector("#y-axis");

const buttonSubmit = document.querySelector("#button-submit");
const buttonClear = document.querySelector("#button-clear");
buttonClear.disabled = true;

let scatter;
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
  chartContainer.appendChild(plane);

  const canvasCtx = document.querySelector("#plane").getContext("2d");

  scatter = new Chart(canvasCtx, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Points",
          data: [],
          backgroundColor: "rgba(54, 162, 235, 1)",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
        },
      },
    },
  });
};

createPlane();

// Functions

const drawChart = (xValues, yValues) => {
  const canvasChart = document.createElement("canvas");
  const container = document.querySelector(".data");
  canvasChart.id = "graph";
  container.appendChild(canvasChart);
  let chartCtx = document.querySelector("#graph");

  chartCtx = document.querySelector("#graph");
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

const createModal = (text) => {
  const modal = document.createElement("div");
  modal.innerHTML = `
    <p>
      ${text}
    </p>
  `;

  modal.classList.add("modal");

  document.body.appendChild(modal);
  setTimeout(() => {
    modal.remove();
  }, 3000);
};

// Event listeners

buttonSubmit.addEventListener("click", (button) => {
  const xValue = Number(xAxisInput.value);
  const yValue = Number(yAxisInput.value);

  switch (true) {
    case xAxisInput.value.length === 0:
      createModal("El valor de x no puede estar vacio");
      break;
    case yAxisInput.value.length === 0:
      createModal("El valor de y no puede estar vacio");
      break;
    case xValue > 100:
      createModal("El valor de x no puede ser mayor a 100");
      break;
    case xValue < -100:
      createModal("El valor de x no puede ser menor a -100");
      break;
    case yValue > 100:
      createModal("El valor de y no puede ser mayor a 100");
      break;
    case yValue < -100:
      createModal("El valor de y no puede ser menor a -10-");
      break;
    default:
      scatter.data.datasets.forEach((dataset) => {
        dataset.data.push({ x: xValue, y: yValue });
      });
      scatter.update();
      arrValuesX.push(xValue);
      arrValuesY.push(yValue);
      clearValues();
      break;
  }
  if (arrValuesX.length === 5) {
    button.target.disabled = true;
    xAxisInput.disabled = true;
    yAxisInput.disabled = true;
    buttonClear.disabled = false;
    drawChart(arrValuesY, arrValuesX);
    arrValuesX = [];
    arrValuesY = [];
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
