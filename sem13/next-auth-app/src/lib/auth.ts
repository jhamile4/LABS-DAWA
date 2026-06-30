import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Simulación de base de datos de usuarios en memoria
const users: { id: string; name: string; email: string; password: string; loginAttempts: number; lockedUntil: number | null }[] = []

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        isRegister: { label: "IsRegister", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const isRegister = credentials.isRegister === "true"

        if (isRegister) {
          // Registro
          const existingUser = users.find(u => u.email === credentials.email)
          if (existingUser) throw new Error("El correo ya está registrado")

          const hashedPassword = await bcrypt.hash(credentials.password, 10)
          const newUser = {
            id: Date.now().toString(),
            name: credentials.name || "Usuario",
            email: credentials.email,
            password: hashedPassword,
            loginAttempts: 0,
            lockedUntil: null,
          }
          users.push(newUser)
          return { id: newUser.id, name: newUser.name, email: newUser.email }
        } else {
          // Login
          const user = users.find(u => u.email === credentials.email)
          if (!user) throw new Error("Usuario no encontrado")

          // Verificar bloqueo
          if (user.lockedUntil && Date.now() < user.lockedUntil) {
            const mins = Math.ceil((user.lockedUntil - Date.now()) / 60000)
            throw new Error(`Cuenta bloqueada. Intenta en ${mins} minuto(s)`)
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) {
            user.loginAttempts += 1
            if (user.loginAttempts >= 3) {
              user.lockedUntil = Date.now() + 5 * 60 * 1000 // 5 minutos
              user.loginAttempts = 0
              throw new Error("Demasiados intentos. Cuenta bloqueada 5 minutos")
            }
            throw new Error(`Contraseña incorrecta. Intentos restantes: ${3 - user.loginAttempts}`)
          }

          user.loginAttempts = 0
          user.lockedUntil = null
          return { id: user.id, name: user.name, email: user.email }
        }
      },
    }),
  ],
}

export default authOptions
