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
    }

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
    })
}