import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs'
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    throw new Error('Email et mot de passe requis')
                }
                 // Trouver l'utilisateur
                 
            }
        })
    ]
})
































