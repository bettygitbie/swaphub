import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/ItemModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

// export async function DELETE(request: NextRequest){
//     const userId = await getTokenData(request)
//     if(userId){
//         try {
//             await Item.findOneAndDelete({owner: typeof userId === 'string' ? userId : userId.id})
//             return NextResponse.json({message:"Item deleted"}, {status:200})
//         } catch (error) {
//             return NextResponse.json({message:"Error deleting item", error},{status: 500})
//         }
        
//     }
// }
export async function DELETE(request: NextRequest) {
    const userId = await getTokenData(request);
  
    if (userId && (typeof userId === 'string' || (typeof userId === 'object' && 'id' in userId))) {
      try {
        const ownerId = typeof userId === 'string' ? userId : userId.id;
        await Item.findOneAndDelete({ owner: ownerId });
        return NextResponse.json({ message: "Item deleted" }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: "Error deleting item", error }, { status: 500 });
      }
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }