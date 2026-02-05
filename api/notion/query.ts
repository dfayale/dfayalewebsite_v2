import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get environment variables
  const notionApiKey = process.env.VITE_NOTION_API_KEY;
  let notionDatabaseId = process.env.VITE_NOTION_DATABASE_ID;

  // Allow databaseId to be passed as a query parameter (for fetchMembersFromNotion)
  if (req.query.databaseId && typeof req.query.databaseId === "string") {
    notionDatabaseId = req.query.databaseId;
  }

  if (!notionApiKey) {
    console.error("Missing VITE_NOTION_API_KEY environment variable");
    return res.status(500).json({ error: "Missing VITE_NOTION_API_KEY" });
  }

  if (!notionDatabaseId) {
    console.error("Missing VITE_NOTION_DATABASE_ID environment variable");
    return res.status(500).json({ error: "Missing VITE_NOTION_DATABASE_ID" });
  }

  try {
    // First, get the data_source_id from the database
    const dbResponse = await fetch(
      `https://api.notion.com/v1/databases/${notionDatabaseId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Notion-Version": "2025-09-03",
        },
      }
    );

    if (!dbResponse.ok) {
      const dbError = await dbResponse.text();
      console.error(
        `Failed to fetch database info for ${notionDatabaseId}:`,
        dbResponse.status,
        dbError
      );
      return res.status(dbResponse.status).json({
        error: `Failed to fetch database info: ${dbError}`,
      });
    }

    const dbData = await dbResponse.json();
    const dataSourceId = dbData?.data_sources?.[0]?.id;

    if (!dataSourceId) {
      console.error(
        `No data_sources found for database ${notionDatabaseId}. Response:`,
        JSON.stringify(dbData)
      );
      return res.status(500).json({
        error:
          "No data_sources found. Ensure this is a regular database (not linked/wiki) and shared with the integration.",
      });
    }

    // Now query the data source with the request body
    const queryResponse = await fetch(
      `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Notion-Version": "2025-09-03",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const responseData = await queryResponse.json();

    // Forward the response status and data
    res.status(queryResponse.status).json(responseData);
  } catch (error) {
    console.error("Notion API error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
