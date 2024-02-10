export const breakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
}

export type TBreakPoint = keyof typeof breakPoints

export function isBrekpoint(brekpoint: any) {
  return Object.keys(breakPoints).includes(brekpoint)
}

export function getBreakPoint(brekpoint: any) {
  if (isBrekpoint(brekpoint)) {
    return breakPoints[brekpoint as TBreakPoint]
  } else {
    return null
  }
}
