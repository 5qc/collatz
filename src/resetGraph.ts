function resetGraph() {
    const graph = document.createElement("canvas")
    graph.setAttribute("id", "graph1")
    graph.setAttribute("height", "100%")
    graph.setAttribute("width", "100%")

    const graph2 = document.createElement("canvas")
    graph2.setAttribute("id", "graph2")
    graph2.setAttribute("height", "100%")
    graph2.setAttribute("width", "100%")
    graph2.setAttribute("style", "display: none;")

    document.getElementById("graph1").remove()
    document.getElementById("graph2").remove()
    document.getElementById("result").appendChild(graph)
    document.getElementById("result").appendChild(graph2)
}