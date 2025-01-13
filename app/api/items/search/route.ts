import { NextApiRequest} from "next";
import { NextResponse } from "next/server";
import Item from "@/models/ItemModel";

export async function GET(request:NextApiRequest){

    try {

        const {category} = request.query;
        console.log(category)
        let filteredItems = Item.find().sort({createdAt: -1})
        return NextResponse.json({message: "Search results", filteredItems},{status:200})
    } catch (error) {
        return NextResponse.json({error: "unable to fetch"},{status:401})
    }
}