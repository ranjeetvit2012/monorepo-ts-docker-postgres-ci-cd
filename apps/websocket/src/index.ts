import db from "@repo/db/client";

Bun.serve({
    port: 8081,
  
    fetch(req, server) {
      if (server.upgrade(req)) return; // handle WebSocket upgrade
      return new Response("Upgrade failed", { status: 500 });
    },
  
    websocket: {
      async message(ws, message) {
        try {
          await db.user.create({
            data: {
              username: Math.random().toString(36).substring(2),
              password: Math.random().toString(36).substring(2),
            },
          });
          ws.send(`Echo: ${message}`);
        } catch (err) {
          console.error("DB error:", err);
          ws.send("Error occurred");
        }
      },
    },
  });
