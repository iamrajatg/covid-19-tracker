import React from "react"
import { Select, FormControl, MenuItem } from "@material-ui/core"

function Header({ countries, country, change }) {
    return (
        <div className="header">
            <h2>COVID-19 TRACKER</h2>
            <FormControl className="header__dropdown">
                <Select variant="outlined" value={country} onChange={(e) => change(e)}>
                    <MenuItem key="worldwide" value="all">
                        WORLDWIDE
                    </MenuItem>
                    {countries.map((country) => (
                        <MenuItem key={country.name + country.code} value={country.code}>
                            {country.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default Header
