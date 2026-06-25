import { Router } from 'express'
import prisma from '../lib/prisma'

const router = Router()

router.get('/', async (req, res) => {
  const produtos = await prisma.produto.findMany({
    include: { subcategoria: { include: { categoria: true } }, numeroSerie: true }
  })
  res.json(produtos)
})

router.post('/', async (req, res) => {
  try {
    const produto = await prisma.produto.create({ data: req.body })
    res.status(201).json(produto)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})

export default router
