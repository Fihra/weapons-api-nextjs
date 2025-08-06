import { NextResponse, NextRequest } from "next/server";
import { db } from '@/lib/db';
import { ResultSetHeader } from "mysql2";

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