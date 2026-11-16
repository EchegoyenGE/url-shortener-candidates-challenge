import { redirect } from "react-router";
import type { Route } from "./+types/s.$code";
import { shortenerApp, toErrorResponse } from "@url-shortener/engine";

export async function loader({ params }: Route.LoaderArgs) {
  const { code } = params;

  try {
    const shortUrl = await shortenerApp.resolveAndTrackClick.execute(code);
    return redirect(shortUrl.originalUrl);
  } catch (error) {
    throw toErrorResponse(error);
  }
}
