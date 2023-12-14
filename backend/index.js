import Fastify from "fastify";
import cors from "@fastify/cors";
import { habitsRoute } from "./routes/habit.js";

const fastify = Fastify({
  logger: false,
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

fastify.register(habitsRoute, { prefix: "/habits" });

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Server now listening on ${address}`);
});
