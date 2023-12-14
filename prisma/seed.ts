// Import necessary dependencies and functions
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Define the main function
async function main() {
  const password = await hash("test", 12);
  await prisma.user.create(
    {
      data: {
        email: `admin@gmail.com`,
        password: password,
        role: "ADMIN",
        tags: ["she/her", "bisexual"],
      }
    }
  );

  await prisma.notification.createMany({
    data: [
      {
        title: "TestAdmin joined the Tisch Speakers!",
        userId: 1,
      },

      {
        title: "Second TestAdmin joined the Tisch Speakers!",
        userId: 1,
      },
    ],
  });

  await prisma.engagement.createMany({
    data: [
      {
        title: "Beebe Library",
        tags: ["bisexual"],
        start: new Date("01-01-2024 15:00:00"),
        end: new Date("01-01-2024 18:30:00"),
        status: "In person",
        image: "event1.jpg",
      },
      {
        title: "Pride Event",
        tags: ["bisexual"],
        start: new Date("01-05-2024 16:00:00"),
        end: new Date("01-05-2024 20:30:00"),
        status: "In person",
        image: "event2.jpg",
      },
      {
        title: "Colloquium",
        tags: ["bisexual"],
        start: new Date("01-07-2024 16:00:00"),
        end: new Date("01-07-2024 20:30:00"),
        status: "In person",
        image: "event3.jpg",
      },
      {
        title: "Rainbow Dialogues",
        tags: ["bisexual"],
        start: new Date("01-10-2024 10:00:00"),
        end: new Date("01-10-2024 23:30:00"),
        status: "In person",
        image: "event4.jpg",
      },
      {
        title: "Pride Talks",
        tags: ["bisexual"],
        start: new Date("01-10-2024 12:00:00"),
        end: new Date("01-10-2024 23:30:00"),
        status: "In person",
        image: "event5.jpg",
      },
      {
        title: "Equality Exchanges",
        tags: ["bisexual"],
        start: new Date("01-17-2024 8:00:00"),
        end: new Date("01-17-2024 20:30:00"),
        status: "In person",
        image: "event6.jpg",
      },
      {
        title: "Spectrum Series",
        tags: ["bisexual"],
        start: new Date("01-20-2024 8:00:00"),
        end: new Date("01-20-2024 11:30:00"),
        status: "In person",
        image: "event7.jpg",
      },
      {
        title: "Alliance Forums",
        tags: ["bisexual"],
        start: new Date("01-29-2024 16:00:00"),
        end: new Date("01-29-2024 20:30:00"),
        status: "In person",
        image: "event8.jpg",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
