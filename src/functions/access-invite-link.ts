import { db } from "../drizzle/client"
import { redis } from "../redis/client";
import { subscriptions } from "../schema/subscriptions"


interface accessInviteLinkParams {
    subscribeId: string;
}


export async function accessInviteLink({
   subscribeId,
}: accessInviteLinkParams) {
   await redis.hincrby('refarral:access-count', subscribeId, 1)
}