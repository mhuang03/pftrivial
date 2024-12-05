import adjectives from "../words/adjectives.txt";
import containments from "../words/containments.txt";
import degraders from "../words/degraders.txt";
import methods from "../words/methods.txt";
import nounsOther from "../words/nounsOther.txt";
import nounsSetlike from "../words/nounsSetlike.txt";
import theorems from "../words/theorems.txt";
import uses from "../words/uses.txt";

const loadWords = (s) => s.trim().split(/\r?\n/);
export const data = {
  adjectives: loadWords(adjectives),
  containments: loadWords(containments),
  degraders: loadWords(degraders),
  methods: loadWords(methods),
  nounsOther: loadWords(nounsOther),
  nounsSetlike: loadWords(nounsSetlike),
  theorems: loadWords(theorems),
  uses: loadWords(uses),
};
