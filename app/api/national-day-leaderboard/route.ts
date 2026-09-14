import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("national_day_results")
      .select("player_name, score")
      .order("score", { ascending: false })
      .order("player_name", { ascending: true })
      .limit(100);

    if (error) {
      console.error("Leaderboard database error:", error);

      return NextResponse.json(
        {
          error: "Could not load leaderboard",
          details: error.message,
        },
        { status: 500 }
      );
    }

    const uniquePlayers = new Map<
      string,
      {
        playerName: string;
        score: number;
      }
    >();

    for (const result of data ?? []) {
      const playerName =
        typeof result.player_name === "string"
          ? result.player_name.trim()
          : "";

      const score =
        typeof result.score === "number"
          ? result.score
          : 0;

      if (!playerName) continue;

      const normalizedName =
        playerName.toLocaleLowerCase();

      if (!uniquePlayers.has(normalizedName)) {
        uniquePlayers.set(normalizedName, {
          playerName,
          score,
        });
      }

      if (uniquePlayers.size === 3) {
        break;
      }
    }

    return NextResponse.json(
      {
        leaders: Array.from(uniquePlayers.values()),
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Leaderboard server error:", error);

    return NextResponse.json(
      { error: "Could not load leaderboard" },
      { status: 500 }
    );
  }
}