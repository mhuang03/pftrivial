const dataB64 =
  "eyJhZGplY3RpdmVzIjpbIiphYmVsaWFuIiwiKmFsdGVybmF0aW5nIiwiKmFzc29jaWF0aXZlIiwiKmVtcHR5IiwiKmV4YWN0IiwiKm9wZW4iLCIqb3JpZW50YWJsZSIsIip1bmRlY2lkYWJsZSIsIjMtY29ubmVjdGVkIiwiQ2F1Y2h5IiwiTGViZXNndWUtbWVhc3VyYWJsZSIsIk5vZXRoZXJpYW4iLCJiaXBhcnRpdGUiLCJjbG9wZW4iLCJjbG9zZWQiLCJjb21iaW5hdG9yaWFsIiwiY29tcGFjdCIsImNvbXBsZXRlIiwiY29tcHV0YWJsZSIsImNvbm5lY3RlZCIsImNvbnRleHQtZnJlZSIsImNvbnRpbnVvdXMiLCJjb252ZXgiLCJjb3VudGFibGUiLCJkZWdlbmVyYXRlIiwiZGlhZ29uYWxpemFibGUiLCJkaWhlZHJhbCIsImZpbml0ZSIsImZ1bmRhbWVudGFsIiwiZ3JlZWR5IiwibGVmdCBpbnZlcnRpYmxlIiwibm9uLWRlZ2VuZXJhdGUiLCJub25kZXRlcm1pbmlzdGljIiwibm9uc2luZ3VsYXIiLCJub3JtYWwiLCJwZXJmZWN0IiwicGxhbmFyIiwicG9pbnRsZXNzIiwicHJpbWUiLCJyYXRpb25hbCIsInJlZ3VsYXIiLCJzZW1pLWRlY2lkYWJsZSIsInNlc3F1aWxpbmVhciIsInNpbXBsZSIsInNpbXBsaWNpYWwiLCJza2V3LXN5bW1ldHJpYyIsInNtb290aCIsInN0cnVjdHVyZS1wcmVzZXJ2aW5nIiwidGhyaWNlLWRpZmZlcmVudGlhYmxlIiwidG90YWwiLCJ0cml2aWFsIiwidHdpY2UtZGlmZmVyZW50aWFibGUiLCJ1bml2ZXJzYWwiXSwiaW50cm9zIjpbIkp1c3QgYmlqZWN0IGl0IHRvIGEobikiLCJKdXN0IHZpZXcgdGhlIHByb2JsZW0gYXMgYShuKSIsIlRoZSBwcm9ibGVtIGlzIHNpbXBseSBpc29tb3JwaGljIHRvIGEobikiXSwibm91bnNPdGhlciI6WyI0LWZvcm0ocykiLCI3LWNoYWluKHMpIiwiQmV0dGkgbnVtYmVyKHMpIiwiTWFya292IGNoYWluKHMpIiwiUmFkb24tTmlrb2R5bSBkZXJpdmF0aXZlKHMpIiwiVHVyaW5nIG1hY2hpbmUocykiLCJiaWplY3Rpb24ocykiLCJjb2xvcihzKSIsImNvbWJpbmF0b3JpYWwgZ2FtZShzKSIsImVxdWl2YWxlbmNlIHJlbGF0aW9uKHMpIiwiZ2VuZXJhdGluZyBmdW5jdGlvbihzKSIsImhvbWVvbW9ycGhpc20ocykiLCJpbnRlZ2VyKHMpIiwibGluZWFyIHRyYW5zZm9ybWF0aW9uKHMpIiwibG9nLXNwYWNlIHJlZHVjdGlvbihzKSIsIm9wZXJhdG9yKHMpIiwicHVzaGRvd24gYXV0b21hdFtvbl0oYSkiLCJyYW5kb20gdmFyaWFibGUocykiLCJ0YXlsb3Igc2VyaWVzIiwidG91cm5hbWVudChzKSIsInRyaWFuZ3VsYXRpb24ocykiLCJ1bmJvdW5kZWQtZmFuLWluIGNpcmN1aXQocykiXSwibm91bnNTZXRsaWtlIjpbIkNheWxleSBncmFwaChzKSIsIkRBRyhzKSIsIkR5bmtpbiBzeXN0ZW0ocykiLCJIaWxiZXJ0IHNwYWNlKHMpIiwiTGllIGFsZ2VicmEocykiLCJhbGdlYnJhKHMpIiwiZmllbGQocykiLCJncm91cChzKSIsImh5cGVyZ3JhcGgocykiLCJsYW5ndWFnZShzKSIsImxvZ2lzdGljIHN5c3RlbShzKSIsIm1hbmlmb2xkKHMpIiwibWV0cmljIHNwYWNlKHMpIiwibW9kdWxlKHMpIiwibW9ub2lkKHMpIiwibXVsdGlzZXQocykiLCJvcmJpdChzKSIsInBvc2V0KHMpIiwicmVzaWR1ZSBjbGFzcyhlcykiLCJyaW5nKHMpIiwic2VtaWdyb3VwKHMpIiwic2lnbWEtYWxnZWJyYShzKSIsInRvcG9sb2dpY2FsIHNwYWNlKHMpIiwidWx0cmFmaWx0ZXIocykiLCJ2YXJpZXRbeV0oaWVzKSJdfQ==";
const data = JSON.parse(atob(dataB64));
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

  return { intro, adj1: adj1[0], adj2: adj2[0], noun1, noun2 };
};

let t = generateTriviality();
console.log(`Proof is trivial! ${t.intro} ${t.adj1} ${t.noun1} whose elements are ${t.adj2} ${t.noun2}!`);
