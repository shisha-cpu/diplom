import React, { useState } from "react";
import "./buttonWithArrow.scss"; // Include your CSS for styling
import { Navigate } from "react-router-dom";

const ButtonWithArrow = () => {
    const [redirect , setRedirect ] = useState(false)
    if (redirect) {
        return <Navigate  to={'/courses'} />
    }
  return (
    <main className="go">
      <div className="buttons">
        <button className="particles example-button-styling">
          <span className="particles__content" onClick={()=>{setRedirect(true)}}>ПОГНАЛИ</span>
          <span className="particles__parts">
            {Array.from({ length: 20 }, (_, index) => (
              <span key={index}></span>
            ))}
          </span>
        </button>
      </div>
    </main>
  );
};

export default ButtonWithArrow;
