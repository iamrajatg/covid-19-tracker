import React, { Fragment } from "react"
import numeral from "numeral"
import { Circle, Popup } from "react-leaflet"

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    },
}

const popUp = (country) => (
    <div className="info-container">
        <div
            className="info-flag"
            style={{
                backgroundImage: `url(${country.countryInfo.flag})`,
            }}
        />
        <div className="info-country">{country.country}</div>
        <div className="info-cases">Cases: {numeral(country.cases).format("0,0")}</div>
        <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
        </div>
        <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
    </div>
)

//Draw circles on map with tooltips
export const showDataOnMap = (data, casesType = "cases", selectedCountryCode) =>
    data.map((country) => {
        return (
            <Fragment key={country.countryInfo.iso2}>
                {country.countryInfo.iso2 === selectedCountryCode && (
                    <Popup position={[country.countryInfo.lat, country.countryInfo.long]}>
                        {popUp(country)}
                    </Popup>
                )}
                <Circle
                    center={[country.countryInfo.lat, country.countryInfo.long]}
                    fillOpacity={0.4}
                    color={casesTypeColors[casesType].hex}
                    fillColor={casesTypeColors[casesType].hex}
                    radius={
                        Math.sqrt(country[casesType]) *
                        casesTypeColors[casesType].multiplier
                    }>
                    <Popup>{popUp(country)}</Popup>
                </Circle>
            </Fragment>
        )
    })
