import express from 'express'
import path from 'path'
import clientesRouter from './routes/clientes'
import produtosRouter from './routes/produtos'
import comprasRouter from './routes/compras'
import categoriasRouter from './routes/categorias'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api/clientes', clientesRouter)
app.use('/api/produtos', produtosRouter)
app.use('/api/compras', comprasRouter)
app.use('/api/categorias', categoriasRouter)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
