import { colors } from "@/config/theme";
import * as React from "react"
import Svg, { Path } from "react-native-svg"

export interface CameraIconProps {
  width: number;
  height: number;
  fill?: string;
  focused?: boolean;
}

function CameraIcon({ width = 26, height = 24, fill = colors.white, focused }: CameraIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 21 19"
      fill="none"
    >
      <Path
        d="M6.234 10.813a4.266 4.266 0 108.531 0 4.266 4.266 0 00-8.53 0zm13.454-7.22h-4.594C14.766 2.282 14.438.97 13.125.97h-5.25c-1.312 0-1.64 1.312-1.969 2.625H1.312C.591 3.594 0 4.184 0 4.906V16.72c0 .722.59 1.312 1.312 1.312h18.375c.722 0 1.313-.59 1.313-1.312V4.906c0-.722-.59-1.312-1.313-1.312zM10.5 16.638a5.824 5.824 0 110-11.649 5.824 5.824 0 010 11.649zm9.188-9.106h-2.625V6.22h2.625V7.53z"
        fill={fill}
      />
    </Svg>
  )
}

export default CameraIcon
