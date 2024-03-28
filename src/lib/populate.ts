import { prisma } from "./prisma"


async function main() {
    await prisma.caracter.create({
        data: {
            caracter_name: "Pyper",
            player_name: "Henrique",
            experience_points: 0,
        }
    })

    await prisma.$disconnect()

    console.log("1 personagem inserido com sucesso")
}
main()