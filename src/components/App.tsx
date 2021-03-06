import * as React from "react";
import * as _ from "lodash";


interface Values {
  [a: string]: string
}

interface Action {
  type: string,
  cell: string,
  value: string
}

const initialValues = {};
const reducer = (state: Values, action: Action) => {
  switch (action.type) {
    case 'SET':
      return {...state, [action.cell]: action.value}
    default:
      throw new Error('Unknown action')
  }
}

export const App = () => {
  const [cell, setCell] = React.useState("A1");
  const [width, setWidth] = React.useState(10)
  const [height, setHeight] = React.useState(10)
  const [values, dispatch] = React.useReducer(reducer, initialValues);
  const value = values[cell] || "";
  const columnLabels = _.range(width).map(column => String.fromCharCode(65 + column));
  const rowLabels = _.range(height);

  return (
    <main>
      <header>
        Location: { cell }
        <input
          name="width"
          type="number"
          value={width}
          onChange={evt => setWidth(parseInt(evt.target.value))}/>
        <label htmlFor="width">Width</label>
        <input
          name="height"
          type="number"
          value={height}
          onChange={evt => setHeight(parseInt(evt.target.value))}/>
        <label htmlFor="height">Height</label>
        <input
          name="value"
          type="text"
          value={value}
          onChange={evt => dispatch({ type: "SET", cell, value: evt.target.value })}/>
        <label htmlFor="value">Value</label>

      </header>
      <article>
        <table>
          <thead><tr><th></th>{ columnLabels.map((label) => <th key={label}>{ label }</th> )}</tr></thead>
          <tbody>
            { rowLabels.map(rowIndex => {
              return (
                <tr key={rowIndex}>
                  <th>{ rowIndex }</th>
                  { columnLabels.map((label, columnIndex) => {
                    return (
                      <td
                        key={label}
                        onClick={() => setCell(label + rowIndex.toString())}>
                        <span>{ values[label + rowIndex.toString()] }</span>
                      </td>
                    );
                  }) }
                </tr>
              );
            }) }
          </tbody>
        </table>
      </article>
    </main>
  )
}
