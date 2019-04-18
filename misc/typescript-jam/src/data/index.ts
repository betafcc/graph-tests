export const ego = (n = 100, m = 1, r = 1) => fetch(`http://localhost:8000?n=${n}&m=${m}&r=${r}`).then(r => r.json())

export const lesMiserables = () =>
  fetch(
    'https://gist.githubusercontent.com/mbostock/4062045/raw/5916d145c8c048a6e3086915a6be464467391c62/miserables.json'
  ).then(r => r.json())
