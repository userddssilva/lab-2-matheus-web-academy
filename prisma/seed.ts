import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Limpa os dados na ordem correta (respeitando FKs)
  await prisma.itemCompra.deleteMany()
  await prisma.compra.deleteMany()
  await prisma.numeroSerie.deleteMany()
  await prisma.produto.deleteMany()
  await prisma.subCategoria.deleteMany()
  await prisma.categoria.deleteMany()
  await prisma.endereco.deleteMany()
  await prisma.cliente.deleteMany()

  // --- CATEGORIAS E SUBCATEGORIAS ---
  const eletronicos = await prisma.categoria.create({
    data: {
      nome: 'Eletrônicos',
      subcategorias: {
        create: [
          { nome: 'Smartphones' },
          { nome: 'Notebooks' },
          { nome: 'Tablets' },
        ]
      }
    },
    include: { subcategorias: true }
  })

  const informatica = await prisma.categoria.create({
    data: {
      nome: 'Informática',
      subcategorias: {
        create: [
          { nome: 'Periféricos' },
          { nome: 'Armazenamento' },
        ]
      }
    },
    include: { subcategorias: true }
  })

  const games = await prisma.categoria.create({
    data: {
      nome: 'Games',
      subcategorias: {
        create: [
          { nome: 'Consoles' },
          { nome: 'Acessórios Gamer' },
        ]
      }
    },
    include: { subcategorias: true }
  })

  const subSmartphones = eletronicos.subcategorias.find(s => s.nome === 'Smartphones')!
  const subNotebooks    = eletronicos.subcategorias.find(s => s.nome === 'Notebooks')!
  const subTablets      = eletronicos.subcategorias.find(s => s.nome === 'Tablets')!
  const subPerifericos  = informatica.subcategorias.find(s => s.nome === 'Periféricos')!
  const subArmazenamento = informatica.subcategorias.find(s => s.nome === 'Armazenamento')!
  const subConsoles     = games.subcategorias.find(s => s.nome === 'Consoles')!
  const subAcessorios   = games.subcategorias.find(s => s.nome === 'Acessórios Gamer')!

  // --- PRODUTOS ---
  const galaxy = await prisma.produto.create({
    data: {
      modelo: 'Galaxy S24 Ultra',
      preco: 5999.99,
      qtdeEstoque: 8,
      fabricante: 'Samsung',
      subcategoriaId: subSmartphones.id,
      numeroSerie: { create: { nSerie: 'SN-SAM-001-2024' } }
    }
  })

  const iphone = await prisma.produto.create({
    data: {
      modelo: 'iPhone 15 Pro',
      preco: 7499.00,
      qtdeEstoque: 5,
      fabricante: 'Apple',
      subcategoriaId: subSmartphones.id,
      numeroSerie: { create: { nSerie: 'SN-APL-002-2024' } }
    }
  })

  const moto = await prisma.produto.create({
    data: {
      modelo: 'Moto G84',
      preco: 1599.90,
      qtdeEstoque: 20,
      fabricante: 'Motorola',
      subcategoriaId: subSmartphones.id,
    }
  })

  const dellNotebook = await prisma.produto.create({
    data: {
      modelo: 'Dell Inspiron 15 3000',
      preco: 3299.00,
      qtdeEstoque: 6,
      fabricante: 'Dell',
      subcategoriaId: subNotebooks.id,
      numeroSerie: { create: { nSerie: 'SN-DEL-003-2024' } }
    }
  })

  const macbook = await prisma.produto.create({
    data: {
      modelo: 'MacBook Air M2',
      preco: 9999.00,
      qtdeEstoque: 3,
      fabricante: 'Apple',
      subcategoriaId: subNotebooks.id,
      numeroSerie: { create: { nSerie: 'SN-APL-004-2024' } }
    }
  })

  const ipad = await prisma.produto.create({
    data: {
      modelo: 'iPad 10ª Geração',
      preco: 4299.00,
      qtdeEstoque: 7,
      fabricante: 'Apple',
      subcategoriaId: subTablets.id,
      numeroSerie: { create: { nSerie: 'SN-APL-005-2024' } }
    }
  })

  const teclado = await prisma.produto.create({
    data: {
      modelo: 'Teclado Mecânico Redragon K552',
      preco: 299.90,
      qtdeEstoque: 30,
      fabricante: 'Redragon',
      subcategoriaId: subPerifericos.id,
    }
  })

  const ssd = await prisma.produto.create({
    data: {
      modelo: 'SSD Kingston 1TB NV2',
      preco: 449.90,
      qtdeEstoque: 25,
      fabricante: 'Kingston',
      subcategoriaId: subArmazenamento.id,
    }
  })

  const ps5 = await prisma.produto.create({
    data: {
      modelo: 'PlayStation 5 Slim',
      preco: 3799.00,
      qtdeEstoque: 4,
      fabricante: 'Sony',
      subcategoriaId: subConsoles.id,
      numeroSerie: { create: { nSerie: 'SN-SNY-006-2024' } }
    }
  })

  const controle = await prisma.produto.create({
    data: {
      modelo: 'Controle DualSense PS5',
      preco: 449.00,
      qtdeEstoque: 15,
      fabricante: 'Sony',
      subcategoriaId: subAcessorios.id,
    }
  })

  // --- CLIENTES ---
  const joao = await prisma.cliente.create({
    data: {
      cpf: '12345678901',
      email: 'joao.silva@email.com',
      dtNascim: new Date('1990-05-15'),
      celular: '92999990001',
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

  const maria = await prisma.cliente.create({
    data: {
      cpf: '98765432100',
      email: 'maria.souza@email.com',
      dtNascim: new Date('1995-08-22'),
      celular: '92988880002',
      enderecos: {
        create: {
          rua: 'Rua Floriano Peixoto',
          numero: '250',
          bairro: 'Praça 14',
          cidade: 'Manaus',
          estado: 'AM',
          cep: '69020010'
        }
      }
    },
    include: { enderecos: true }
  })

  const carlos = await prisma.cliente.create({
    data: {
      cpf: '11122233344',
      email: 'carlos.lima@email.com',
      dtNascim: new Date('1988-03-10'),
      celular: '92977770003',
      enderecos: {
        create: [
          {
            rua: 'Av. Djalma Batista',
            numero: '1010',
            bairro: 'Chapada',
            cidade: 'Manaus',
            estado: 'AM',
            cep: '69050010'
          },
          {
            rua: 'Rua Rio Içá',
            numero: '45',
            bairro: 'Adrianópolis',
            cidade: 'Manaus',
            estado: 'AM',
            cep: '69057040'
          }
        ]
      }
    },
    include: { enderecos: true }
  })

  const ana = await prisma.cliente.create({
    data: {
      cpf: '55566677788',
      email: 'ana.pereira@email.com',
      dtNascim: new Date('2000-12-01'),
      celular: '92966660004',
      enderecos: {
        create: {
          rua: 'Rua Belo Horizonte',
          numero: '33',
          bairro: 'Nossa Senhora das Graças',
          cidade: 'Manaus',
          estado: 'AM',
          cep: '69053080'
        }
      }
    },
    include: { enderecos: true }
  })

  // --- COMPRAS ---
  await prisma.compra.create({
    data: {
      formaPgto: 'Cartão de Crédito',
      desconto: 200.00,
      tCompra: 13298.99,
      clienteId: joao.id,
      enderecoId: joao.enderecos[0].id,
      itens: {
        create: [
          { produtoId: galaxy.id, quantidade: 1, precoUnit: 5999.99 },
          { produtoId: dellNotebook.id, quantidade: 1, precoUnit: 3299.00 },
          { produtoId: ssd.id, quantidade: 2, precoUnit: 449.90 },
          { produtoId: teclado.id, quantidade: 1, precoUnit: 299.90 },
        ]
      }
    }
  })

  await prisma.compra.create({
    data: {
      formaPgto: 'PIX',
      desconto: null,
      tCompra: 7499.00,
      clienteId: maria.id,
      enderecoId: maria.enderecos[0].id,
      itens: {
        create: [
          { produtoId: iphone.id, quantidade: 1, precoUnit: 7499.00 },
        ]
      }
    }
  })

  await prisma.compra.create({
    data: {
      formaPgto: 'Boleto',
      desconto: 100.00,
      tCompra: 4248.00,
      clienteId: carlos.id,
      enderecoId: carlos.enderecos[0].id,
      itens: {
        create: [
          { produtoId: ps5.id, quantidade: 1, precoUnit: 3799.00 },
          { produtoId: controle.id, quantidade: 1, precoUnit: 449.00 },
        ]
      }
    }
  })

  await prisma.compra.create({
    data: {
      formaPgto: 'Cartão de Débito',
      desconto: null,
      tCompra: 5748.90,
      clienteId: ana.id,
      enderecoId: ana.enderecos[0].id,
      itens: {
        create: [
          { produtoId: ipad.id, quantidade: 1, precoUnit: 4299.00 },
          { produtoId: moto.id, quantidade: 1, precoUnit: 1599.90 },
        ]
      }
    }
  })

  await prisma.compra.create({
    data: {
      formaPgto: 'Cartão de Crédito',
      desconto: 500.00,
      tCompra: 9499.00,
      clienteId: carlos.id,
      enderecoId: carlos.enderecos[1].id,
      itens: {
        create: [
          { produtoId: macbook.id, quantidade: 1, precoUnit: 9999.00 },
        ]
      }
    }
  })

  console.log('Seed concluido com sucesso!')
  console.log(`  ${await prisma.categoria.count()} categorias`)
  console.log(`  ${await prisma.subCategoria.count()} subcategorias`)
  console.log(`  ${await prisma.produto.count()} produtos`)
  console.log(`  ${await prisma.cliente.count()} clientes`)
  console.log(`  ${await prisma.compra.count()} compras`)
  console.log(`  ${await prisma.itemCompra.count()} itens de compra`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
