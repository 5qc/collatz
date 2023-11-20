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
    if (Number(num.value) > 1) {
        document.getElementById("error").style.display = "none"
        
        array = []
        array.push(Number(num.value))
        
        while (!array.includes(1)) array.push(performMath(array[array.length - 1]))
        document.getElementById("steps").innerText = array.length.toString()
        
        const logArray = array.map(x => Math.log(x))
        
        resetGraph()
        createGraph(<HTMLCanvasElement>document.getElementById("graph1"), array)
        createLogGraph(<HTMLCanvasElement>document.getElementById("graph2"), logArray)
        checkLog()
    } else {
        raiseError("Number has to be more than 1.")
    }
}

log.onchange = () => {
    checkLog()
}