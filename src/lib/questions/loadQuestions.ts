import domain1 from "../../../data/question-banks/security-plus-domain1.json";
import domain2 from "../../../data/question-banks/security-plus-domain2.json";
import domain3 from "../../../data/question-banks/security-plus-domain3.json";
import domain4 from "../../../data/question-banks/security-plus-domain4.json";
import domain5 from "../../../data/question-banks/security-plus-domain5.json";

export function getQuestions() {
  return [
    ...domain1,
    ...domain2,
    ...domain3,
    ...domain4,
    ...domain5
  ];
}
