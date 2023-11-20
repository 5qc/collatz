const num = <HTMLInputElement>document.getElementById("number")
const submit = <HTMLButtonElement>document.getElementById("submit")
const result = <HTMLDivElement>document.getElementById("result")
const log = <HTMLInputElement>document.getElementById("log")

num.onkeyup = (e) => {
    num.value = num.value.replace(/\D+/g, "")

    if (e.key === "Enter") submit.click()
}

let array = []
submit.onclick = () => {
    array = []
    array.push(Number(num.value))

    while (!array.includes(1)) array.push(performMath(array[array.length - 1]))

    const logArray = array.map(x => Math.log(x))

    resetGraph()
    createGraph(<HTMLCanvasElement>document.getElementById("graph1"), array)
    createLogGraph(<HTMLCanvasElement>document.getElementById("graph2"), logArray)
    checkLog()

    document.getElementById("steps").innerText = array.length.toString()
}

log.onchange = () => {
    checkLog()
}