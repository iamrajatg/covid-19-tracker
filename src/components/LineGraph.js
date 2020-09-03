import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import numeral from "numeral"

const options = {
    legend: {
        display: false,
    },
    elements: {
        points: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0.0")
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a")
                    },
                },
            },
        ],
    },
}

function LineGraph({ casesType }) {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const getHistoryData = async (lastdays, casesType = "cases") => {
            const res = await fetch(
                `https://disease.sh/v3/covid-19/historical/all?lastdays=${lastdays}`
            )
            const data = await res.json()
            let chartPoints = []
            let previousDate

            for (let date in data[casesType]) {
                if (previousDate)
                    chartPoints.push({
                        x: date,
                        y: data[casesType][date] - data[casesType][previousDate],
                    })

                previousDate = date
            }

            setChartData(chartPoints)
        }
        getHistoryData(120, casesType)
    }, [casesType])
    return (
        <div className="linegraph">
            {chartData.length > 0 ? (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor:
                                    casesType === "recovered"
                                        ? "rgba(0,255,0,0.5)"
                                        : "rgba(204,16,52,0.6)",
                                borderColor:
                                    casesType === "recovered"
                                        ? "rgba(0,255,0,0.7)"
                                        : "#CC1034",
                                data: chartData,
                            },
                        ],
                    }}
                />
            ) : (
                "Loading..."
            )}
        </div>
    )
}

export default LineGraph
