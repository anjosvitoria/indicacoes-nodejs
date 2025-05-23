import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
    jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invete-link-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInviteCountRoute } from './routes/get-subscriber-invite-count-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-rout'
import { getRankingRoute } from './routes/get-ranking-route'


const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
    openapi:{
        info:{
            title: 'project node',
            version: '0.0.1'
        },
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix:'/docs',

})

app.register(fastifyCors, {
    origin: 'http://localhost:3000',
})

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInviteCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)


app.listen({ port: env.PORT }).then(() => {
    console.log('HTTP server running!')
})