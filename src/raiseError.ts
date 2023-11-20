function raiseError(text: string) {
    document.getElementById("error").style.display = "block"
    document.getElementById("error").innerText = text

    document.getElementById("graph1").style.display = "none"
    document.getElementById("graph2").style.display = "none"
}