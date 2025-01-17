const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  try {
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      return;
    }

    const user1 = await prisma.user.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "123456",
        avatar_url:
          "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676296367166243426.png",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "123456",
        avatar_url:
          "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676296367166243426.png",
      },
    });

    console.log(`User created: ${user1.email}, ${user2.email}`);

    await prisma.procedure.createMany({
      data: [
        {
          description: "Fix the printer",
          status: "TODO",
          assignedId: user1.id,
          importance: "HIGH",
          category: "BUG"
        },
        {
          description: "Order office supplies",
          status: "ON_GOING",
          assignedId: user1.id,
          importance: "MEDIUM",
          category: "DESIGN"
        },
        {
          description: "Review marketing campaign",
          status: "WAITING",
          assignedId: user2.id,
          importance: "LOW",
          category: "FEATURE"
        },
        {
          description: "Write a blog post",
          status: "DONE",
          assignedId: user2.id,
          importance: "HIGH",
          category: "RESEARCH"
        },
      ],
    });

    console.log("Procedures created");
  } catch (error) {
    console.error("Seed error: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
