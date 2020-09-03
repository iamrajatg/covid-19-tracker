import React from "react"
import { Card, CardContent, Typography } from "@material-ui/core"
import "./InfoCard.css"
import numeral from "numeral"

function InfoCard({ title, cases, total, active, onClick }) {
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
                    +{numeral(cases).format("0a").toUpperCase()}
                </h2>

                <Typography className="infoCard__total" color="primary">
                    {numeral(total).format("0a").toUpperCase()} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoCard
