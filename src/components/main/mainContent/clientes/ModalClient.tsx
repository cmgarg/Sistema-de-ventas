import React from "react";

type ModalClientProps = {
  // Define tus props aquí
};

const ModalClient: React.FC<ModalClientProps> = (props) => {
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-blue-500 z-50">
      {/* Component content here */}
    </div>
  );
};

export default ModalClient;
