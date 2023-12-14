import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: false,
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

fastify.get("/", async () => {
  return { hello: "world" };
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Server now listening on ${address}`);
});
