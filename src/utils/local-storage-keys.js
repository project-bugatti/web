export const SESSION_ID_KEY = 'session_id';
// Key for retrieving a user's previous session ID, if one exists

export const REDIRECT_ROUTE = 'REDIRECT_ROUTE';
// Key for retrieving the redirect route in local storage
// When a user is not authenticated and accesses a private route, that path is saved
// If/once a user authenticates, the app redirects the user to the path saved