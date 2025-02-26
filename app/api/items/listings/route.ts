import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/ItemModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);

    if (userId && (typeof userId === 'string' || (typeof userId === 'object' && 'id' in userId))) {
      const ownerId = typeof userId === 'string' ? userId : userId.id;
      const item = await Item.find({ owner: ownerId });

      if (!item || item.length === 0) {
        return NextResponse.json(
          { message: "No item for user!" },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: "Item found", item });
    } else {
      return NextResponse.json({ message: "User not found! Please sign in!" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     const userId = await getTokenData(request);
//     //fetch user data without the password
//     if (userId) {
//       const item = await Item.find({ owner: typeof userId === 'string' ? userId : userId.id });
//       if (!item) {
//         return NextResponse.json(
//           { message: "No item for user!" },
//           { status: 404 }
//         );
//       }
//       return NextResponse.json({ message: "Item found", item });
//     } else {
//         return NextResponse.json({ message: "User not found! Please sign in!" }, { status: 404 });
//     }
//   } catch (error) {
//       return NextResponse.json({ error }, { status: 500 });
   
    
//   }
// }
