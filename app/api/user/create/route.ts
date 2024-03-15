import { SHA256 as sha256 } from "crypto-js";
// We impot our prisma client
import { prisma } from "@/lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server';

// We hash the user entered password using crypto.js
export const hashPassword = (string: string) => {
  return sha256(string).toString();
};
// function to create user in our database
export async function POST(request: NextRequest) {
  let errors = [];
  const { name, email, password } = await request.json();

  console.log(name, email, password)
 
  if (password.length < 6) {
    errors.push("password length should be more than 6 characters");
    return NextResponse.json({ errors });
  } else {
    try {
      const user = await prisma.user.create({
        data: { ...name, ...email, password: hashPassword(password), createdAt: new Date() },
      });
      return NextResponse.json({ user });
    } catch (e) {
      return NextResponse.json(e);
    }
  }
}