import { z } from "zod"
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { subscribeToEvent } from "../functions/subscribe-to-events"
import { env } from "../env"
import { accessInviteLink } from "../functions/access-invite-link"

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/invite/:subscriberId',{
        schema:{
            sumary: 'Access invite link and redirect user',
            tags: ['refarral'],
            params: z.object({
                subscriberId:z.string(),
            }), 
    
            response: {
                302: z.null(),
            },
        },
    }, async (request, reply) => {
       const { subscriberId } = request.params

       await accessInviteLink({ subscriberId })

       const redirectUrl = new URL(env.WEB_URL)

       redirectUrl.searchParams.set('referrer', subscriberId)

       // 301: redirect permanente
       //302: redirect temporario

       return reply.redirect(redirectUrl.toString(), 302)
    }
)
}