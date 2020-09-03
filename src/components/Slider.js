import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider"

const useStyles = makeStyles({
    root: {
        width: 300,
        marginTop: "5px",
        marginLeft: "auto",
        marginRight: "auto",
    },
    textStyles: {
        fontSize: "1rem",
        fontWeight: "bold",
    },
})

function valuetext(value) {
    return `${value}days`
}

export default function LastDaysSlider({ onChange, lastDaysForHistory }) {
    const classes = useStyles()

    const [sliderValue, setSliderValue] = useState(120)

    return (
        <div className={classes.root}>
            <Typography
                className={classes.textStyles}
                id="slider"
                gutterBottom
                color="primary">
                History Range - Last {sliderValue} days
            </Typography>
            <Slider
                onChange={(e, value) => {
                    onChange(value)
                    setSliderValue(value)
                }}
                value={lastDaysForHistory}
                defaultValue={120}
                getAriaValueText={valuetext}
                aria-labelledby="slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={120}
            />
        </div>
    )
}
