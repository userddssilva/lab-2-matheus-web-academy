import { Router } from 'express'
import prisma from '../lib/prisma'

const router = Router()

router.get('/', async (req, res) => {
  const compras = await prisma.compra.findMany({
    include: { cliente: true, itens: { include: { produto: true } } }
  })
  res.json(compras)
})

router.post('/', async (req, res) => {
  try {
    const compra = await prisma.compra.create({
      data: {
        ...req.body,
        itens: { create: req.body.itens }
      }
    })
    res.status(201).json(compra)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})

export default router
