import defaultTheme from './Default';

export default function theme(options) {
  const { layoutTheme } = options;

  switch (layoutTheme) {
    default:
      return defaultTheme();
  }
}
