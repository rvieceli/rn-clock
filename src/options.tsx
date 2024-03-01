import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from './button';
import {useClock} from './clock.context';

export function Options() {
  const {isRunning, stopAnimation, setSpeed, setIsRunning} = useClock();
  const handleDecreaseSpeed = () => setSpeed(s => s / 2);
  const handleResetSpeed = () => setSpeed(1);
  const handleIncreaseSpeed = () => setSpeed(s => s * 2);

  const handleReset = () => {
    stopAnimation(true);
  };

  const handleStartStop = () => {
    if (isRunning) {
      stopAnimation();
    } else {
      setIsRunning(true);
    }
  };

  return (
    <View style={styles.options}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 5,
        }}>
        <Button
          label="Slower X2"
          onPress={handleDecreaseSpeed}
          style={{flex: 3}}
        />
        <Button label="Normal" onPress={handleResetSpeed} style={{flex: 4}} />

        <Button
          label="Faster X2"
          onPress={handleIncreaseSpeed}
          style={{flex: 3}}
        />
      </View>
      <View style={{gap: 10}}>
        <Button
          label={isRunning ? 'Stop' : 'Start'}
          variant="transparent"
          onPress={handleStartStop}
        />
        <Button label={'Reset'} variant="danger" onPress={handleReset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    flex: 2,
    gap: 30,
    width: '100%',
  },
});
