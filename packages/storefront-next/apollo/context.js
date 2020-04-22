const modules = {};

async function loadModules() {
    if (modules.loaded) return;

    const apolloServerMicro = await import('apollo-server-micro');
    modules.AuthenticationError = apolloServerMicro.AuthenticationError;
    modules.UserInputError = apolloServerMicro.UserInputError;

    const cookie = await import('cookie');
    modules.cookie = cookie.default;

    const jwt = await import('jsonwebtoken');
    modules.jwt = jwt.default;

    const apiConfig = await import('@sfcc-core/apiconfig');
    modules.getCommerceClientConfig = apiConfig.getCommerceClientConfig;
    modules.getConfig = apiConfig.getConfig;

    const commerceSdk = await import('commerce-sdk');
    modules.helpers = commerceSdk.helpers;

    modules.loaded = true;
}

function saveCookieToken(res, session) {
    const jwtToken = modules.jwt.sign(
        session,
        modules.getConfig().COMMERCE_JWT_SECRET,
        {
            expiresIn: '6h',
        },
    );

    res.setHeader(
        'Set-Cookie',
        modules.cookie.serialize('session', jwtToken, {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        }),
    );
}

let ssrSession = {};

export function buildContext(ctx) {
    if (typeof window !== 'undefined') {
        return ctx;
    }

    const { req, res, ssr } = ctx;

    return {
        ...ctx,
        async getSession() {
            if (ssr) return ssrSession;

            await loadModules();

            const { session } = modules.cookie.parse(req.headers.cookie ?? '');

            if (session) {
                try {
                    return modules.jwt.verify(
                        session,
                        modules.getConfig().COMMERCE_JWT_SECRET,
                    );
                } catch {
                    throw new modules.AuthenticationError(
                        'Authentication token is invalid, please log in',
                    );
                }
            }
            return {};
        },
        async updateSession(session) {
            await loadModules();
            if (ssr) ssrSession = session;
            else saveCookieToken(res, session);
        },
        async login(config, user, pass) {
            await loadModules();

            const { id, token } = await modules.helpers
                .getShopperToken(modules.getCommerceClientConfig(config), {
                    type: 'guest',
                })
                .then(token => {
                    const customerId = JSON.parse(token.decodedToken.sub)
                        .customer_info.customer_id;

                    return {
                        id: customerId,
                        token: token.getBearerHeader(),
                    };
                });

            if (ssr) {
                ssrSession = { token, id };
                return ssrSession;
            }
            saveCookieToken(res, { token, id, time: new Date() });

            return { token, id };
        },
        async logout() {
            if (!ssr) {
                await loadModules();

                res.setHeader(
                    'Set-Cookie',
                    modules.cookie.serialize('session', '', {
                        httpOnly: true,
                        maxAge: -1,
                        path: '/',
                        sameSite: 'lax',
                        secure: process.env.NODE_ENV === 'production',
                    }),
                );
            }
        },
    };
}
