/*
 * action types
 */
export const REDIRECT_TO_LOGIN = "REDIRECT_TO_LOGIN";

/*
 * action creators
 */

export function redirectToLogin(id) {
  return { type: REDIRECT_TO_LOGIN}
}

