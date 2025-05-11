import { redis } from "../redis/client";


interface GetSubscriberInviteCountParams {
    subscriberId: string;
}

export async function getSubscriberInviteCount({
   subscriberId,
}: GetSubscriberInviteCountParams) {
   //await redis.hincrby('refarral:access-count', subscriberId, 1)

   const count = await redis.zscore('refarral:ranking', subscriberId)

   return { count: count ? Number.parseInt(count) : 0 }
}