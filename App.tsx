import React from 'react';
import {Clock} from './src/clock';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {ClockProvider} from './src/clock.context';
import {Options} from './src/options';
import {useScreenOrientation} from './src/useScreenOrientation';

function App() {
  const {width, height} = useWindowDimensions();
  const orientation = useScreenOrientation();

  const clockSize = Math.min(width * 0.65, height * 0.65);

  return (
    <ClockProvider>
      <View style={[container.default, container[orientation]]}>
        <View style={clock[orientation]}>
          <Clock size={clockSize} />
        </View>
        <Options />
      </View>
    </ClockProvider>
  );
}

const clock = StyleSheet.create({
  portrait: {flex: 3, justifyContent: 'flex-end', paddingBottom: 50},
  landscape: {flex: 2, justifyContent: 'center'},
});

const container = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  portrait: {
    paddingHorizontal: 40,
  },
  landscape: {
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
