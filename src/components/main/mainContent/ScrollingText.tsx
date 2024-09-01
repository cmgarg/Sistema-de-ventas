import React from "react";
import Marquee from "react-marquee-slider";

interface ScrollingTextProps {
  text: string;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({ text }) => {
  return (
    <div style={{ width: "200px", overflow: "hidden" }}>
      <Marquee
        velocity={15}
        resetAfterTries={200}
        scatterRandomly={false}
        direction="ltr" // Dirección del desplazamiento (left to right)
        onInit={() => {}} // Función opcional que se ejecuta al iniciar el componente
        onFinish={() => {}} // Función opcional que se ejecuta al finalizar el componente
      >
        {[
          <div key="scrollingText" style={{ whiteSpace: "nowrap" }}>
            {text}
          </div>,
        ]}
      </Marquee>
    </div>
  );
};

export default ScrollingText;
