import { z } from "zod"
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscriberRankingPosition } from "../functions/get-subscriber-ranking-position"

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod = 
    async app => {
    app.get(
        '/subscribers/:subscriberId/ranking/position',
        {
        schema:{
            sumary: 'Get subscriber ranking position',
            tags: ['refarral'],
            params: z.object({
                subscriberId:z.string(),
            }), 
            response: {
                200: z.object({
                    position: z.number().nullable(),
                    
                }),
            },
        },
    }, 
    async request => {
       const { subscriberId } = request.params

       const { position } = await getSubscriberRankingPosition({ 
        subscriberId, 
    })

       return { position }
    }
)
}