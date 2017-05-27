import React, { PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './calc-table.css';

function makePercent(num) {
  return `${(num * 100).toFixed(0)}%`;
}

const CalcTable = function(props) {
  return (
    <Table className='two-dimension-table'>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn />
          {
            (props.model).map(ele =>
              <TableHeaderColumn>{ele}</TableHeaderColumn>,
            )
          }
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} >
        {
          props.data.map((row, i) => (
            <TableRow>
              <TableRowColumn>{props.model[i]}</TableRowColumn>
              {
                row.map(col =>
                  <TableRowColumn>{makePercent(col)}</TableRowColumn>,
                )
              }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

CalcTable.propTypes = {
  model: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number,
    ),
  ).isRequired,
};

export default CalcTable;
