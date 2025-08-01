import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { salt, type, name, birthDate, address, phoneNumber, email, userName, passwordHash, credit, bankCard, permission } = body;

        const existingUserByEmail = await db.user.findUnique({
            where: {email: email}
        });
        if (existingUserByEmail) {
            return NextResponse.json({user: null, message: "User with this email already exists"}, {status: 409})
        }

        const existingUserByName = await db.user.findUnique({
            where: {userName: userName}
        });
        if (existingUserByName) {
            return NextResponse.json({user: null, message: "User with this username already exists"}, {status: 409})
        }

        const hashedPassword = await hash(passwordHash, 10);
        const newUser = await db.user.create({
            data:{
                salt, 
                type, 
                name, 
                birthDate, 
                address, 
                phoneNumber, 
                email, 
                userName, 
                passwordHash: hashedPassword, 
                credit, 
                bankCard, 
                permission
            }
        })

        return NextResponse.json({user: newUser, message: "User created successfully"}, {status: 201});
    } catch(error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}