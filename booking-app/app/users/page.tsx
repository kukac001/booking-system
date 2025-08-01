import React from 'react'
import { PrismaClient } from '../generated/prisma'

//const db = new PrismaClient()

const page = async () => {

    /* Adding users
    const createUser = await db.user.create({
            data: {
                salt: "cica",
                type: "client",
                name: "Daniel",
                birthDate: new Date("2025-08-01T11:30:00Z"),
                address: "123 rue Cat",
                phoneNumber: "123",
                email: "daniel2@cat.hu",
                passwordHash: "1231fsdfg3r",
                credit: 10,
                bankCard: "12123123",
                permission: "admin"
        }
    })
    */

    return (
        <div>
            <p>so here is a cat</p>
        </div>
        
    )
}

export default page
