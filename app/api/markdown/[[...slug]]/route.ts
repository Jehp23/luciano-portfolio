import { markdownForPath } from "@/lib/agent/content";
import { markdownHeaders } from "@/lib/agent/accept";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await params;
  const pathname = slug.length === 0 ? "/" : `/${slug.join("/")}`;
  const { status, body } = markdownForPath(pathname);

  return new Response(body, {
    status,
    headers: markdownHeaders(),
  });
}
