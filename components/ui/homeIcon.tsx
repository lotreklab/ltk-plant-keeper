import * as React from "react"
import Svg, { Path } from "react-native-svg"

import { colors } from '@/config/theme';

export interface HomeIconProps {
  width: number;
  height: number;
  fill?: string;
  focused?: boolean;
}

function HomeIcon({ width = 25, height = 25, fill = colors.grey200, focused }: HomeIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
    >
      <Path
        d="M24.58 11.176L13.364.956a1.276 1.276 0 00-1.727 0L.42 11.175c-.395.36-.525.913-.332 1.41.193.498.662.82 1.195.82h1.792v10.24c0 .406.329.735.735.735h6.148c.406 0 .735-.33.735-.735v-6.218h3.614v6.218c0 .406.329.735.735.735h6.148c.406 0 .735-.33.735-.735v-10.24h1.792c.533 0 1.003-.322 1.195-.82a1.274 1.274 0 00-.332-1.41z"
        fill={focused ? colors.primary : fill}
      />
    </Svg>
  )
}

export default HomeIcon;
