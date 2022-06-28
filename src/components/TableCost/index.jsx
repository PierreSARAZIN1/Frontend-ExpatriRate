import React from 'react';

const TableCost = ({cost}) => {
    return (
        <tr>
            <td>{cost.item}</td>
            <td></td>
            <td>{(Number(cost.range.high) + Number(cost.range.low)) / 2 < cost.cost? "🥵": null} {cost.cost}$</td>
        </tr>
    );
};

export default TableCost;