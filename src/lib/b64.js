const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
const charsMap = {};
for (let i = 0; i < chars.length; i++) {
  charsMap[chars[i]] = i;
}

export const intToB64 = (int, pad = -1) => {
  let b64 = "";
  while (int > 0) {
    b64 = chars[int % 64] + b64;
    int >>= 6;
  }

  if (pad > 0) {
    while (b64.length < pad) {
      b64 = chars[0] + b64;
    }
  }

  return b64;
};

export const b64ToInt = (b64) => {
  let int = 0;
  for (let i = 0; i < b64.length; i++) {
    int = (int << 6) | charsMap[b64[i]];
  }
  return int;
};
