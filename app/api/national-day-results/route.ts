import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  POINTS_PER_ANSWER,
  QUESTIONS,
} from "@/app/national-day/quiz";
export const dynamic = "force-dynamic";
type SubmittedAnswer = {
  questionId: string;
  selectedId: string | null;
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const attemptId =
      typeof body.attemptId === "string"
        ? body.attemptId
        : "";

    const playerName =
      typeof body.playerName === "string"
        ? body.playerName.trim().slice(0, 40)
        : "";

    const language =
      body.language === "en" ? "en" : "ar";

    const answers: SubmittedAnswer[] =
      Array.isArray(body.answers)
        ? body.answers
        : [];

    if (!UUID_PATTERN.test(attemptId)) {
      return NextResponse.json(
        { error: "Invalid attempt ID" },
        { status: 400 }
      );
    }

    if (!playerName) {
      return NextResponse.json(
        { error: "Player name is required" },
        { status: 400 }
      );
    }

    const answerMap = new Map<string, string | null>();

    for (const answer of answers) {
      if (
        answer &&
        typeof answer.questionId === "string" &&
        (typeof answer.selectedId === "string" ||
          answer.selectedId === null)
      ) {
        answerMap.set(
          answer.questionId,
          answer.selectedId
        );
      }
    }

    const correctAnswers = QUESTIONS.reduce(
      (total, question) => {
        return (
          total +
          (answerMap.get(question.id) ===
          question.correctId
            ? 1
            : 0)
        );
      },
      0
    );

    const score =
      correctAnswers * POINTS_PER_ANSWER;

    const { error } = await supabaseAdmin
      .from("national_day_results")
      .upsert(
        {
          attempt_id: attemptId,
          player_name: playerName,
          score,
          correct_answers: correctAnswers,
          total_questions: QUESTIONS.length,
          language,
        },
        {
          onConflict: "attempt_id",
        }
      );

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Could not save result" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      saved: true,
      score,
      correctAnswers,
      totalQuestions: QUESTIONS.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
