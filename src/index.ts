import { log } from "@/settings";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const server = Bun.serve({
  port: process.env.PORT ?? 3000,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") return new Response("Home page!");

    if (url.pathname === "/users") {
      if (request.method === "GET") {
        const users = await prisma.user.findMany();

        return new Response(JSON.stringify(users));
      }
      if (request.method === "POST") {
        const { email, name } = (await request.json()) as {
          email: string | null;
          name: string | null;
        };

        if (!email || !name) return new Response("Invalid params!");

        await prisma.user.create({
          data: {
            email,
            name,
          },
        });

        return new Response("User created with success");
      }

      if (request.method === "DELETE") {
        const { email, name } = (await request.json()) as {
          email: string | null;
          name: string | null;
        };

        if (!email && !name) {
          return new Response("Invalid params!");
        }

        if (email && name) {
          await prisma.user.deleteMany({
            where: {
              email,
              name,
            },
          });
        } else if (email) {
          await prisma.user.deleteMany({
            where: {
              email,
            },
          });
        } else if (name) {
          await prisma.user.deleteMany({
            where: {
              name,
            },
          });
        }

        return new Response("User deleted with success");
      }

      return new Response("Invalid method");
    }

    return new Response("404!");
  },
});

log.success(`Listening on localhost:`, server.port);
