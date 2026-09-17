export type Language = "ar" | "en";

export type Localized = {
  ar: string;
  en: string;
};

export const L = (
  ar: string,
  en: string
): Localized => ({ ar, en });

export type Question = {
  id: string;
  prompt: Localized;
  options: {
    id: string;
    label: Localized;
  }[];
  correctId: string;
  explanation: Localized;
  source: string;
};

/* المصادر */
const historySource =
  "https://www.mofa.gov.sa/ar/ksa/Pages/history.aspx";

const generalSource =
  "https://www.mofa.gov.sa/ar/ksa/Pages/default.aspx";

const qassimSource =
  "https://www.qassim.gov.sa/";

const turaifSource =
  "https://whc.unesco.org/en/list/1329/";

const alAhsaSource =
  "https://whc.unesco.org/en/list/1563/";

const oilSource =
  "https://www.aramco.com/en/about-us/our-history";

/* اختصارات مصادر الأسئلة التاريخية */
const first = historySource;
const second = historySource;
const unification = historySource;
const founding = historySource;
const national = historySource;

function question(
  id: string,
  prompt: Localized,
  choices: Localized[],
  correct: number,
  explanation: Localized,
  source: string
): Question {
  return {
    id,
    prompt,
    options: choices.map((label, index) => ({
      id: `${id}-${index}`,
      label,
    })),
    correctId: `${id}-${correct}`,
    explanation,
    source,
  };
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
  question("first-state-founder", L("من مؤسس الدولة السعودية الأولى؟","Who founded the First Saudi State?"), [L("الإمام تركي بن عبدالله","Imam Turki bin Abdullah"), L("الإمام محمد بن سعود","Imam Mohammed bin Saud"), L("الملك عبدالعزيز","King Abdulaziz"), L("الإمام فيصل بن تركي","Imam Faisal bin Turki")], 1, L("أسس الإمام محمد بن سعود الدولة السعودية الأولى في الدرعية عام 1727م.","Imam Mohammed bin Saud founded the First Saudi State in Diriyah in 1727."), first),
  question("riyadh-recapture", L("في أي عام استرد الملك عبدالعزيز مدينة الرياض؟","In which year did King Abdulaziz recapture Riyadh?"), [L("1891م","1891"), L("1902م","1902"), L("1927م","1927"), L("1932م","1932")], 1, L("استرد الملك عبدالعزيز مدينة الرياض عام 1902م، وكانت بداية مسيرة توحيد المملكة.","King Abdulaziz recaptured Riyadh in 1902, beginning the journey toward unifying the Kingdom."), unification),
  question("masmak-palace", L("ما القصر المرتبط تاريخيًا باسترداد الرياض؟","Which palace is historically associated with the recapture of Riyadh?"), [L("قصر شبرا","Shubra Palace"), L("قصر المصمك","Al Masmak Palace"), L("قصر المربع","Al Murabba Palace"), L("قصر سلوى","Salwa Palace")], 1, L("يرتبط قصر المصمك باسترداد الملك عبدالعزيز لمدينة الرياض عام 1902م.","Al Masmak Palace is associated with King Abdulaziz’s recapture of Riyadh in 1902."), unification),
  question("flag-day", L("في أي يوم تحتفل المملكة بيوم العلم؟","When does Saudi Arabia celebrate Flag Day?"), [L("11 مارس","11 March"), L("22 فبراير","22 February"), L("23 سبتمبر","23 September"), L("1 يناير","1 January")], 0, L("تحتفل المملكة بيوم العلم في 11 مارس من كل عام.","Saudi Arabia celebrates Flag Day on 11 March each year."), national),
  question("saudi-capital", L("ما عاصمة المملكة العربية السعودية؟","What is the capital of Saudi Arabia?"), [L("جدة","Jeddah"), L("الدمام","Dammam"), L("الرياض","Riyadh"), L("مكة المكرمة","Makkah")], 2, L("الرياض هي عاصمة المملكة العربية السعودية.","Riyadh is the capital of Saudi Arabia."), generalSource),
  question("national-emblem", L("ممَّ يتكوّن شعار المملكة العربية السعودية؟","What does the national emblem of Saudi Arabia consist of?"), [L("نخلة وسيفان متقاطعان","A palm tree and two crossed swords"), L("صقر ونجمة","A falcon and a star"), L("سيف واحد ونخلة","One sword and a palm tree"), L("نخلة وجبلان","A palm tree and two mountains")], 0, L("يتكوّن شعار المملكة من سيفين عربيين متقاطعين تعلوهما نخلة.","The Saudi national emblem consists of two crossed Arabian swords topped by a palm tree."), generalSource),
  question("regions-count", L("كم عدد المناطق الإدارية في المملكة العربية السعودية؟","How many administrative regions does Saudi Arabia have?"), [L("10 مناطق","10 regions"), L("11 منطقة","11 regions"), L("13 منطقة","13 regions"), L("15 منطقة","15 regions")], 2, L("تنقسم المملكة العربية السعودية إداريًا إلى 13 منطقة.","Saudi Arabia is administratively divided into 13 regions."), generalSource),
  question("western-sea", L("ما البحر الذي يحد المملكة العربية السعودية من الغرب؟","Which sea borders Saudi Arabia to the west?"), [L("بحر العرب","Arabian Sea"), L("البحر الأحمر","Red Sea"), L("البحر المتوسط","Mediterranean Sea"), L("الخليج العربي","Arabian Gulf")], 1, L("يحد البحر الأحمر المملكة العربية السعودية من جهة الغرب.","The Red Sea borders Saudi Arabia to the west."), generalSource),
  question("empty-quarter", L("ما اسم الصحراء الشهيرة الواقعة في جنوب المملكة؟","What is the famous desert located in southern Saudi Arabia?"), [L("صحراء النفود","Al Nafud Desert"), L("صحراء الدهناء","Ad-Dahna Desert"), L("الربع الخالي","The Empty Quarter"), L("صحراء نجد","Najd Desert")], 2, L("يقع الربع الخالي في جنوب المملكة، ويُعد من أكبر الصحاري الرملية في العالم.","The Empty Quarter lies in southern Saudi Arabia and is one of the world’s largest sand deserts."), generalSource),
  question("saudi-currency", L("ما العملة الرسمية للمملكة العربية السعودية؟","What is the official currency of Saudi Arabia?"), [L("الدينار","Dinar"), L("الدرهم","Dirham"), L("الريال "," Riyal"), L("الجنيه","Pound")], 2, L("الريال السعودي هو العملة الرسمية للمملكة العربية السعودية.","The Saudi Riyal is the official currency of Saudi Arabia."), generalSource),
  question("first-state-end", L("في أي عام انتهت الدولة السعودية الأولى؟", "In which year did the First Saudi State end?"), [L("1727م", "1727"), L("1824م", "1824"), L("1818م", "1818"), L("1891م", "1891")], 2, L("انتهت الدولة السعودية الأولى عام 1818م بعد حصار الدرعية.", "The First Saudi State ended in 1818 following the siege of Diriyah."), first),
  question("second-state-end", L("في أي عام انتهت الدولة السعودية الثانية؟", "In which year did the Second Saudi State end?"), [L("1818م", "1818"), L("1824م", "1824"), L("1932م", "1932"), L("1891م", "1891")], 3, L("انتهت الدولة السعودية الثانية عام 1891م بعد أن استمرت نحو 69 عامًا.", "The Second Saudi State ended in 1891 after lasting approximately 69 years."), second),
  question("second-last-ruler", L("من آخر حكام الدولة السعودية الثانية؟", "Who was the last ruler of the Second Saudi State?"), [L("الإمام تركي بن عبدالله", "Imam Turki bin Abdullah"), L("الإمام عبدالرحمن بن فيصل", "Imam Abdulrahman bin Faisal"), L("الإمام فيصل بن تركي", "Imam Faisal bin Turki"), L("الملك عبدالعزيز", "King Abdulaziz")], 1, L("كان الإمام عبدالرحمن بن فيصل آخر حكام الدولة السعودية الثانية.", "Imam Abdulrahman bin Faisal was the last ruler of the Second Saudi State."), second),
  question("saudi-ruler-title", L("ما اللقب الذي عُرف به حكام الدولتين السعودية الأولى والثانية؟", "What title was used by the rulers of the First and Second Saudi States?"), [L("السلطان", "Sultan"), L("الأمير", "Prince"), L("الإمام", "Imam"), L("الملك", "King")], 2, L("عُرف حكام الدولتين السعودية الأولى والثانية بلقب الإمام.", "The rulers of the First and Second Saudi States were known by the title Imam."), first),
  question("second-king", L("من تولّى حكم المملكة بعد وفاة الملك عبدالعزيز؟", "Who became King after the death of King Abdulaziz?"), [L("الملك سعود بن عبدالعزيز", "King Saud bin Abdulaziz"), L("الملك فيصل بن عبدالعزيز", "King Faisal bin Abdulaziz"), L("الملك خالد بن عبدالعزيز", "King Khalid bin Abdulaziz"), L("الملك فهد بن عبدالعزيز", "King Fahd bin Abdulaziz")], 0, L("تولى الملك سعود بن عبدالعزيز الحكم بعد وفاة والده الملك عبدالعزيز عام 1953م.", "King Saud bin Abdulaziz assumed the throne after the death of his father, King Abdulaziz, in 1953."), national),
  question("flag-inscription", L("ما العبارة المكتوبة على علم المملكة العربية السعودية؟", "What phrase is written on the flag of Saudi Arabia?"), [L("الله أكبر", "Allah is the Greatest"), L("الشهادتان", "The Shahada"), L("النصر للوطن", "Victory for the Nation"), L("العزة لله", "Glory belongs to Allah")], 1, L("تتوسط علم المملكة الشهادة: لا إله إلا الله محمد رسول الله.", "The Saudi flag bears the Shahada: There is no god but Allah; Muhammad is the Messenger of Allah."), generalSource),
  question("flag-symbol", L("ما الرمز الموجود أسفل الشهادتين في العلم السعودي؟", "Which symbol appears beneath the Shahada on the Saudi flag?"), [L("نخلة", "A palm tree"), L("نجمة", "A star"), L("سيف مسلول", "A drawn sword"), L("صقر", "A falcon")], 2, L("يوجد سيف مسلول أسفل الشهادة في علم المملكة العربية السعودية.", "A drawn sword appears beneath the Shahada on the Saudi flag."), generalSource),
  question("official-language", L("ما اللغة الرسمية للمملكة العربية السعودية؟", "What is the official language of Saudi Arabia?"), [L("اللغة العربية", "Arabic"), L("اللغة الإنجليزية", "English"), L("اللغة الفرنسية", "French"), L("اللغة الفارسية", "Persian")], 0, L("اللغة العربية هي اللغة الرسمية للمملكة العربية السعودية.", "Arabic is the official language of Saudi Arabia."), generalSource),
  question("eastern-sea", L("ما المسطح المائي الذي يحد المملكة من الشرق؟", "Which body of water borders Saudi Arabia to the east?"), [L("البحر الأحمر", "Red Sea"), L("بحر العرب", "Arabian Sea"), L("البحر المتوسط", "Mediterranean Sea"), L("الخليج العربي", "Arabian Gulf")], 3, L("يحد الخليج العربي المملكة العربية السعودية من جهة الشرق.", "The Arabian Gulf borders Saudi Arabia to the east."), generalSource),
  question("holy-mosques", L("في أي مدينتين يقع المسجد الحرام والمسجد النبوي؟", "In which two cities are the Grand Mosque and the Prophet’s Mosque located?"), [L("الرياض والدرعية", "Riyadh and Diriyah"), L("مكة المكرمة والمدينة المنورة", "Makkah and Madinah"), L("جدة والطائف", "Jeddah and Taif"), L("أبها ونجران", "Abha and Najran")], 1, L("يقع المسجد الحرام في مكة المكرمة، ويقع المسجد النبوي في المدينة المنورة.", "The Grand Mosque is in Makkah, and the Prophet’s Mosque is in Madinah."), generalSource),
  question("qassim-capital", L("ما المقر الإداري لمنطقة القصيم؟", "What is the administrative capital of Al-Qassim Region?"), [L("بريدة", "Buraydah"), L("عنيزة", "Unaizah"), L("الرس", "Ar Rass"), L("البكيرية", "Al Bukayriyah")], 0, L("مدينة بريدة هي المقر الإداري لإمارة منطقة القصيم.", "Buraydah is the administrative capital of Al-Qassim Region."), qassimSource),
  question("al-ahsa-region", L("في أي منطقة إدارية تقع واحة الأحساء؟", "In which administrative region is Al-Ahsa Oasis located?"), [L("منطقة الرياض", "Riyadh Region"), L("منطقة القصيم", "Al-Qassim Region"), L("المنطقة الشرقية", "Eastern Region"), L("منطقة تبوك", "Tabuk Region")], 2, L("تقع واحة الأحساء في المنطقة الشرقية من المملكة.", "Al-Ahsa Oasis is located in Saudi Arabia’s Eastern Region."), alAhsaSource),
  question("turaif-location", L("أين يقع حي الطريف التاريخي؟", "Where is the historic At-Turaif District located?"), [L("جدة التاريخية", "Historic Jeddah"), L("الدرعية", "Diriyah"), L("العلا", "AlUla"), L("الأحساء", "Al-Ahsa")], 1, L("يقع حي الطريف التاريخي في الدرعية، وكان مركزًا مهمًا للدولة السعودية الأولى.", "The historic At-Turaif District is located in Diriyah and was an important center of the First Saudi State."), turaifSource),
  question("turaif-unesco", L("في أي عام سُجل حي الطريف في قائمة التراث العالمي؟", "In which year was At-Turaif District inscribed on the World Heritage List?"), [L("2005م", "2005"), L("2008م", "2008"), L("2015م", "2015"), L("2010م", "2010")], 3, L("سُجل حي الطريف في الدرعية ضمن قائمة التراث العالمي لليونسكو عام 2010م.", "At-Turaif District in Diriyah was inscribed on the UNESCO World Heritage List in 2010."), turaifSource),
  question("oil-discovery", L("ما اسم البئر المرتبطة ببداية إنتاج النفط تجاريًا في المملكة؟", "Which well is associated with the beginning of commercial oil production in Saudi Arabia?"), [L("بئر الرياض رقم 1", "Riyadh Well No. 1"), L("بئر الدمام رقم 7", "Dammam Well No. 7"), L("بئر الظهران رقم 3", "Dhahran Well No. 3"), L("بئر الأحساء رقم 5", "Al-Ahsa Well No. 5")], 1, L("حقق بئر الدمام رقم 7 إنتاجًا تجاريًا للنفط عام 1938م، وعُرف لاحقًا باسم بئر الخير.", "Dammam Well No. 7 produced oil commercially in 1938 and later became known as the Prosperity Well."), oilSource),
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
  const shuffled = [...QUESTIONS];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    );

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled.slice(0, 10);
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
