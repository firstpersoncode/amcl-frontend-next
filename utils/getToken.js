import nookies from "nookies";

export default function getToken(ctx) {
  const cookies = nookies.get(ctx);

  const cookiesObjects = Object.entries(cookies).map(([name, value]) => ({
    name,
    value,
  }));

  const token = cookiesObjects.find((t) => t.name === "_amclf");
  return token?.value ?? "";
}
