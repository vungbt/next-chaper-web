import { crawlWebsite } from '@/utils/helpers/crawler';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crawlerUrl = searchParams.get('url');
  if (!crawlerUrl || crawlerUrl.length <= 0) return Response.json([]);
  const response = await crawlWebsite(crawlerUrl);
  if (!response || response.length <= 0) return Response.json([]);

  return Response.json(response);
}
