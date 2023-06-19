export const getFontSize = (size) => {
  const windowSize = 1920;

  const sizeInVW = (size / windowSize) * 100;
  const minSize = (size / 4) * 3;

  return `clamp(${
    size < 15 ? size : minSize < 15 ? 15 : minSize
  }px,${sizeInVW.toFixed(3)}vw,${size}px)`;
};
