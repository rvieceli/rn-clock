import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'transparent' | 'black' | 'danger';
  label: string;
}

export function Button({
  label,
  style,
  variant = 'black',
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      {...props}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 12,
    borderRadius: 10,
  },
  black: {
    backgroundColor: '#000',
  },
  danger: {
    backgroundColor: '#f99',
  },
  transparent: {},
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});
