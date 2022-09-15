import React from "react";
const User = (props) => {
  var id = props.match.params.id;
  return (
    <div>
      <h1>User Details</h1>
      ID: {id}
    </div>
  );
};
export default User;
