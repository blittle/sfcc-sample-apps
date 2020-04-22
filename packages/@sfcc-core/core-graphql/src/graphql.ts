export const CORE_GRAPHQL_KEY = Symbol('Core GraphQL with Apollo');
export const EXPRESS_KEY = Symbol('Node Express');

export async function getSessionFromContext(
    config,
    context: any,
    refresh = false,
) {
    let session = await context.getSession();
    const token = session.id && !refresh ? session.token : '';
    if (!token) {
        return await context.login(config, {});
    }
    return session;
}

/**
 * Return true if the current API authorizaion token has expired.
 * TODO: check with SDK team for token expire specific error.
 * @param response
 */
const isTokenExpire = response => {
    console.info('Authorization Token has expired', response);

    // response.token === 0
    return response && response.statusText === 'Unauthorized';
};

/**
 * Request new token and retry the request call if the auth token is expired.
 *
 * @param requestCall   The request call used by a resolver.
 *                      It must take and pass a refresh boolean to its dependent methods.
 */
export const requestWithTokenRefresh = async requestCall => {
    try {
        return await requestCall(false);
    } catch (error) {
        // Retry the request one time
        if (isTokenExpire(error.response)) {
            console.info(
                'Request new Authorization Token and rerun query/mutation.',
            );
            return await requestCall(true);
        } else {
            console.error('Error in requestWithTokenRefresh()', error);
            throw error;
        }
    }
};
