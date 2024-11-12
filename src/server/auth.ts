import { trpc } from "@/utils/trpc";
import { type AuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginHandler } from "./controller/auth-controller";
import { loggerLink } from "@trpc/client";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";

export const authConfig: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    placeholder: 'Email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    placeholder: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error('no cred provided')
                }
                const result = await loginHandler({ credentials })
                console.log(result)
                if (result && result.status) {
                    return {
                        name: result.data.name,
                        id: String(result.data.id)
                    }
                }
                return null
            }
        })
    ],
    events: {
        async signIn({ user }) {
            console.log(user, 'sign in user')
        }
    },
    callbacks: {
        async jwt({ token, user }) {
            const newToken = { ...token }
            if (user) {
                newToken.id = user.id;
                newToken.name = user.name;
            }
            return newToken;
        },
        async session({ token, session }) {
            const newSession = {
                user: {
                    id: token.id,
                    name: token.name,
                },
                expires: session?.expires || new Date(Date.now() + 60 * 60 * 1000).toISOString()
            }
            return newSession;
        }
    }
} satisfies AuthOptions;


export async function getAuthSession(
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    try {
        const session = await getServerSession(...args, authConfig)
        return session
    } catch (error) {
        console.error('failed to get the session', error)
        return null;
    }
}

export async function getAuthUser(
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    const session = await getAuthSession(...args)
    return session?.user
}
