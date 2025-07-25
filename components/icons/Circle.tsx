import React from "react";
import Svg, { Circle } from "react-native-svg";

type StaticCircleProps = {
  size?: number;
};

export function CircleIcon({ size = 80 }: StaticCircleProps) {
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const arcPercentage = 0.15;
  const dashOffset = circumference * (1 - arcPercentage);

  return (
    <Svg width={size} height={size}>
      {/* Anillo completo gris claro */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E0F2F9"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      {/* Segmento azul */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#4AADE0"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={dashOffset}
        fill="transparent"
      />
    </Svg>
  );
}
