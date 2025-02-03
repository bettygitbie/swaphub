import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import bcryptjs from "bcryptjs";

export async function createAdmin() {
  try {
    await connectToDatabase();
    const adminExists = await User.findOne({ username: "swaphubAdmin" });
    if (!adminExists) {
      if (!process.env.ADMIN_PW) {
        throw new Error("ADMIN_PW is not defined in environment variables");
      }
      const hashedPassword = await bcryptjs.hash(process.env.ADMIN_PW, 10);
      const admin = new User({
        username: "swaphubAdmin",
        email: "bttyty@gmail.com",
        password: hashedPassword,
        isAdmin: true,
      });
     const savedAdmin = await admin.save();
      console.log("Admin created success");
      return savedAdmin;
    }
    else {
        return adminExists;
    }
  } catch (error) {
    console.log("Admin already exists", error)
  }
  
}
createAdmin();
