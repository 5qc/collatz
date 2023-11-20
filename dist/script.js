function createGraph(ctx, arr) {
    const chartData = {
        labels: Array.from(Array(arr.length).keys()),
        datasets: [
            {
                label: "",
                data: arr,
                fill: false,
                borderColor: '#f8f8f8',
                tension: 0.1
            }
        ]
    };
    const line = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
            maintainAspectRatio: false,
            elements: {
                point: {
                    borderWidth: 0
                }
            },
            scales: {
                // @ts-ignore
                x: {
                    display: false
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
function createLogGraph(ctx, arr) {
    return createGraph(ctx, arr);
}
function performMath(num) {
    if (num % 2 === 1)
        return (num * 3) + 1;
    else
        return num / 2;
}
function resetGraph() {
    const graph = document.createElement("canvas");
    graph.setAttribute("id", "graph1");
    graph.setAttribute("height", "100%");
    graph.setAttribute("width", "100%");
    const graph2 = document.createElement("canvas");
    graph2.setAttribute("id", "graph2");
    graph2.setAttribute("height", "100%");
    graph2.setAttribute("width", "100%");
    graph2.setAttribute("style", "display: none;");
    document.getElementById("graph1").remove();
    document.getElementById("graph2").remove();
    document.getElementById("result").appendChild(graph);
    document.getElementById("result").appendChild(graph2);
}
const num = document.getElementById("number");
const submit = document.getElementById("submit");
const result = document.getElementById("result");
const log = document.getElementById("log");
num.onkeyup = (e) => {
    num.value = num.value.replace(/\D+/g, "");
    if (e.key === "Enter")
        submit.click();
};
let array = [];
submit.onclick = () => {
    array = [];
    array.push(Number(num.value));
    while (!array.includes(1))
        array.push(performMath(array[array.length - 1]));
    const logArray = array.map(x => Math.log(x));
    resetGraph();
    createGraph(document.getElementById("graph1"), array);
    createLogGraph(document.getElementById("graph2"), logArray);
};
log.onchange = () => {
    if (log.checked === true) {
        document.getElementById("graph1").style.display = "none";
        document.getElementById("graph2").style.display = "block";
    }
    else {
        document.getElementById("graph1").style.display = "block";
        document.getElementById("graph2").style.display = "none";
    }
};
//# sourceMappingURL=script.js.map