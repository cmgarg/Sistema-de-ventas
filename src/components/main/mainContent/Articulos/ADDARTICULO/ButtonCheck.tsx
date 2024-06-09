import { CheckIcon } from "@radix-ui/react-icons";
import React, { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  onClick: () => void;
}

const ButtonCheck: React.FC<ButtonProps> = ({
  checked,
  onClick,
  ...divProps
}) => {
  return (
    <div
      {...divProps}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {checked && <CheckIcon />}
    </div>
  );
};

export default ButtonCheck;
