export default function (value) {
  if (!value) {
    value = 0
  }
  return `$ ${Math.round(value * 100) / 100}`
}
