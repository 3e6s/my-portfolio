export type Language = "ar" | "en";
export type Localized = { ar: string; en: string };
export const L = (ar: string, en: string): Localized => ({ ar, en });
export type Question = {
  id: string;
  prompt: Localized;
  options: { id: string; label: Localized }[];
  correctId: string;
  explanation: Localized;
  source: string;
};
const first = "https://saudipedia.com/الدولة-السعودية-الأولى";
const second = "https://saudipedia.com/الدولة-السعودية-الثانية";
const national = "https://saudipedia.com/اليوم-الوطني-السعودي";
const founding = "https://saudipedia.com/يوم-التأسيس-السعودي";
const unification = "https://saudipedia.com/article/17291/تاريخ/تاريخ-المملكة-العربية-السعودية/متى-أعلن-توحيد-المملكة-العربية-السعودية-رسميا";
function question(id: string, prompt: Localized, choices: Localized[], correct: number, explanation: Localized, source: string): Question {
  return { id, prompt, options: choices.map((label, i) => ({ id: `${id}-${i}`, label })), correctId: `${id}-${correct}`, explanation, source };
}
export const QUESTIONS: Question[] = [
  question("second-founder", L("من مؤسس الدولة السعودية الثانية؟", "Who founded the Second Saudi State?"), [L("الإمام محمد بن سعود", "Imam Mohammed bin Saud"), L("الإمام تركي بن عبدالله", "Imam Turki bin Abdullah"), L("الملك عبدالعزيز بن عبدالرحمن", "King Abdulaziz bin Abdulrahman"), L("الإمام فيصل بن تركي", "Imam Faisal bin Turki")], 1, L("أسس الإمام تركي بن عبدالله الدولة السعودية الثانية عام 1824م، واتخذ الرياض عاصمة لها.", "Imam Turki bin Abdullah founded the Second Saudi State in 1824, with Riyadh as its capital."), second),
  question("national-date", L("متى نحتفل باليوم الوطني السعودي من كل عام؟", "When is Saudi National Day celebrated each year?"), [L("22 فبراير", "22 February"), L("11 مارس", "11 March"), L("23 سبتمبر", "23 September"), L("23 نوفمبر", "23 November")], 2, L("يوافق اليوم الوطني السعودي 23 سبتمبر، احتفاءً بذكرى توحيد المملكة.", "Saudi National Day falls on 23 September and commemorates the Kingdom’s unification."), national),
  question("first-capital", L("ما عاصمة الدولة السعودية الأولى؟", "What was the capital of the First Saudi State?"), [L("الرياض", "Riyadh"), L("جدة", "Jeddah"), L("مكة المكرمة", "Makkah"), L("الدرعية", "Diriyah")], 3, L("كانت الدرعية عاصمة الدولة السعودية الأولى، ومنها انطلقت مسيرة تأسيسها.", "Diriyah was the capital of the First Saudi State and the starting point of its establishment."), first),
  question("kingdom-founder", L("من مؤسس المملكة العربية السعودية وموحّدها؟", "Who founded and unified the Kingdom of Saudi Arabia?"), [L("الملك عبدالعزيز بن عبدالرحمن", "King Abdulaziz bin Abdulrahman"), L("الملك سعود بن عبدالعزيز", "King Saud bin Abdulaziz"), L("الملك فيصل بن عبدالعزيز", "King Faisal bin Abdulaziz"), L("الإمام تركي بن عبدالله", "Imam Turki bin Abdullah")], 0, L("وحّد الملك عبدالعزيز بن عبدالرحمن آل سعود البلاد تحت اسم المملكة العربية السعودية.", "King Abdulaziz bin Abdulrahman Al Saud unified the country under the name Kingdom of Saudi Arabia."), unification),
  question("first-year", L("في أي عام ميلادي تأسست الدولة السعودية الأولى؟", "In which year was the First Saudi State founded?"), [L("1824م", "1824"), L("1902م", "1902"), L("1727م", "1727"), L("1932م", "1932")], 2, L("تأسست الدولة السعودية الأولى عام 1727م على يد الإمام محمد بن سعود.", "Imam Mohammed bin Saud founded the First Saudi State in 1727."), first),
  question("second-capital", L("ما عاصمة الدولة السعودية الثانية؟", "What was the capital of the Second Saudi State?"), [L("الدرعية", "Diriyah"), L("الرياض", "Riyadh"), L("حائل", "Hail"), L("الطائف", "Taif")], 1, L("اختار الإمام تركي بن عبدالله الرياض عاصمة للدولة السعودية الثانية.", "Imam Turki bin Abdullah chose Riyadh as the capital of the Second Saudi State."), second),
  question("founding-date", L("في أي يوم نحتفل بيوم التأسيس السعودي؟", "On which date is Saudi Founding Day celebrated?"), [L("23 سبتمبر", "23 September"), L("11 مارس", "11 March"), L("1 يناير", "1 January"), L("22 فبراير", "22 February")], 3, L("يوم التأسيس هو 22 فبراير، ويخلّد ذكرى تأسيس الدولة السعودية الأولى عام 1727م.", "Founding Day is 22 February, commemorating the establishment of the First Saudi State in 1727."), founding),
  question("unification-year", L("في أي عام ميلادي توحّدت البلاد باسم المملكة العربية السعودية؟", "In which year was the country unified as the Kingdom of Saudi Arabia?"), [L("1932م", "1932"), L("1927م", "1927"), L("1902م", "1902"), L("1824م", "1824")], 0, L("بدأ العمل باسم المملكة العربية السعودية في 23 سبتمبر 1932م في عهد الملك عبدالعزيز.", "The name Kingdom of Saudi Arabia took effect on 23 September 1932 during King Abdulaziz’s reign."), unification),
  question("second-year", L("في أي عام ميلادي تأسست الدولة السعودية الثانية؟", "In which year was the Second Saudi State founded?"), [L("1727م", "1727"), L("1818م", "1818"), L("1824م", "1824"), L("1932م", "1932")], 2, L("تأسست الدولة السعودية الثانية عام 1824م بقيادة الإمام تركي بن عبدالله.", "The Second Saudi State was established in 1824 under Imam Turki bin Abdullah."), second),
  question("national-meaning", L("ما المناسبة التي يخلّدها اليوم الوطني السعودي؟", "What does Saudi National Day commemorate?"), [L("تأسيس الدولة السعودية الأولى", "The founding of the First Saudi State"), L("توحيد المملكة العربية السعودية", "The unification of the Kingdom of Saudi Arabia"), L("تأسيس الدولة السعودية الثانية", "The founding of the Second Saudi State"), L("اعتماد يوم العلم", "The designation of Flag Day")], 1, L("اليوم الوطني يخلّد توحيد المملكة، بينما يخلّد يوم التأسيس بداية الدولة السعودية الأولى.", "National Day commemorates the Kingdom’s unification; Founding Day commemorates the beginning of the First Saudi State."), national),
];
export const POINTS_PER_ANSWER = 10;
export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
export function newQuestions(): Question[] {
  return shuffle(QUESTIONS).map(q => ({ ...q, options: shuffle(q.options) }));
}
export type Answer = { questionId: string; selectedId: string | null; correct: boolean; timedOut: boolean };
export type GameState = {
  stage: "intro" | "playing" | "results";
  name: string;
  seconds: number;
  questions: Question[];
  index: number;
  answers: Answer[];
  deadline: number | null;
  remaining: number;
};
export const INITIAL_STATE: GameState = { stage: "intro", name: "", seconds: 20, questions: [], index: 0, answers: [], deadline: null, remaining: 20 };
export type Action =
  | { type: "START"; name: string; seconds: number; questions: Question[]; now: number }
  | { type: "ANSWER"; questionId: string; selectedId: string; now: number }
  | { type: "TICK"; questionId: string; now: number }
  | { type: "NEXT"; questionId: string; now: number }
  | { type: "RESET" };
