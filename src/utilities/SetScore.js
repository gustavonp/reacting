import React from "react";

export const SetScore = (props) =>{
  return(
    <div className="score">
      {props()}
    </div>
  );
};

export default SetScore;