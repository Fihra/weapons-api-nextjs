import { NextResponse, NextRequest } from "next/server";
import { db } from '@/lib/db';
import { ResultSetHeader } from "mysql2";

export async function PATCH(req: NextRequest, {params }: { params: { id: string}}) {
    const weapon_id = params.id;
    const body = await req.json();
    const { w_name, damage } = body;

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

export async function DELETE(req: NextRequest, { params } :  {params: { id: string}}){

    const id = params.id;

    if(!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400});
    }
    
    try {
        await db.execute('DELETE FROM weapons WHERE weapon_id = ?', [id]);
        return NextResponse.json({ message: 'Deleted successfully'}, { status: 200})
    } catch(error){
        console.error("Failed to delete");
        return NextResponse.json({ error: 'Failed to delete'}, { status: 500});
    }

}