import { FC } from "react";
import React from "react";
import "./Button.css";

interface ButtonProps {
  enableFullWidth: boolean;
  navigateToRoute: () => void;
  buttonText: string;
}

const Button: FC<ButtonProps> = ({ enableFullWidth, navigateToRoute, buttonText }) => {
  return (
    <div onClick={navigateToRoute} className={enableFullWidth ? "button-container full-width" : "button-container"}>
      <span id="button-text">{buttonText}</span>
    </div>
  );
};

export default Button;
