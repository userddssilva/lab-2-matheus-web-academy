async function loadSection(section) {
  const content = document.getElementById('content')
  content.innerHTML = '<p>Carregando...</p>'

  try {
    const response = await fetch(`/api/${section}`)
    const data = await response.json()

    if (!data.length) {
      content.innerHTML = `<p>Nenhum registro encontrado em <strong>${section}</strong>.</p>`
      return
    }

    const keys = Object.keys(data[0]).filter(k => typeof data[0][k] !== 'object')
    const rows = data.map(row =>
      `<tr>${keys.map(k => `<td>${row[k] ?? ''}</td>`).join('')}</tr>`
    ).join('')

    content.innerHTML = `
      <h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2>
      <table>
        <thead><tr>${keys.map(k => `<th>${k}</th>`).join('')}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `
  } catch (err) {
    content.innerHTML = `<p class="error">Erro ao carregar: ${err.message}</p>`
  }
}
