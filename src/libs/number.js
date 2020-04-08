import { Platform } from 'react-native';

export const toLocaleNumberString = num => {
  const n = Number(num);
  if (Number.isNaN(n)) {
    return '-';
  }
  if (Platform.OS === 'android') {
    // React Native on Android doesn't support locale
    return n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }
  return n.toLocaleString();
};
