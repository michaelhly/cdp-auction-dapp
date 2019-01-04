import React from "react";

const Table = props => {
  return (
    <table class="table table-striped">
      <thead>
        <tr>
          {props.headers.map(header => (
            <th scope="col">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};

export default Table;
