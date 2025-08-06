import { NextResponse, NextRequest } from "next/server";
import { db } from '@/lib/db';
import { ResultSetHeader } from "mysql2";

export async function GET() {
    try {
        const [rows] = await db.query('SELECT * FROM weapons');
        console.log("Query: ", rows);
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: (error as Error) }, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { w_name, damage } = body;

        console.log("name: " + w_name + " | damage: " + damage);

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

export async function PATCH(req: NextRequest) {
    const body = await req.json();

    console.log("body: ", body);

    const { weapon_id, w_name, damage } = body;

    console.log("weapon id: " + weapon_id);
    console.log("weapon name: " + w_name);
    console.log("damage: " + damage);

    if(!weapon_id) {
        return NextResponse.json({ error: 'Missing weapon ID'}, {status: 400});
    }

    try {
        if(w_name !== undefined && w_name !== "") {
            await db.query('UPDATE weapons SET w_name = ? WHERE weapon_id = ?', [w_name, weapon_id]);
        }

        if(damage !== undefined && damage !== "") {
            await db.query('UPDATE weapons SET damage = ? WHERE weapon_id = ?', [damage, weapon_id]);
        }

        return NextResponse.json({ success: true});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: 'Database update failed'} , {status: 500});
    }

}