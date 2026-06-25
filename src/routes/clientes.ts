import { Router } from 'express'
import prisma from '../lib/prisma'

const router = Router()

router.get('/', async (req, res) => {
  const clientes = await prisma.cliente.findMany({
    include: { enderecos: true }
  })
  res.json(clientes)
})

router.get('/:id', async (req, res) => {
  const cliente = await prisma.cliente.findUnique({
    where: { id: Number(req.params.id) },
    include: { enderecos: true, compras: true }
  })
  if (!cliente) {
    res.status(404).json({ error: 'Cliente não encontrado' })
    return
  }
  res.json(cliente)
})

router.post('/', async (req, res) => {
  try {
    const cliente = await prisma.cliente.create({ data: req.body })
    res.status(201).json(cliente)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})

router.delete('/:id', async (req, res) => {
  await prisma.cliente.delete({ where: { id: Number(req.params.id) } })
  res.status(204).send()
})

export default router
