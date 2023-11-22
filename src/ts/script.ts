const num = <HTMLInputElement>document.getElementById("number")
const submit = <HTMLButtonElement>document.getElementById("submit")
const result = <HTMLDivElement>document.getElementById("result")
const log = <HTMLInputElement>document.getElementById("log")
const statsLink = <HTMLDivElement>document.getElementById("stats-link")
const allInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input")

num.onkeyup = (e) => {
    num.value = num.value.replace(/\D+/g, "")
    
    if (e.key === "Enter") submit.click()
}

let array = []
submit.onclick = () => {
    if (Number(num.value) > 1 && Number(num.value) !== Infinity) {
        document.getElementById("error").style.display = "none"
        
        array = []
        array.push(Number(num.value))
        
        while (!array.includes(1)) array.push(performMath(array[array.length - 1]))
        document.getElementById("steps").innerText = (array.length - 1).toString()
        
        const logArray = array.map(x => Math.log(x))
        
        resetGraph()
        createGraph(<HTMLCanvasElement>document.getElementById("graph1"), array)
        createLogGraph(<HTMLCanvasElement>document.getElementById("graph2"), logArray)
        checkLog()
    } else if (Number(num.value) < 2) {
        raiseError("Number has to be greater than 1.")
    } else if (Number(num.value) === Infinity) {
        raiseError("Number has to be less than 1.797693134862315e+308.")
    }
}

document.getElementById("range1").onkeyup = (e) => {
    // @ts-ignore
    document.getElementById("range1").value = document.getElementById("range1").value.replace(/\D+/g, "")

    if (e.key === "Enter") document.getElementById("range2").focus()
}
document.getElementById("range2").onkeyup = (e) => {
    // @ts-ignore
    document.getElementById("range2").value = document.getElementById("range2").value.replace(/\D+/g, "")
}

document.getElementById("export-csv").onclick = () => {
    exportRange("csv")
}
document.getElementById("export-json").onclick = () => {
    exportRange("json")
}

document.getElementById("screen").onclick = () => {
    document.getElementById("screen").style.display = "none"
    document.getElementById("stats").style.display = "none"
}

document.getElementById("stats-link").onclick = () => {
    document.getElementById("screen").style.display = "block"
    document.getElementById("stats").style.display = "block"
}


log.onchange = () => {
    checkLog()
}