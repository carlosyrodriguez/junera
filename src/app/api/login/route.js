import { getConnection } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'; // Ensure you have this package installed
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.SESSION_SECRET || 'your-secret-key'; // Use environment variables for secrets

export async function POST(req) {
  console.log("POST /api/login");
  try {
    const { username, password } = await req.json();
    const pool = await getConnection();

    const result = await pool.request()
      .input("username", username)
      .query(`SELECT * FROM users WHERE username = @username;`);

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const user = result.recordset[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });

    return NextResponse.json({ token });

  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Error logging in" }, { status: 500 });
  }
}
