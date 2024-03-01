import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Animated, Easing} from 'react-native';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

interface ClockContextProps {
  speed: number;
  isRunning: boolean;
  startAnimation: (animatedValue: Animated.Value, duration: number) => void;
  stopAnimation: (reset?: boolean) => void;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  hoursValue: Animated.Value;
  minutesValue: Animated.AnimatedMultiplication<number>;
  secondsValue: Animated.AnimatedMultiplication<number>;
}

const ClockContext = createContext<ClockContextProps | null>(null);

export function ClockProvider({children}: PropsWithChildren) {
  const [speed, setSpeed] = useState(1);
  const [isRunning, setIsRunning] = useState(true);

  const hoursValue = useRef(new Animated.Value(0)).current;
  const minutesValue = useRef(Animated.multiply(hoursValue, 60)).current;
  const secondsValue = useRef(Animated.multiply(minutesValue, 60)).current;

  const startAnimation = useCallback(
    (animatedValue: Animated.Value, duration: number) => {
      animatedValue.stopAnimation(currentValue => {
        let sequence: Animated.CompositeAnimation[] = [];
        if (currentValue !== 0) {
          const animation = Animated.timing(animatedValue, {
            toValue: 360,
            duration,
            easing: Easing.linear,
            useNativeDriver: false,
          });

          sequence.push(animation);
        }

        Animated.sequence([
          ...sequence,
          Animated.loop(
            Animated.timing(animatedValue, {
              toValue: 360,
              duration,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ),
        ]).start();
      });
    },
    [],
  );

  const stopAnimation = useCallback(
    (reset = false) => {
      hoursValue.stopAnimation(currentValue => {
        if (reset) {
          if (currentValue === 0) {
            return;
          }
          Animated.timing(hoursValue, {
            toValue: currentValue < 180 ? 0 : 360,
            duration: 500,
            useNativeDriver: false,
          }).start(() => {
            hoursValue.setValue(0);
            setIsRunning(false);
          });
        } else {
          setIsRunning(false);
        }
      });
    },
    [hoursValue],
  );

  useEffect(() => {
    if (isRunning) {
      startAnimation(hoursValue, DAY / speed);
    }
  }, [hoursValue, isRunning, speed, startAnimation]);

  const context = useMemo(
    () => ({
      speed,
      isRunning,
      startAnimation,
      stopAnimation,
      setSpeed,
      setIsRunning,
      hoursValue,
      minutesValue,
      secondsValue,
    }),
    [
      hoursValue,
      isRunning,
      minutesValue,
      secondsValue,
      speed,
      startAnimation,
      stopAnimation,
    ],
  );

  return (
    <ClockContext.Provider value={context}>{children}</ClockContext.Provider>
  );
}

export function useClock() {
  const context = useContext(ClockContext);

  if (context === null) {
    throw new Error(
      'useClock requires a context object provided by ClockProvider',
    );
  }

  return context;
}
