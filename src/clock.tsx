import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Pointer} from './pointer';
import {useClock} from './clock.context';

interface ClockProps {
  size: number;
}

export function Clock({size}: ClockProps) {
  const {hoursValue, minutesValue, secondsValue} = useClock();

  const clockStyles = useMemo(() => makeClockStyles(size), [size]);

  return (
    <View style={clockStyles.clock}>
      <Pointer value={hoursValue} size={size}>
        <View style={clockStyles.hours} />
      </Pointer>

      <Pointer value={minutesValue} size={size}>
        <View style={clockStyles.minutes} />
      </Pointer>

      <Pointer value={secondsValue} size={size}>
        <View style={clockStyles.seconds} />
      </Pointer>
    </View>
  );
}

function makeClockStyles(clockSize: number) {
  return StyleSheet.create({
    clock: {
      width: clockSize + 2,
      height: clockSize + 2,
      borderRadius: clockSize,
      backgroundColor: '#000',
      borderWidth: 1,
      borderColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    seconds: {
      height: clockSize * 0.5,
      width: 1,
      alignItems: 'center',
      backgroundColor: 'red',
    },
    minutes: {
      width: 3,
      height: clockSize * 0.5,
      alignItems: 'center',
      marginTop: clockSize * 0.1,
      backgroundColor: 'white',
    },
    hours: {
      width: 6,
      height: clockSize * 0.3,
      backgroundColor: 'white',
      marginTop: clockSize * 0.28,
    },
  });
}
