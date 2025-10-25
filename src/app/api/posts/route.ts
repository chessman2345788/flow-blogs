import { MongoClient, WithId, Document } from 'mongodb';
import { NextResponse } from 'next/server';

console.log("\n--- DEBUG: Environment Variables ---");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "FOUND" : "MISSING or EMPTY");
console.log("MONGODB_DB:", process.env.MONGODB_DB ? "FOUND" : "MISSING or EMPTY");
console.log("--- END DEBUG ---\n");
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;


async function connectToDatabase() {

  if (!uri || !dbName) {
    console.error("Database configuration is missing from environment variables."); 
    throw new Error('Database configuration is missing.');
  }
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  console.log("Successfully connected to database:", dbName); 
  return { client, db };
}


export async function GET(request: Request) {
  let client: MongoClient | null = null;
  try {
    const { client: connectedClient, db } = await connectToDatabase();
    client = connectedClient; 

    
    const posts = await db.collection('posts').find({}).sort({ createdAt: -1 }).toArray();
    console.log(`Fetched ${posts.length} posts.`);

    const sanitizedPosts = posts.map(post => ({
        ...post,
        _id: post._id.toString(), 
    }));

    return NextResponse.json(sanitizedPosts, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { message: 'Failed to fetch posts.', error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log("GET request: Database connection closed."); 
    }
  }
}

export async function POST(request: Request) {
  let client: MongoClient | null = null;
  try {
    const postData = await request.json();
    const { client: connectedClient, db } = await connectToDatabase();
    client = connectedClient; 


    const result = await db.collection('posts').insertOne({
      ...postData,
      createdAt: new Date(),
    });
    console.log("Successfully inserted post with ID:", result.insertedId); 

    return NextResponse.json(
      { message: 'Post created successfully!', postId: result.insertedId },
      { status: 201 } 
    );
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      { message: 'Failed to create post.', error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log("POST request: Database connection closed."); 
    }
  }
}