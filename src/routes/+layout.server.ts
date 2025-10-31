import { AMNESIA_API_KEY } from '$env/static/private';
import { setToken } from '$lib/api';

setToken(AMNESIA_API_KEY);
