import React from "react";

const LoginOrRemoveButtonContainer = ({
  inputfieldLength,
  clickLogin,
  clickRemove
}) => {
  return (
    <div className="flex-flow button-container">
      <button
        style={{
          backgroundColor: inputfieldLength > 0 ? "#429781" : "#76C2B7"
        }}
        onClick={() => clickLogin()}
      >
        Logga in
      </button>
      <button
        style={{
          backgroundColor: inputfieldLength === 0 ? "#F2B6B6" : "#F57E7E"
        }}
        onClick={clickRemove}
      >
        X
      </button>
    </div>
  );
};

export default LoginOrRemoveButtonContainer;
