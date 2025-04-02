import { z } from "zod"
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { subscribeToEvent } from "../functions/subscribe-to-events"
import { env } from "../env"
import { accessInviteLink } from "../functions/access-invite-link"

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/invite/:subscribeId',{
        schema:{
            sumary: 'Access invite link and redirect user',
            tags: ['refarral'],
            params: z.object({
                subscribeId:z.string(),
            }), 
    
            response: {
                201: z.object({
                    subscribeId: z.string(),
                })
            }
        },
    }, async (request, reply) => {
       const { subscribeId } = request.params

       await accessInviteLink({ subscribeId })

       const redirectUrl = new URL(env.WEB_URL)

       redirectUrl.searchParams.set('referrer', subscribeId)

       // 301: redirect permanente
       //302: redirect temporario

       return reply.redirect(redirectUrl.toString(), 302)
    }
)
}