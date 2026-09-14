"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, Check, ChevronDown, Clock3, Flag, RotateCcw, Sparkles, Trophy, X } from "lucide-react";
import { ibmPlexArabic, saudiFont } from "../fonts";
import { gameReducer, INITIAL_STATE, newQuestions, POINTS_PER_ANSWER, QUESTIONS, type Language } from "./quiz";
import "./national-day.css";
type LeaderboardEntry = {
  playerName: string;
  score: number;
};
export default function NationalDayPage() {
  const [language, setLanguage] = useState<Language>("ar");
  const [name, setName] = useState("");
  const [seconds, setSeconds] = useState(20);
  const [nameError, setNameError] = useState(false);
  const [attemptId, setAttemptId] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const savedAttemptRef = useRef("");
  const t = (ar: string, en: string) => language === "ar" ? ar : en;
  const direction = language === "ar" ? "rtl" : "ltr";
  const HeadingArrow = language === "ar" ? ArrowLeft : ArrowRight;
  const question = state.questions[state.index];
  const answer = state.answers[state.index];
  const correctCount = state.answers.filter(a => a.correct).length;
  const timedOutCount = state.answers.filter(a => a.timedOut).length;
  const score = correctCount * POINTS_PER_ANSWER;
  const maxScore = QUESTIONS.length * POINTS_PER_ANSWER;
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
const [leadersLoading, setLeadersLoading] = useState(true);
const [leaderboardRefresh, setLeaderboardRefresh] = useState(0);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-language");
      if (saved === "ar" || saved === "en") setLanguage(saved);
    } catch { /* The game also works without browser storage. */ }
  }, []);

  useEffect(() => {
    if (state.stage !== "playing" || answer || state.deadline === null || !question) return;
    const tick = () => dispatch({ type: "TICK", questionId: question.id, now: Date.now() });
    tick();
    const interval = window.setInterval(tick, 200);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [state.stage, state.deadline, question, answer]);

  useEffect(() => {
    if (state.stage !== "intro") titleRef.current?.focus();
  }, [state.stage, state.index]);
useEffect(() => {
  if (
    state.stage !== "results" ||
    !attemptId ||
    savedAttemptRef.current === attemptId
  ) {
    return;
  }

  const controller = new AbortController();

  async function saveResult() {
    try {
      setSaveStatus("saving");
      const response = await fetch("/api/national-day-results", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  signal: controller.signal,
  body: JSON.stringify({
    attemptId,
    playerName: state.name,
    language,
    answers: state.answers.map((answer) => ({
      questionId: answer.questionId,
      selectedId: answer.selectedId,
    })),
  }),
});

const responseText = await response.text();

if (!response.ok) {
  console.error(
    "Save result failed:",
    response.status,
    responseText
  );

  throw new Error("Could not save result");
}

savedAttemptRef.current = attemptId;
setSaveStatus("saved");
setLeaderboardRefresh((current) => current + 1);

 

      // يوثّق أن هذه المحاولة حُفظت لمنع إرسالها مرة ثانية

    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      setSaveStatus("error");
    }
  }

  saveResult();

  return () => {
    controller.abort();
  };
}, [
  state.stage,
  state.name,
  state.answers,
  attemptId,
  language,
]);
useEffect(() => {
  const controller = new AbortController();

  async function loadLeaderboard() {
    try {
      setLeadersLoading(true);

      const response = await fetch(
        "/api/national-day-leaderboard",
        {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Leaderboard request failed:",
          response.status,
          errorText
        );

        setLeaders([]);
        return;
      }

      const data = (await response.json()) as {
        leaders?: LeaderboardEntry[];
      };

      setLeaders(
        Array.isArray(data.leaders)
          ? data.leaders
          : []
      );
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error("Leaderboard error:", error);
      setLeaders([]);
    } finally {
      if (!controller.signal.aborted) {
        setLeadersLoading(false);
      }
    }
  }

  loadLeaderboard();

  return () => {
    controller.abort();
  };
}, [leaderboardRefresh]);
  const toggleLanguage = () => {
    const next = language === "ar" ? "en" : "ar";
    setLanguage(next);
    try { localStorage.setItem("portfolio-language", next); } catch {}
  };
  const start = () => {
    if (!name.trim()) { setNameError(true); return; }
    setNameError(false);
    setAttemptId(crypto.randomUUID()); setSaveStatus("idle");
    dispatch({ type: "START", name, seconds, questions: newQuestions(), now: Date.now() });
  };

  return (
    <div className={`nd-page ${ibmPlexArabic.className}`} dir={direction} lang={language} style={language === "en" ? { fontFamily: "Arial, Helvetica, sans-serif" } : undefined}>
      <div className="nd-glow nd-glow-one" aria-hidden="true" />
      <div className="nd-glow nd-glow-two" aria-hidden="true" />
      <header className="nd-header">
        <div className="nd-header-inner">
          <Link href="/" className="nd-brand" aria-label={t("العودة إلى معرض أعمال فهد الفهيد", "Back to Fahad Alfehaid’s portfolio")}>
            <Image src="/brand-emblem.png" alt="" width={70} height={60} className="nd-logo" />
            <span className={language === "ar" ? saudiFont.className : undefined}>{t("فهد الفهيد", "Fahad Alfehaid")}</span>
          </Link>
          <button className="nd-language" onClick={toggleLanguage} type="button" aria-label={t("Switch to English", "التبديل إلى العربية")}>
            <span dir={language === "ar" ? "ltr" : "rtl"} lang={language === "ar" ? "en" : "ar"}>{t("English", "العربية")}</span>
          </button>
        </div>
      </header>

      <main className="nd-main">
        <Link href="/" className="nd-back">{language === "ar" ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}{t("العودة إلى معرض الأعمال", "Back to portfolio")}</Link>

        {state.stage === "intro" && (
          <div className="nd-intro nd-enter">
            <section className="nd-intro-copy">
              <p className="nd-eyebrow"><Flag size={16} />{t("احتفاءً باليوم الوطني السعودي", "Celebrating Saudi National Day")}</p>
                <h1
                  className={
                    language === "ar"
                      ? `${saudiFont.className} nd-heading-ar`
                      : "nd-heading-en"
                  }
                >
                  <span className="nd-heading-line">
                    {t("قدّها؟", "Up for a challenge?")}
                  </span>

                  <span className="nd-heading-line nd-gradient">
                    {t(
                      "اختبر معرفتك بوطنك.",
                      "Test your Saudi knowledge."
                    )}
                  </span>
                </h1>
              <p className="nd-lead">{t("من الدرعية إلى توحيد المملكة… رحلة قصيرة في تاريخ وطن نعتز به. اكتب اسمك وابدأ التحدّي!", "From Diriyah to the unification of the Kingdom: a short journey through Saudi history. Enter your name and take the challenge!")}</p>
              <div className="nd-intro-stats">
                <div><strong dir="ltr">10</strong><span>{t("أسئلة وطنية", "history questions")}</span></div>
                <div><strong dir="ltr">4</strong><span>{t("خيارات لكل سؤال", "choices per question")}</span></div>
                <div><strong dir="ltr">100</strong><span>{t("نقطة تنتظرك", "points to earn")}</span></div>
              </div>
              <p className="nd-note"><Sparkles size={16} />{t("كل إجابة فرصة تعرف فيها وطنك أكثر.", "Every answer is a chance to learn more.")}</p>
            </section>
            <section className="nd-card nd-welcome" aria-labelledby="welcome-title">
              <div className="nd-icon-box"><Trophy size={26} /></div>
              <h2 id="welcome-title">{t("خلّنا نعرف بطل التحدّي", "Meet our next challenger")}</h2>
              <p className="nd-muted">{t("اسمك بيظهر في النتيجة النهائية.", "Your name will appear on your final result.")}</p>
              <form onSubmit={event => { event.preventDefault(); start(); }}>
                <label htmlFor="player-name">{t("اسمك أو لقبك", "Your name or nickname")}</label>
                <input id="player-name" autoComplete="nickname" dir="auto" maxLength={40} required value={name} onChange={e => { setName(e.target.value); setNameError(false); }} placeholder={t("مثال: فهد", "e.g. Fahad")} aria-invalid={nameError} aria-describedby={nameError ? "name-error" : undefined} />
                {nameError && <p id="name-error" role="alert" className="nd-error">{t("اكتب اسمك أولًا عشان نبدأ.", "Enter your name to get started.")}</p>}
                <label htmlFor="question-time">{t("الوقت لكل سؤال", "Time per question")}</label>
                <div className="nd-select"><select id="question-time" value={seconds} onChange={e => setSeconds(Number(e.target.value))}>
                  <option value={20}>{t("20 ثانية — التحدّي المعتاد", "20 seconds — standard challenge")}</option>
                  <option value={40}>{t("40 ثانية — خذ راحتك", "40 seconds — take your time")}</option>
                  <option value={0}>{t("بدون مؤقت — تعلّم على مهلك", "No timer — learn at your own pace")}</option>
                </select><ChevronDown size={16} aria-hidden="true" /></div>
                <p className="nd-rules">{t("10 نقاط لكل إجابة صحيحة. عند انتهاء الوقت يُحسب السؤال بلا نقاط، وتظهر لك الإجابة الصحيحة.", "Earn 10 points for every correct answer. If time runs out, the question earns no points and the correct answer is revealed.")}</p>
                <button className="nd-primary" type="submit">{t("ابدأ التحدّي", "Start the challenge")}<HeadingArrow size={18} /></button>
              </form>
            </section>
          </div>
        )}

        {state.stage === "playing" && question && (
          <section className="nd-game nd-enter" aria-label={t("التحدّي الوطني", "National Day challenge")}>
            <div className="nd-game-top">
              <div><p className="nd-eyebrow"><Flag size={15} />{t("تحدّي اليوم الوطني", "National Day Challenge")}</p><p className="nd-player">{t("قدّها يا", "You’ve got this,")} <bdi>{state.name}</bdi></p></div>
              <div className="nd-score"><Trophy size={18} /><strong dir="ltr">{score}</strong><span>{t("نقطة", "points")}</span></div>
            </div>
            <div className="nd-progress-label"><span>{t("السؤال", "Question")} <bdi>{state.index + 1} / {state.questions.length}</bdi></span><span>{t("كل معلومة تفرق", "Every fact counts")}</span></div>
            <div className="nd-progress" role="progressbar" aria-label={t("الأسئلة المكتملة", "Completed questions")} aria-valuenow={state.answers.length} aria-valuemin={0} aria-valuemax={state.questions.length}><div style={{ width: `${state.answers.length / state.questions.length * 100}%` }} /></div>
            <div className="nd-card nd-question-card" key={question.id}>
              <div className="nd-question-top"><span className="nd-kicker">{t("اختر إجابة واحدة", "Choose one answer")}</span><div className={`nd-timer ${state.remaining <= 5 && state.seconds > 0 && !answer ? "nd-timer-urgent" : ""}`} role="timer" aria-label={t("الوقت المتبقي", "Time remaining")}><Clock3 size={17} /><bdi>{state.seconds === 0 ? t("بدون مؤقت", "Untimed") : `${state.remaining} ${t("ث", "s")}`}</bdi></div></div>
              <h1 tabIndex={-1} ref={titleRef} className="nd-question-title">{question.prompt[language]}</h1>
              <div className="nd-options">
                {question.options.map((option, i) => {
                  const isCorrect = !!answer && option.id === question.correctId;
                  const isWrong = !!answer && option.id === answer.selectedId && !answer.correct;
                  return <button key={option.id} type="button" disabled={!!answer} className={`nd-option ${isCorrect ? "nd-option-correct" : ""} ${isWrong ? "nd-option-wrong" : ""}`} onClick={() => dispatch({ type: "ANSWER", questionId: question.id, selectedId: option.id, now: Date.now() })}>
                    <span className="nd-option-letter" aria-hidden="true">{language === "ar" ? ["أ", "ب", "ج", "د"][i] : ["A", "B", "C", "D"][i]}</span><span>{option.label[language]}</span>{isCorrect && <Check size={19} aria-label={t("الإجابة الصحيحة", "Correct answer")} />}{isWrong && <X size={19} aria-label={t("إجابتك غير صحيحة", "Your answer is incorrect")} />}
                  </button>;
                })}
              </div>
              {answer && <div className="nd-feedback" role="status">
                <strong>{answer.correct ? t("إجابة صحيحة! +10 نقاط", "Correct! +10 points") : answer.timedOut ? t("انتهى الوقت، تعلّمها للتحدّي الجاي!", "Time’s up. One to remember for next time!") : t("محاولة جيدة، وهذه المعلومة الصحيحة:", "Good try. Here’s the correct fact:")}</strong>
                <p>{question.explanation[language]}</p>
                <a href={question.source} target="_blank" rel="noopener noreferrer">{t("مصدر المعلومة: سعوديبيديا", "Source: Saudipedia (Arabic)")}</a>
              </div>}
              <div className="nd-question-bottom"><span>{t("تاريخنا يستحق نعرفه.", "Our history is worth knowing.")}</span><button className="nd-primary" type="button" disabled={!answer} onClick={() => dispatch({ type: "NEXT", questionId: question.id, now: Date.now() })}>{state.index === state.questions.length - 1 ? t("شوف نتيجتك", "See your result") : t("السؤال التالي", "Next question")}<HeadingArrow size={17} /></button></div>
            </div>
          </section>
        )}

        {state.stage === "results" && (
          <section className="nd-results nd-enter">
            <div className="nd-card nd-result-card">
              <div className="nd-result-icon"><Award size={42} /></div>
              <p className="nd-eyebrow">{t("اكتملت رحلتك في تاريخ الوطن", "Your journey through Saudi history is complete")}</p>
              <h1 ref={titleRef} tabIndex={-1} className={language === "ar" ? saudiFont.className : undefined}>{t("يعطيك العافية يا", "Well played,")} <bdi>{state.name}</bdi>!</h1>
              <p className="nd-result-message">{score >= 80 ? t("معرفتك ترفع الراس!", "Impressive knowledge!") : score >= 50 ? t("نتيجة جميلة، وباقي التاريخ ينتظرك.", "A good result. There’s more history to discover.") : t("كل بداية تعلّم… جرّب مرة ثانية!", "Every start is a chance to learn. Try again!")}</p>
              <div className="nd-final-score" dir="ltr"><strong className="nd-gradient">{score}</strong><span>/ {maxScore}</span></div>
             <p className="nd-muted">
              {t("نقاطك في هذا التحدّي", "Your score in this challenge")}
              </p>

              <div
                className="mt-4 min-h-5 text-sm"
                role="status"
                aria-live="polite"
              >
                {saveStatus === "saving" && (
                  <p className="text-white/50">
                    {t("جاري حفظ نتيجتك...", "Saving your result...")}
                  </p>
                )}

                {saveStatus === "saved" && (
                  <p className="text-[#8fc79f]">
                    {t(
                      "تم حفظ اسمك ونتيجتك بنجاح",
                      "Your name and result were saved successfully"
                    )}
                  </p>
                )}

                {saveStatus === "error" && (
                  <p className="text-red-300">
                    {t(
                      "تعذر حفظ النتيجة، حاول مرة أخرى",
                      "Could not save your result"
                    )}
                  </p>
                )}
              </div>

              <div className="nd-result-stats">
                <div>
                  <strong>{correctCount}</strong>
                  <span>{t("إجابات صحيحة", "correct")}</span>
                </div>

                <div>
                  <strong>
                    {state.answers.length - correctCount - timedOutCount}
                  </strong>
                  <span>{t("إجابات خاطئة", "incorrect")}</span>
                </div>

                <div>
                  <strong>{timedOutCount}</strong>
                  <span>{t("انتهى وقتها", "timed out")}</span>
                </div>
              </div>
              <div className="nd-result-actions"><button className="nd-primary" type="button" onClick={start}><RotateCcw size={17} />{t("تحدّي جديد", "Play again")}</button><button className="nd-secondary" type="button" onClick={() => dispatch({ type: "RESET" })}>{t("تغيير الاسم أو الوقت", "Change name or timer")}</button></div>
              <Link href="/" className="nd-result-home">{t("تعرّف على مشاريعي", "Explore my portfolio")}<HeadingArrow size={16} /></Link>
            </div>
            <details className="nd-review"><summary>{t("راجع إجاباتك", "Review your answers")}<ChevronDown size={18} /></summary><div>{state.questions.map((q, i) => { const a = state.answers[i]; return <article key={q.id}><h2>{i + 1}. {q.prompt[language]}</h2><p className={a.correct ? "nd-review-correct" : "nd-review-wrong"}>{a.timedOut ? t("انتهى الوقت", "Time ran out") : `${t("إجابتك:", "Your answer:")} ${q.options.find(o => o.id === a.selectedId)?.label[language] ?? ""}`}</p><p>{q.explanation[language]}</p><a href={q.source} target="_blank" rel="noopener noreferrer">{t("المصدر", "Source")}</a></article>; })}</div></details>
          </section>
        )}
        {(state.stage === "intro" ||
  state.stage === "results") && (
  <section
    className="mx-auto mt-8 w-full max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6"
    aria-labelledby="leaderboard-title"
  >
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-medium text-[#5b93e6]">
          {t("أفضل النتائج", "Top scores")}
        </p>

        <h2
          id="leaderboard-title"
          className={`mt-1 text-xl font-bold text-white ${
            language === "ar"
              ? saudiFont.className
              : ""
          }`}
        >
          {t(
            "لوحة المتصدرين",
            "Leaderboard"
          )}
        </h2>
      </div>

      <Trophy
        size={24}
        className="text-[#d8b56d]"
        aria-hidden="true"
      />
    </div>

    {leadersLoading ? (
      <p className="py-4 text-center text-sm text-white/45">
        {t(
          "جاري تحميل أفضل النتائج...",
          "Loading top scores..."
        )}
      </p>
    ) : leaders.length === 0 ? (
      <p className="py-4 text-center text-sm text-white/45">
        {t(
          "كن أول المتصدرين!",
          "Be the first player on the leaderboard!"
        )}
      </p>
    ) : (
      <ol className="space-y-3">
        {leaders.map((leader, index) => (
          <li
            key={`${leader.playerName}-${index}`}
            className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                index === 0
                  ? "bg-[#d8b56d]/20 text-[#f0d9a8]"
                  : index === 1
                    ? "bg-white/10 text-white/75"
                    : "bg-[#a76f45]/20 text-[#d49a70]"
              }`}
              aria-label={`${t("المركز", "Position")} ${index + 1}`}
            >
              {index + 1}
            </span>

            <bdi className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
              {leader.playerName}
            </bdi>

            <strong
              dir="ltr"
              className="shrink-0 text-sm text-[#8fc79f]"
            >
              {leader.score}{" "}
              <span className="font-normal text-white/40">
                {t("نقطة", "pts")}
              </span>
            </strong>
          </li>
        ))}
      </ol>
    )}
  </section>
)}
      </main>
      <footer className="nd-footer"><span>{t("صُنع بشغف في السعودية", "Made with passion in Saudi Arabia")}</span><span>© 2026 {t("فهد الفهيد", "Fahad Alfehaid")}</span></footer>
    </div>
  );
}
