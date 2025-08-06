import { NextResponse, NextRequest } from "next/server";
import { db } from '@/lib/db';
import { ResultSetHeader } from "mysql2";

export async function GET() {
    try {
        const [rows] = await db.query('SELECT * FROM weapons');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: (error as Error) }, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { w_name, damage } = body;

        if(!w_name || typeof damage !== 'number'){
            return NextResponse.json({ error: 'Invalid input' }, {status: 400 });
        }

        const [result] = await db.query(
            'INSERT INTO weapons (w_name, damage) VALUES (?, ?)',
            [w_name, damage]
        );

        const insertId = (result as ResultSetHeader).insertId;

        return NextResponse.json({ message: 'Weapon added successfully', id: insertId})
    } catch(error) {
        console.error('POST error:', error);
        return NextResponse.json({ error: "Database insert error" }, {status: 500});
    }
}
