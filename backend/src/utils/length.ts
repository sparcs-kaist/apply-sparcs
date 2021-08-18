export const LENGTH_THRESHOLD = 100;

export default function lengthOkay(str: string) {
  return str.trim().length >= LENGTH_THRESHOLD;
}
