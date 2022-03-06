import { SecurePassword } from "blitz"
import db from "./index"

import { User } from "@prisma/client"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

type UserTuple = [User["name"], User["email"], string, User["role"]]

const seedUsers: UserTuple[] = [
  ["André Kovac", "dev@andrekovac.com", "1234", "USER"],
  ["admin", "admin@andrekovac.com", "1234", "ADMIN"],
]

const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }
  await Promise.all(
    seedUsers.map(async ([name, email, password, role]) => {
      const hashedPassword = await SecurePassword.hash(password)
      try {
        await db.user.create({
          data: {
            name,
            email,
            hashedPassword,
            role,
          },
        })
      } catch (error) {
        console.log("error while seeding:", error.message)
      }
    })
  )
}

export default seed
