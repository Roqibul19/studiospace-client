import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// Runs on the server so the imgbb key is never sent to the browser.
export async function POST(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json(
      { message: "Please login to upload an image." },
      { status: 401 },
    );
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Image upload is not set up yet. Please paste an image URL." },
      { status: 503 },
    );
  }

  let file;
  try {
    file = (await request.formData()).get("image");
  } catch {
    file = null;
  }
  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "Please choose an image file." },
      { status: 400 },
    );
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { message: "Please choose a JPG, PNG, WEBP or GIF image." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { message: "Please choose an image smaller than 5 MB." },
      { status: 400 },
    );
  }

  const form = new FormData();
  form.append("image", Buffer.from(await file.arrayBuffer()).toString("base64"));

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      { method: "POST", body: form, cache: "no-store" },
    );
    const result = await response.json();
    const url = result?.data?.url;
    if (!response.ok || !url) {
      throw new Error(`imgbb responded with status ${response.status}`);
    }
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Image upload failed:", error.message);
    return NextResponse.json(
      { message: "Image upload failed. Please try again or paste an image URL." },
      { status: 502 },
    );
  }
}
