function checkLog() {
    if (log.checked === true) {
        document.getElementById("graph1").style.display = "none"
        document.getElementById("graph2").style.display = "block"
    } else {
        document.getElementById("graph1").style.display = "block"
        document.getElementById("graph2").style.display = "none"
    }
}