/**
 * hello를 넣으면 Hello가 나와요
 */
export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
