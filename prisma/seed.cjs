// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const sampleProducts = [
  {
    name: "iPhone 13 Pro",
    description: "Le smartphone haut de gamme d'Apple avec écran Super Retina XDR et triple appareil photo.",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1632661674596-618e45e56c53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Électronique",
    stock: 25,
    featured: true
  },
  {
    name: "MacBook Pro 14\"",
    description: "Ordinateur portable professionnel avec puce M1 Pro et écran Liquid Retina XDR.",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Électronique",
    stock: 15,
    featured: true
  },
  {
    name: "T-shirt Cotton Bio",
    description: "T-shirt 100% coton biologique, confortable et respectueux de l'environnement.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Vêtements",
    stock: 100,
    featured: false
  },
  {
    name: "Casque Audio Sans Fil",
    description: "Casque over-ear avec réduction de bruit active et autonomie 30h.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Électronique",
    stock: 40,
    featured: true
  }
]

async function main() {
  console.log(' Début du peuplement de la base de données...')

  // Nettoyer la base
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  // Créer un utilisateur test
  const hashedPassword = await bcrypt.hash('password123', 12)
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Utilisateur Test',
      password: hashedPassword,
    }
  })
  console.log(' Utilisateur test créé')

  // Créer les produits
  await prisma.product.createMany({
    data: sampleProducts
  })
  console.log(' Produits créés')

  // Vérification
  const productCount = await prisma.product.count()
  const userCount = await prisma.user.count()

  console.log(`${productCount} produits créés`)
  console.log(`${userCount} utilisateurs créés`)
  console.log('Peuplement terminé avec succès !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })