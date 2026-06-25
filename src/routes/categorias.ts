import { Router } from 'express'
import prisma from '../lib/prisma'

const router = Router()

router.get('/', async (req, res) => {
  const categorias = await prisma.categoria.findMany({
    include: { subcategorias: true }
  })
  res.json(categorias)
})

router.post('/', async (req, res) => {
  try {
    const categoria = await prisma.categoria.create({ data: req.body })
    res.status(201).json(categoria)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})

export default router
