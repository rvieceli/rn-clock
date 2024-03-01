import React from 'react';
import {Animated, ViewProps} from 'react-native';

interface PointerProps extends ViewProps {
  value: Animated.Value | Animated.AnimatedInterpolation<number>;
  size: number;
}

export function Pointer({style, size, value, ...props}: PointerProps) {
  const rotate = value.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      {...props}
      style={[
        style,
        {
          position: 'absolute',
          width: 10,
          height: size,
          alignItems: 'center',
          transform: [
            {
              rotate,
            },
          ],
        },
      ]}
    />
  );
}
