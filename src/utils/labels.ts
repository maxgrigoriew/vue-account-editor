export interface Label {
  text: string
}

export const parseLabelsString = (input: string): Label[] => {
  return input
    .split(';')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((text) => ({ text }))
}

export const stringifyLabels = (labels: Label[]): string => {
  return labels.map((label) => label.text).join(';')
}
