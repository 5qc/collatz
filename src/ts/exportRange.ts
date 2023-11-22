function exportRange(type: string) {
    const num1 = Number((<HTMLInputElement>document.getElementById("range1")).value)
    const num2 = Number((<HTMLInputElement>document.getElementById("range2")).value)
    const error = document.getElementById("stats-error")

    if (num1 === 0 || num2 === 0) {
        error.style.display = "block"
        error.innerText = "Number cannot be 0."
    } else if (num1 <= 1 || num2 <= 1) {
        error.style.display = "block"
        error.innerText = "Number has to be greater than 1."
    } else if (num2 < num1) {
        error.style.display = "block"
        error.innerText = "Number 1 has to be smaller than number 2"
    } else {
        error.style.display = "none"

        const range = [...Array(num2).keys()].map(x => x + 1).filter(x => x >= num1)

        if (type === "csv") {
            let csv = "Number,Sequence,Steps\n"

            for (let num of range) {
                const array = [num]
                while (!array.includes(1)) array.push(performMath(array[array.length - 1]))

                csv += `${num},"${array.join(",")}",${array.length - 1}\n`
            }
            
            download(csv, "collatz.csv", "text/plain;charset=utf-8")
        } else if (type === "json") {
            let json = {}

            for (let num of range) {
                const array = [num]
                while (!array.includes(1)) array.push(performMath(array[array.length - 1]))

                json[num] = [array, array.length - 1]
            }

            download(JSON.stringify(json, null, 2).replace(/(": \[\s+\[)([^\]]+)/g, (_, a, b) => a + b.replace(/\s+/g, " ")).replace(/^(\s+)\[\s/gm, "$1[").replace(/\s\],$/gm, "],"), "collatz.json", "text/plain;charset=utf-8")
        }
    }
}