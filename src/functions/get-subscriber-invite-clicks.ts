import { redis } from "../redis/client";


interface GetSubscriberInviteClicksParams {
    subscriberId: string;
}

export async function getSubscriberInviteClicks({
   subscriberId,
}: GetSubscriberInviteClicksParams) {
   //await redis.hincrby('refarral:access-count', subscriberId, 1)

   const count = await redis.hget('refarral:access-count', subscriberId)

   return { count: count ? Number.parseInt(count) : 0 }
}