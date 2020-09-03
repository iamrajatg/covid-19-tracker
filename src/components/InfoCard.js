import React, { useState, useEffect } from "react"
import { Card, CardContent, Typography } from "@material-ui/core"
import "./InfoCard.css"
import numeral from "numeral"
import Countup from "react-countup"

function InfoCard({ title, cases, total, active, onClick }) {
    const [showCountup, setShowCountup] = useState(true)
    useEffect(() => {
        if (!showCountup) setShowCountup(true)
        if (cases)
            setTimeout(() => {
                setShowCountup(false)
            }, 3000)
    }, [cases])

    return (
        <Card
            className={`infoCard ${active && "infoCard--active"} ${
                title === "Recovered" && "green"
            }`}
            onClick={onClick}>
            <CardContent>
                <Typography className="infoCard__title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className="infoCard__cases">
                    {cases >= 0 && "+"}
                    {cases && showCountup && <Countup end={cases} duration={2} />}
                    {!showCountup && numeral(cases).format("0a").toUpperCase()}
                </h2>

                <Typography className="infoCard__total" color="primary">
                    {numeral(total).format("0a").toUpperCase()} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoCard
