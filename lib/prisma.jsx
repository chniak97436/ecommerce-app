// lib/prisma.js
import { PrismaClient } from '@prisma/client'

/**
 * EXPLICATION:
 * Client Prisma avec optimisation pour le développement
 * Évite les multiples instances pendant le hot-reload
 */

const globalForPrisma = global

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma