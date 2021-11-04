import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Report = () => {
    const { generateReport } = useContext(GlobalContext);
    const [month, setMonth] = useState(1)
    const [reportRows, setReportRows] = useState(undefined)
    function _onChange(e) {
        setMonth(e.target.value)
    }

    async function _generateReport(e) {
        e.preventDefault();
        var res = await generateReport(month)
        console.log(res.data)
        setReportRows(res.data)
    }

    var reportTable = <table>
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>CreatedAt</th>
                <th>User-Id</th>
            </tr>
        </thead>
        <tbody>           
            {reportRows?.data.map((row, i) =>
            (<tr>
                <td>{row.transaction.text}</td>
                <td>{row.transaction.amount}</td>
                <td>{row.transaction.createdAt}</td>
                <td>{row.userId}</td>
            </tr>)
            )}
        </tbody>
    </table>

    return (
        <div>
            {reportTable}
            <form onsubmit="return false">
                <ul>
                    <input type="text" pattern="[1-12]{1}" onChange={(evt) => { _onChange(evt) }} placeholder="Enter Month Number" />
                    <li style={{listStyleType:'none'}}><button style={{ backgroundColor: '#fff',  fontSize: '1.2em'}}onClick={(e) => { _generateReport(e) }}>Generate Report</button></li>
                </ul>
            </form>
        </div>


    )
}

export default Report;