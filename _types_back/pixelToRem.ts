interface IFixDecimals {
  value: number;
  dp?: number;
}

function fixDecimals({ value, dp = 2 }: IFixDecimals) {
  return parseFloat(value.toString()).toFixed(dp);
}

export const pixelToRem = (size: number) =>
  `${fixDecimals({ value: size / 16 })}rem`;
