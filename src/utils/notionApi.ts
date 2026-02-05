/**
 * Notion API integration for fetching events from a Notion database
 */

export interface NotionEvent {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

export interface NotionMember {
  id: string;
  name: string;
  role: string;
  major: string;
  year: string;
  coverImage?: string;
}

/**
 * Helper function to extract cover image URL from a Notion page
 */
function getCoverUrl(page: any): string | undefined {
  if (!page.cover) return undefined;
  if (page.cover.type === "external") return page.cover.external.url;
  if (page.cover.type === "file") return page.cover.file.url;
  return undefined;
}

/**
 * Fetch events from a Notion database
 * Requires:
 * - VITE_NOTION_API_KEY: Your Notion API key
 * - VITE_NOTION_DATABASE_ID: The ID of your events database
 */
export async function fetchEventsFromNotion(): Promise<NotionEvent[]> {
  const apiKey = import.meta.env.VITE_NOTION_API_KEY;
  const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

  console.log("Fetching events from Notion...");
  console.log("API Key set:", !!apiKey);
  console.log("Database ID set:", !!databaseId);

  if (!apiKey || !databaseId) {
    console.error(
      "Missing Notion API configuration. Please set VITE_NOTION_API_KEY and VITE_NOTION_DATABASE_ID environment variables."
    );
    return [];
  }

  try {
    console.log("Making API call to Notion...");
    
    const response = await fetch('/api/notion/query', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
      }),
    });

    console.log("API Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch events from Notion:", response.statusText, errorText);
      return [];
    }

    const data = await response.json();
    console.log("Events received:", data.results.length);
    const events: NotionEvent[] = data.results.map((page: any) => {
      const properties = page.properties;

      // Extract image URL from the Image property (assuming it's a Files property)
      let imageUrl = "";
      if (properties.Image?.files?.length > 0) {
        const file = properties.Image.files[0];
        imageUrl = file.type === "external" ? file.external.url : file.file.url;
      }

      // Extract date from the Date property
      let dateStr = "";
      if (properties.Date?.date?.start) {
        dateStr = properties.Date.date.start;
      }

      return {
        id: page.id,
        name: properties.Name?.title?.[0]?.plain_text || "Untitled Event",
        subtitle: properties.Subtitle?.rich_text?.[0]?.plain_text || "",
        description:
          properties.Description?.rich_text?.[0]?.plain_text || "",
        date: dateStr,
        location: properties.Location?.rich_text?.[0]?.plain_text || "",
        image: imageUrl,
      };
    });

    return events;
  } catch (error) {
    console.error("Error fetching events from Notion:", error);
    return [];
  }
}

export async function fetchMembersFromNotion(
  databaseId: string
): Promise<NotionMember[]> {
  if (!databaseId) {
    console.error(
      "Missing databaseId for members. Please provide a members database id."
    );
    return [];
  }

  try {
    // Always use proxy to avoid CORS issues
    const url = `/api/notion/query?databaseId=${encodeURIComponent(databaseId)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Failed to fetch members from Notion:",
        response.statusText,
        errorText
      );
      return [];
    }

    const data = await response.json();
    const members: NotionMember[] = data.results.map((page: any) => {
      const properties = page.properties;

      const roleSelect = properties.Role?.select?.name;
      const roleMulti = properties.Role?.multi_select
        ?.map((item: any) => item.name)
        .join(", ");
      const roleText = properties.Role?.rich_text?.[0]?.plain_text;
      const role = roleMulti || roleSelect || roleText || "Member";

      const majorSelect = properties.Major?.select?.name;
      const majorMulti = properties.Major?.multi_select
        ?.map((item: any) => item.name)
        .join(", ");
      const majorText = properties.Major?.rich_text?.[0]?.plain_text;
      const major = majorMulti || majorSelect || majorText || "";

      const yearNumber = properties.Year?.number;
      const yearText = properties.Year?.rich_text?.[0]?.plain_text;
      const year = yearNumber ? String(yearNumber) : yearText || "";

      const nameTitle = properties["Member Name"]?.title?.[0]?.plain_text;
      const fallbackName = properties.Name?.title?.[0]?.plain_text;

      // Extract cover image URL using helper function
      const coverImage = getCoverUrl(page);

      return {
        id: page.id,
        name: nameTitle || fallbackName || "",
        role,
        major,
        year,
        coverImage,
      };
    });

    return members;
  } catch (error) {
    console.error("Error fetching members from Notion:", error);
    return [];
  }
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
