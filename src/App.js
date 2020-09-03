import React, { useEffect, useState } from "react"
import "./App.css"
import Header from "./components/Header"
import InfoCard from "./components/InfoCard"
import Map from "./components/Map"
import { Card, CardContent } from "@material-ui/core"
import Table from "./components/Table"
import LineGraph from "./components/LineGraph"
import "leaflet/dist/leaflet.css"
import Slider from "./components/Slider"

function App() {
    const [countriesData, setCountriesData] = useState([])
    const [mapCountries, setMapCountries] = useState([])
    const [selectedCountry, selectCountry] = useState("all")
    const [stats, setStats] = useState({})
    const [tableData, setTableData] = useState([])
    const [mapCenter, setMapCenter] = useState({
        lat: 34.80746,
        lng: -40.4796,
    })
    const [casesType, setCasesType] = useState("cases")

    const [mapZoom, setMapZoom] = useState(3)
    const [lastDaysForHistory, setLastDaysForHistory] = useState(120)

    async function getStats(country) {
        let url = `https://disease.sh/v3/covid-19/${
            country === "all" ? country : `countries/${country}`
        }`

        try {
            const res = await fetch(url)
            const data = await res.json()

            setStats(data)
            //console.log({ lat: data.countryInfo.lat, lng: data.countryInfo.long })
            if (country === "all") {
                setMapCenter({
                    lat: 34.80746,
                    lng: -40.4796,
                })
                if (mapZoom !== 3)
                    setTimeout(() => {
                        setMapZoom(3)
                    }, 500)
            } else {
                setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long })

                if (mapZoom !== 4)
                    setTimeout(() => {
                        setMapZoom(4)
                    }, 500)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function getCountries() {
            try {
                const res = await fetch("https://disease.sh/v3/covid-19/countries")
                const data = await res.json()
                setCountriesData(data)
                let countriesInfo = []
                let validData = []
                data.forEach((country) => {
                    if (
                        country.country &&
                        country.countryInfo &&
                        country.countryInfo.iso2
                    ) {
                        countriesInfo.push({
                            name: country.country,
                            code: country.countryInfo.iso2,
                        })
                        validData.push(country)
                    }
                })
                //Sorting data by no, of total cases to send to table
                validData = validData.sort((a, b) => b.cases - a.cases)
                setTableData(validData)
                setCountriesData(countriesInfo)
                // console.log(data)
                setMapCountries(validData)
                getStats("all")
            } catch (error) {
                console.log(error)
            }
        }

        getCountries()
    }, [])

    //Change Handler for SelectBox Country Selection
    const onSelectCountry = (e) => {
        selectCountry(e.target.value)
        getStats(e.target.value)
    }
    const country = countriesData.find((country) => country.code === selectedCountry)
    return (
        <div className="app">
            <div className="app_main">
                <Header
                    countries={countriesData}
                    country={selectedCountry}
                    change={onSelectCountry}
                />
                <div className="card_container">
                    <InfoCard
                        active={casesType === "cases"}
                        onClick={(e) => setCasesType("cases")}
                        title="Coronavirus Cases"
                        cases={stats.todayCases}
                        total={stats.cases}
                    />
                    <InfoCard
                        active={casesType === "recovered"}
                        onClick={(e) => setCasesType("recovered")}
                        title="Recovered"
                        cases={stats.todayRecovered}
                        total={stats.recovered}
                    />
                    <InfoCard
                        active={casesType === "deaths"}
                        onClick={(e) => setCasesType("deaths")}
                        title="Deaths"
                        cases={stats.todayDeaths}
                        total={stats.deaths}
                    />
                </div>
                <Map
                    countries={mapCountries}
                    center={mapCenter}
                    zoom={mapZoom}
                    selectedCountry={selectedCountry}
                    casesType={casesType}
                />
            </div>
            <Card className="app_side">
                <CardContent>
                    <h3>Live Cases By Country</h3>
                    <Table tableData={tableData} />
                    <h3 style={{ marginTop: "20px" }}>
                        {selectedCountry === "all"
                            ? "Worldwide "
                            : country && country.name + " "}
                        new {casesType}
                    </h3>

                    <LineGraph
                        casesType={casesType}
                        lastdays={lastDaysForHistory}
                        selectedCountry={selectedCountry}
                    />
                    <Slider value={lastDaysForHistory} onChange={setLastDaysForHistory} />
                </CardContent>
            </Card>
        </div>
    )
}

export default App
