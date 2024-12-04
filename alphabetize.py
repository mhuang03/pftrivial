def key(word):
    word = word.lower()
    return word[1:] if word[0] == "*" else word

fnames = ["adjectives", "containments", "degraders", "methods", "nounsOther", "nounsSetlike", "theorems", "uses"]
for fname in fnames:
    with open(f"words/{fname}.txt", "r") as file:
        words = [w.strip() for w in file.readlines()]
        words.sort(key=key)
    with open(f"words/{fname}.txt", "w") as file:
        file.write("\n".join(words))