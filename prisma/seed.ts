import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const categoria = await prisma.categoria.create({
    data: { nome: 'Eletrônicos' }
  })

  const sub = await prisma.subCategoria.create({
    data: { nome: 'Smartphones', categoriaId: categoria.id }
  })

  const produto = await prisma.produto.create({
    data: {
      modelo: 'Galaxy S24',
      preco: 3999.99,
      qtdeEstoque: 10,
      fabricante: 'Samsung',
      subcategoriaId: sub.id,
      numeroSerie: { create: { nSerie: 'SN-001-2024' } }
    }
  })

  const cliente = await prisma.cliente.create({
    data: {
      cpf: '12345678901',
      email: 'joao@email.com',
      dtNascim: new Date('1990-05-15'),
      celular: '92999990000',
      enderecos: {
        create: {
          rua: 'Av. Eduardo Ribeiro',
          numero: '100',
          bairro: 'Centro',
          cidade: 'Manaus',
          estado: 'AM',
          cep: '69010001'
        }
      }
    },
    include: { enderecos: true }
  })

  console.log('Seed concluido:', { cliente: cliente.email, produto: produto.modelo })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
