module.exports = async function handler(req: any, res: any) {
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

    const queryBody = JSON.stringify(req.body ?? {});

    // Prefer data_sources query when available (newer API), otherwise fall back
    let queryResponse: Response | null = null;

    if (dataSourceId) {
      queryResponse = await fetch(
        `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${notionApiKey}`,
            "Notion-Version": "2025-09-03",
            "Content-Type": "application/json",
          },
          body: queryBody,
        }
      );
    }

    if (!queryResponse || !queryResponse.ok) {
      // Fallback to legacy database query endpoint
      if (queryResponse) {
        const dataSourceError = await queryResponse.text();
        console.error(
          `Data source query failed for ${notionDatabaseId}:`,
          queryResponse.status,
          dataSourceError
        );
      }

      queryResponse = await fetch(
        `https://api.notion.com/v1/databases/${notionDatabaseId}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${notionApiKey}`,
            "Notion-Version": "2025-09-03",
            "Content-Type": "application/json",
          },
          body: queryBody,
        }
      );
    }

    const responseText = await queryResponse.text();

    if (!queryResponse.ok) {
      console.error(
        `Database query failed for ${notionDatabaseId}:`,
        queryResponse.status,
        responseText
      );
      return res.status(queryResponse.status).json({
        error: responseText || "Notion query failed",
      });
    }

    // Forward the response status and data
    res.status(queryResponse.status).json(JSON.parse(responseText));
  } catch (error) {
    console.error("Notion API error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
