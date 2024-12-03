const data = {"adjectives":["*abelian","*associative","computable","Lebesgue-measurable","semi-decidable","simple","combinatorial","structure-preserving","diagonalizable","nonsingular","*orientable","twice-differentiable","thrice-differentiable","countable","prime","complete","continuous","trivial","3-connected","bipartite","planar","finite","nondeterministic","*alternating","convex","*undecidable","dihedral","context-free","rational","regular","Noetherian","Cauchy","*open","closed","compact","clopen","pointless","perfect","non-degenerate","degenerate","skew-symmetric","sesquilinear","fundamental","smooth","connected","simplicial","universal","greedy","normal","total","left invertible","*exact","*empty"],"intros":["Just biject it to a(n)","Just view the problem as a(n)","The problem is simply isomorphic to a(n)"],"nounsOther":["integer(s)","Turing machine(s)","bijection(s)","generating function(s)","taylor series","linear transformation(s)","pushdown automat[on](a)","combinatorial game(s)","equivalence relation(s)","tournament(s)","random variable(s)","triangulation(s)","unbounded-fan-in circuit(s)","log-space reduction(s)","Markov chain(s)","4-form(s)","7-chain(s)","operator(s)","homeomorphism(s)","color(s)","Betti number(s)","Radon-Nikodym derivative(s)"],"nounsSetlike":["multiset(s)","metric space(s)","group(s)","monoid(s)","semigroup(s)","ring(s)","field(s)","module(s)","topological space(s)","Hilbert space(s)","manifold(s)","hypergraph(s)","DAG(s)","residue class(es)","logistic system(s)","language(s)","poset(s)","algebra(s)","Lie algebra(s)","Dynkin system(s)","sigma-algebra(s)","ultrafilter(s)","Cayley graph(s)","variet[y](ies)","orbit(s)"]};
data["nounsAll"] = data["nounsSetlike"].concat(data["nounsOther"]);

const selectRandom = (list) => {
  let i = Math.floor(Math.random() * list.length);
  return list[i];
};

const produceVariant = (str, isVariant) => {
  return isVariant
    ? str.replaceAll(/\((.*)\)/g, "$1").replaceAll(/\[(.*)\]/g, "")
    : str.replaceAll(/\((.*)\)/g, "").replaceAll(/\[(.*)\]/g, "$1");
};

const extractVowelInfo = (str) => {
  return str.charAt(0) == "*" ? [str.substring(1, str.length), true] : [str, false];
};

const generateTriviality = () => {
  let adj1 = extractVowelInfo(selectRandom(data["adjectives"]));
  let adj2 = extractVowelInfo(selectRandom(data["adjectives"]));
  let noun1 = produceVariant(selectRandom(data["nounsSetlike"]), false);
  let noun2 = produceVariant(selectRandom(data["nounsAll"]), true);
  let intro = produceVariant(selectRandom(data["intros"]), adj1[1]);

  return { intro, adj1: adj1[0], noun1, adj2: adj2[0], noun2 };
};

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
