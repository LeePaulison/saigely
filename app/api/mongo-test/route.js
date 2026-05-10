import { getMongoDatabase } from "@/lib/db/mongo";

export async function GET() {
  try {
    const database = await getMongoDatabase();

    const collections = await database.listCollections().toArray();

    return Response.json({
      success: true,
      collections,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
