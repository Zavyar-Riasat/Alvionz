import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in environment variables!");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log("🔍 [DB] Starting dbConnect()...");

  if (cached.conn) {
    console.log("⚡ [DB] Using cached connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔗 [DB] Creating new MongoDB connection...");
    console.log("🌐 [DB] URI:", MONGODB_URI.replace(/\/\/.*@/, "//****:****@")); 
    // hide credentials

    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ [DB] Successfully connected to MongoDB.");
        console.log("📦 [DB] Host:", mongoose.connection.host);
        console.log("📦 [DB] DB Name:", mongoose.connection.name);
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ [DB] Connection failed!");
        console.error("❌ Error Message:", err.message);
        console.error("❌ Full Error Stack:", err.stack);
        throw err; // rethrow so Next.js catches it
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    console.error("🔥 [DB] Final connection error:", err);
    throw err;
  }
}

export default dbConnect;
