import { generateTriviality } from "./utils";

export default async (req, context) => {
  let t = generateTriviality();
  return new Response(JSON.stringify(t, null, 0), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const config = {
  path: "/api",
};
