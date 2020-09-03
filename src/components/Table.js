import React from "react"
import numeral from "numeral"

function Table({ tableData }) {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>COUNTRY</th>
                        <th>CASES</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data) => (
                        <tr key={data.countryInfo.iso2}>
                            <td>{data.country}</td>

                            <td>
                                <strong>{numeral(data.cases).format("0,0")}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Table
