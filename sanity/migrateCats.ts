import { createClient } from "@sanity/client";
import cats from "@/data/cats.json";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2025-02-06",
  token: process.env.SANITY_API_TOKEN, 
});

async function migrateCats() {
  try {
    for (const cat of cats) {
      const doc = {  
        _type: "cat",
        name: cat.name,
        path: cat.path,
        createdAt: cat.createdAt,
        clothes: {
          top: cat.clothes.top,
          bottom: cat.clothes.bottom,
        },
      };

      await client.create(doc); 
      console.log(`✅ Uploaded: ${cat.name}`);
    }
    console.log("All cats uploaded!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrateCats();
