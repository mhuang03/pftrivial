import json
import base64

data = {}
for fname in ["adjectives", "intros", "nounsOther", "nounsSetlike"]:
    with open(f"words/{fname}.txt", "r") as file:
        data[fname] = sorted([l.strip() for l in file.readlines()])

data_str = json.dumps(data, separators=(",", ":"), sort_keys=True)
with open("data/data.json", "w") as file:
    file.write(data_str)

with open("data/dataB64.txt", "w") as file:
    data_bytes = data_str.encode("ascii")
    base64_str = base64.b64encode(data_bytes).decode("ascii")
    file.write(base64_str)
