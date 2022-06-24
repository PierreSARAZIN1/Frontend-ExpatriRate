import React from 'react';

const TableCost = ({cost}) => {
    return (
        <tr>
            <td>{cost.item}</td><td>{cost.cost}</td>
        </tr>
    );
};

export default TableCost;