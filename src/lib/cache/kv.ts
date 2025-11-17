import { openKv as nodeOpenKv } from '@deno/kv';

let openKv: typeof nodeOpenKv;

/// @ts-expect-error these are deno types
if ('Deno' in globalThis && 'openKv' in Deno) {
	/// @ts-expect-error these are deno types
	openKv = Deno.openKv;
} else {
	openKv = nodeOpenKv;
}

type CacheEntry<T> = {
	data: T;
	timestamp: number;
};

let kv: Awaited<ReturnType<typeof openKv>> | null = null;

async function getKv() {
	if (!kv) {
		kv = await openKv();
	}
	return kv;
}

export async function getCached<T>(key: string[]): Promise<T | null> {
	try {
		const db = await getKv();
		const result = await db.get<CacheEntry<T>>(key);

		if (!result.value) {
			return null;
		}

		return result.value.data;
	} catch (error) {
		console.error('Error getting cached data:', error);
		return null;
	}
}

export async function setCached<T>(key: string[], data: T, ttlMs?: number): Promise<void> {
	try {
		const db = await getKv();
		const entry: CacheEntry<T> = {
			data,
			timestamp: Date.now()
		};

		const options = ttlMs ? { expireIn: ttlMs } : undefined;
		await db.set(key, entry, options);
	} catch (error) {
		console.error('Error setting cached data:', error);
	}
}

export async function deleteCached(key: string[]): Promise<void> {
	try {
		const db = await getKv();
		await db.delete(key);
	} catch (error) {
		console.error('Error deleting cached data:', error);
	}
}

export async function closeKv(): Promise<void> {
	if (kv) {
		kv.close();
		kv = null;
	}
}
