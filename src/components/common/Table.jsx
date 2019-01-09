import React from "react";

const Table = props => {
  console.log(props);
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {props.headers.map(header => (
            <th key={header} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};

export default Table;
