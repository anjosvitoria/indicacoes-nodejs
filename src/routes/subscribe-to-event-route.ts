import { z } from "zod"
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { subscribeToEvent } from "../functions/subscribe-to-events"

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
    app.post('/subscriptions',{
        schema:{
            sumary: 'Subscribes someone to the event',
            tags: ['subscription'],
            body: z.object({
                name:z.string(),
                email:z.string().email(),
                referrer: z.string().nullish(),
            }), 
    
            response: {
                201: z.object({
                    subscriberId: z.string(),
                })
            }
        },
    }, async (request, reply) => {
       const { name, email, referrer } = request.body
       
       const { subscriberId } = await subscribeToEvent({
        name, 
        email, 
        referrerId: referrer,
       })
    
       return reply.status(201).send({
        subscriberId
       })
    })
    
}