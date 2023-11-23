function checkLog() {
    if (log.checked === true) {
        document.getElementById("graph1").style.display = "none";
        document.getElementById("graph2").style.display = "block";
    }
    else {
        document.getElementById("graph1").style.display = "block";
        document.getElementById("graph2").style.display = "none";
    }
}
function createGraph(ctx, arr) {
    const chartData = {
        labels: Array.from(Array(arr.length).keys()),
        datasets: [
            {
                label: "",
                data: arr,
                fill: false,
                borderColor: "#f8f8f8",
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
                },
                y: {
                    ticks: {
                        font: {
                            family: "'Roboto Mono', monospace"
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    displayColors: false,
                    titleFont: {
                        family: "'Roboto Mono', monospace"
                    },
                    bodyFont: {
                        family: "'Roboto Mono', monospace"
                    },
                    footerfont: {
                        family: "'Roboto Mono', monospace"
                    }
                }
            }
        }
    });
}
function createLogGraph(ctx, arr) {
    return createGraph(ctx, arr);
}
function download(data, filename, type) {
    const file = new Blob([data], { type: type });
    const a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}
function exportRange(type) {
    const num1 = Number(document.getElementById("range1").value);
    const num2 = Number(document.getElementById("range2").value);
    const error = document.getElementById("stats-error");
    if (num1 === 0 || num2 === 0) {
        error.style.display = "block";
        error.innerText = "Number cannot be 0.";
    }
    else if (num1 <= 1 || num2 <= 1) {
        error.style.display = "block";
        error.innerText = "Number has to be greater than 1.";
    }
    else if (num2 < num1) {
        error.style.display = "block";
        error.innerText = "Number 1 has to be smaller than number 2";
    }
    else if ((num2 - num1) > 500000) {
        error.style.display = "block";
        error.innerHTML = "Number of iterations has<br />to be less than 500,000.";
    }
    else {
        error.style.display = "none";
        const range = [...Array(num2).keys()].map(x => x + 1).filter(x => x >= num1);
        if (type === "csv") {
            let csv = "Number,Sequence,Steps\n";
            for (let num of range) {
                const array = [num];
                while (!array.includes(1))
                    array.push(performMath(array[array.length - 1]));
                csv += `${num},"${array.join(",")}",${array.length - 1}\n`;
            }
            download(csv, "collatz.csv", "text/plain;charset=utf-8");
        }
        else if (type === "json") {
            let json = {};
            for (let num of range) {
                const array = [num];
                while (!array.includes(1))
                    array.push(performMath(array[array.length - 1]));
                json[num] = [array, array.length - 1];
            }
            download(JSON.stringify(json, null, 2).replace(/(": \[\s+\[)([^\]]+)/g, (_, a, b) => a + b.replace(/\s+/g, " ")).replace(/^(\s+)\[\s/gm, "$1[").replace(/\s\],$/gm, "],"), "collatz.json", "text/plain;charset=utf-8");
        }
    }
}
function performMath(num) {
    if (num % 2 === 1)
        return (num * 3) + 1;
    else
        return num / 2;
}
function raiseError(text) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerText = text;
    document.getElementById("graph1").style.display = "none";
    document.getElementById("graph2").style.display = "none";
}
function randomColor() {
    // Generate RGB
    return `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`;
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
const statsLink = document.getElementById("stats-link");
const allInputs = document.querySelectorAll("input");
num.onkeyup = (e) => {
    num.value = num.value.replace(/\D+/g, "");
    if (e.key === "Enter")
        submit.click();
};
let array = [];
submit.onclick = () => {
    if (Number(num.value) > 1 && Number(num.value) !== Infinity) {
        document.getElementById("error").style.display = "none";
        array = [];
        array.push(Number(num.value));
        while (!array.includes(1))
            array.push(performMath(array[array.length - 1]));
        document.getElementById("steps").innerText = (array.length - 1).toString();
        const logArray = array.map(x => Math.log(x));
        resetGraph();
        createGraph(document.getElementById("graph1"), array);
        createLogGraph(document.getElementById("graph2"), logArray);
        checkLog();
    }
    else if (Number(num.value) < 2) {
        raiseError("Number has to be greater than 1.");
    }
    else if (Number(num.value) === Infinity) {
        raiseError("Number has to be less than 1.797693134862315e+308.");
    }
};
document.getElementById("range1").onkeyup = (e) => {
    // @ts-ignore
    document.getElementById("range1").value = document.getElementById("range1").value.replace(/\D+/g, "");
    if (e.key === "Enter")
        document.getElementById("range2").focus();
};
document.getElementById("range2").onkeyup = (e) => {
    // @ts-ignore
    document.getElementById("range2").value = document.getElementById("range2").value.replace(/\D+/g, "");
};
document.getElementById("export-csv").onclick = () => {
    exportRange("csv");
};
document.getElementById("export-json").onclick = () => {
    exportRange("json");
};
document.getElementById("screen").onclick = () => {
    document.getElementById("screen").style.display = "none";
    document.getElementById("stats").style.display = "none";
};
document.getElementById("stats-link").onclick = () => {
    document.getElementById("screen").style.display = "block";
    document.getElementById("stats").style.display = "block";
};
log.onchange = () => {
    checkLog();
};
//# sourceMappingURL=script.js.map