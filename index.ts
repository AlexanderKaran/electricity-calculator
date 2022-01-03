import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const port = 3011;

const router = new Router();
router.get("/electricity", (ctx) => {
  const factor = 0.759;

  const kwh = Number(ctx.request.url.searchParams.get("kwh"));
  console.log("kwh", kwh);
  if (kwh) {
    const carbon = kwh * factor;
    const inTonnes = carbon / 1000;
    ctx.response.body = JSON.stringify({
      carbon: inTonnes,
      unit: "tCO2e",
    });
  } else {
    ctx.response.status = 400;
    ctx.response.body = JSON.stringify({
      error: {
        message: "kWh have not been supplied in the query",
      },
    });
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", () =>
  console.log(`Listening on http://localhost:${port}`)
);
await app.listen({ port });
