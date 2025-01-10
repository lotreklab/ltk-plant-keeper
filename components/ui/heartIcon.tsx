import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width={27}
      height={24}
      viewBox="0 0 27 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M26.308 7.864A7.104 7.104 0 0019.203.759c-2.562 0-4.8 1.361-6.05 3.395A7.093 7.093 0 007.104.759 7.104 7.104 0 000 7.864C0 10 .947 11.91 2.439 13.212L12.506 23.28a.916.916 0 001.296 0L23.87 13.212a7.078 7.078 0 002.439-5.348z"
        fill="#D2D2D2"
      />
    </Svg>
  )
}

export default SvgComponent