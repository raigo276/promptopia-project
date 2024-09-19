import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        const user = await User.findById(params.id);
        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(`Failed to fetch user with id {params.id}`, { status: 500 });
    }
  }