import { db } from "../drizzle/client"
import { redis } from "../redis/client";
import { subscriptions } from "../schema/subscriptions"


interface accessInviteLinkParams {
    subscriberId: string;
}


export async function accessInviteLink({
   subscriberId,
}: accessInviteLinkParams) {
   await redis.hincrby('refarral:access-count', subscriberId, 1)
}