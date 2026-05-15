export function calculate(a, b, operator) {
  switch (operator) {
    case '+':
      return round(a + b);
    case '−':
      return round(a - b);
    case '×':
      return round(a * b);
    case '÷':
      if (b === 0) return 'Error';
      return round(a / b);
    default:
      return b;
  }
}

function round(num) {
  return Math.round(num * 1e10) / 1e10;
}
