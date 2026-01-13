export const postTypes = [
  "Finance",
  "Health",
  "Business",
  "Food",
  "Travel",
  "Lifestyle",
  "Tech",
];

const fallbackAuthors = [
  "Emily Johnson",
  "Michael Chen",
  "Sarah Williams",
  "David Smith",
  "James Wilson",
  "Maria Garcia",
  "Robert Brown",
];

export const getAuthorName = (userId: number): string => {
  return fallbackAuthors[(userId - 1) % fallbackAuthors.length] || fallbackAuthors[0];
};

export async function fetchAuthors(): Promise<string[]> {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users",
      { cache: "force-cache" } // Cache authors as they don't change often
    );
    if (!response.ok) {
      throw new Error("Failed to fetch authors");
    }
    const users = await response.json();
    // Return the first 7 users' names
    return users.slice(0, 7).map((user: any) => user.name);
  } catch (error) {
    console.error("Error fetching authors:", error);
    // Fallback authors if API fails
    return fallbackAuthors;
  }
}
