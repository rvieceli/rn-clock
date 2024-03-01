import {useWindowDimensions} from 'react-native';

export function useScreenOrientation() {
  const {height, width} = useWindowDimensions();

  return width < height ? 'portrait' : 'landscape';
}
