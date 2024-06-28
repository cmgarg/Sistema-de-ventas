import { CheckIcon } from "@radix-ui/react-icons";
import React, { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  onClick: () => void;
  size?: string;
}

const ButtonCheck: React.FC<ButtonProps> = ({
  checked,
  onClick,
  size,
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
      {checked && (
        <CheckIcon width={size ? size : 0} height={size ? size : 0} />
      )}
    </div>
  );
};

export default ButtonCheck;
