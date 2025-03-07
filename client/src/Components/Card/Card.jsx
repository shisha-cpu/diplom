import React from "react";
import "./card.scss"; 

const Card = (props) => {
  return (
    <div className="card-container">
      <div className="card">
        <h2 className="card-title"> {props.title}</h2>
        <p>
            <br />
        {props.description}
        </p>
        <div className="layers">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="layer"></div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default Card;