export function gameReducer(state: GameState, action: Action): GameState {
  if (action.type === "RESET") return { ...INITIAL_STATE };
  if (action.type === "START") {
    const name = action.name.trim().slice(0, 40);
    if (state.stage === "playing" || !name || !action.questions.length || ![0, 20, 40].includes(action.seconds)) return state;
    return { ...INITIAL_STATE, stage: "playing", name, questions: action.questions, seconds: action.seconds, remaining: action.seconds, deadline: action.seconds ? action.now + action.seconds * 1000 : null };
  }
  const q = state.questions[state.index];
  if (state.stage !== "playing" || !q || action.questionId !== q.id) return state;
  const answered = !!state.answers[state.index];
  if (action.type === "NEXT") {
    if (!answered) return state;
    if (state.index === state.questions.length - 1) return { ...state, stage: "results", deadline: null };
    return { ...state, index: state.index + 1, remaining: state.seconds, deadline: state.seconds ? action.now + state.seconds * 1000 : null };
  }
  if (answered) return state;
  const expired = state.deadline !== null && action.now >= state.deadline;
  if (expired) return { ...state, remaining: 0, answers: [...state.answers, { questionId: q.id, selectedId: null, correct: false, timedOut: true }] };
  if (action.type === "TICK") return state.deadline === null ? state : { ...state, remaining: Math.max(0, Math.ceil((state.deadline - action.now) / 1000)) };
  if (!q.options.some(o => o.id === action.selectedId)) return state;
  return { ...state, answers: [...state.answers, { questionId: q.id, selectedId: action.selectedId, correct: action.selectedId === q.correctId, timedOut: false }] };
}
