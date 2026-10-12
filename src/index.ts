import { z } from "zod";
import type { Region } from "./consts.ts";
import * as schemas from "./schemas.ts";

export class KrunkerApi {
	#apiKey;

	/**
	 * @param props.apiKey Your API key (starts with `kr_`)
	 */
	constructor(props: { apiKey: string }) {
		this.#apiKey = props.apiKey;
	}

	async #fetchJson(url: string) {
		const response = await fetch(url, {
			headers: {
				"X-Developer-API-Key": this.#apiKey,
			},
		});
		const data = await response.json();

		// TODO: structured error that uses x-retry-after & similar?
		if (!response.ok) {
			const errorData = z.parse(z.object({ error: z.string() }), data);
			throw new Error(`${response.status} ${errorData.error}`);
		}
		return data;
	}

	async fetchProfile(playerName: string) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/player/${encodeURIComponent(playerName)}`);
		return schemas.ProfileSchema.parse(data);
	}

	/**
	 * - Only active listings are returned
	 * - Page size is fixed at 10 records
	 * - Listings are ordered by date listed (newest first)
	 */
	async fetchPlayerListings(playerName: string, page = 1) {
		const url = new URL(`https://gapi.svc.krunker.io/api/player/${encodeURIComponent(playerName)}/listings`);
		url.searchParams.append("page", page.toString());

		const data = await this.#fetchJson(url.toString());
		schemas.PlayerListingsSchema.parse(data);
	}

	async fetchInventory(playerName: string) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/player/${encodeURIComponent(playerName)}/inventory`);
		schemas.InventorySchema.parse(data);
	}

	/**
	 * Notes:
	 * - Only ranked matches are returned
	 * - Page size is fixed at 10 records
	 * - Matches are ordered by date descending
	 */
	async fetchMatchHistory(playerName: string, page = 1, season?: number) {
		const url = new URL(`https://gapi.svc.krunker.io/api/player/${encodeURIComponent(playerName)}/matches`);
		url.searchParams.append("page", page.toString());
		if (season) url.searchParams.append("season", season.toString());

		const data = await this.#fetchJson(url.toString());
		schemas.MatchHistorySchema.parse(data);
	}

	async fetchPosts(playerName: string, page = 1) {
		const url = new URL(`https://gapi.svc.krunker.io/api/player/${encodeURIComponent(playerName)}/posts`);
		url.searchParams.append("page", page.toString());

		const data = await this.#fetchJson(url.toString());
		return schemas.PostsSchema.parse(data);
	}

	/**
	 * Notes:
	 * - Only ranked matches are returned
	 * - Participants are ordered by team, then by score descending
	 */
	async fetchMatch(matchId: number) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/match/${matchId}`);
		return schemas.MatchSchema.parse(data);
	}

	async fetchClan(clanName: string) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/clan/${encodeURIComponent(clanName)}`);
		return schemas.ClanSchema.parse(data);
	}

	/**
	 * Notes:
	 * - Page size is fixed at 10 records
	 * - Members are sorted by role (descending), then by score (descending)
	 */
	async fetchClanMembers(clanName: string, page = 1) {
		const url = new URL(`https://gapi.svc.krunker.io/api/clan/${encodeURIComponent(clanName)}/members`);
		url.searchParams.append("page", page.toString());

		const data = await this.#fetchJson(url.toString());
		return schemas.ClanMembersSchema.parse(data);
	}

	/**
	 * Notes:
	 * - Only players with 6+ completed placement matches appear on the leaderboard
	 * - Page size is fixed at 10 records
	 * - Entries are sorted by MMR descending
	 */
	async fetchRankedLeaderboard(region: Region, page = 1, season?: number) {
		const url = new URL(`https://gapi.svc.krunker.io/api/leaderboard/${region}`);
		url.searchParams.append("page", page.toString());
		if (season) url.searchParams.append("season", season.toString());

		const data = await this.#fetchJson(url.toString());
		return schemas.RankedLeaderboardSchema.parse(data);
	}

	/**
	 * - Lists every map that is currently featured, newest first
	 * - Use {@link KrunkerApi.fetchMapInfo} for a map's details
	 */
	async fetchFeaturedMaps() {
		const data = await this.#fetchJson("https://gapi.svc.krunker.io/api/maps/featured");
		return schemas.FeaturedMapsSchema.parse(data);
	}

	/**
	 * - Returns events newer than `after`, oldest first
	 * - Store `next` and pass it as `after` on your next call (start with `after = 0`)
	 * - Keep the same filters between calls; `next` also moves past events your filters skipped, so changing filters later does not bring those back
	 * - Rate limit: 6 requests per minute per key, on top of the general limit (see the X-RateLimit-* response headers)
	 * - Poll every 20-60 seconds; if `has_more` is true, fetch the next page right away
	 * - Events appear a few seconds after they happen; ids only increase, gaps are normal
	 */
	async fetchEvents(
		props: {
			/** Event id cursor (default 0) */
			after?: number;

			/** Event types to return (default: all your scopes allow) */
			types?: string[];

			/** Only events about this kind of target, e.g. "map" */
			targetType?: string;

			/** Target ids, up to 100 (needs `targetType`) */
			targetIds?: Array<number | string>;

			/** Maximum number of events to return (1-100, default 100) */
			limit?: number;
		} = {},
	) {
		const url = new URL("https://gapi.svc.krunker.io/api/events");
		if (props.after !== undefined) url.searchParams.append("after", props.after.toString());
		if (props.types) url.searchParams.append("types", props.types.join(","));
		if (props.targetType) url.searchParams.append("target_type", props.targetType);
		if (props.targetIds) url.searchParams.append("target_id", props.targetIds.join(","));
		if (props.limit !== undefined) url.searchParams.append("limit", props.limit.toString());

		const data = await this.#fetchJson(url.toString());
		return schemas.EventsSchema.parse(data);
	}

	/**
	 * Notes:
	 * - Returns 404 if map not found or is restricted/deleted
	 * - Map name is case-sensitive
	 */
	async fetchMapInfo(mapName: string) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/map/${encodeURIComponent(mapName)}`);
		return schemas.MapInfoSchema.parse(data);
	}

	/**
	 * Notes:
	 * - Returns empty entries array if the map has no leaderboard configured
	 * - Page size is fixed at 25 records
	 * - Entries are sorted by value according to leaderboard_order
	 */
	async fetchMapLeaderboard(mapName: string, page = 1) {
		const url = new URL(`https://gapi.svc.krunker.io/api/map/${encodeURIComponent(mapName)}/leaderboard`);
		url.searchParams.append("page", page.toString());

		const data = await this.#fetchJson(url.toString());
		return schemas.MapLeaderboardSchema.parse(data);
	}

	/**
	 * Notes:
	 * - Returns 404 if the map has no leaderboard or the player has no entry
	 * - Position is calculated dynamically based on current leaderboard standings
	 */
	async fetchMapLeaderboardEntry(mapName: string, playerName: string) {
		const data = await this.#fetchJson(
			`https://gapi.svc.krunker.io/api/map/${encodeURIComponent(mapName)}/leaderboard/player/${encodeURIComponent(playerName)}`,
		);
		return schemas.MapLeaderboardEntrySchema.parse(data);
	}

	/**
	 * Notes:
	 * - Listings are sorted by price (lowest first)
	 * - Page size is fixed at 10 records for listings
	 * - `average_price` is calculated from sales in the last 7 days
	 * - Owners list shows up to 100 players, sorted by quantity owned (highest first)
	 * - Banned users are excluded from the owners list
	 * - `price_history` contains daily averages for days with sales in the last 30 days (useful for charting)
	 */
	async fetchListingsForSkin(skinIndex: number, page = 1, days = 30) {
		const url = new URL(`https://gapi.svc.krunker.io/api/market/skin/${skinIndex}`);
		url.searchParams.append("page", page.toString());
		url.searchParams.append("days", days.toString());

		const data = await this.#fetchJson(url.toString());
		return schemas.SkinListingsSchema.parse(data);
	}

	async fetchMods(page = 1) {
		const url = new URL(`https://gapi.svc.krunker.io/api/mods`);
		url.searchParams.append("page", page.toString());

		const data = await this.#fetchJson(url.toString());

		return schemas.ModListSchema.parse(data);
	}

	async fetchMod(name: string) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/mods/${encodeURIComponent(name)}`);
		return schemas.ModSchema.parse(data);
	}

	async validateKrunkscript(scriptType: "client" | "server", scriptSource: string) {
		const response = await fetch(`https://editor.krunker.io/krunkscript/validate/${scriptType}`, {
			headers: {
				"X-Developer-API-Key": this.#apiKey,
				"Content-Type": "text/plain",
			},
			method: "POST",
			body: scriptSource,
		});
		const data = await response.json();
		if (!response.ok) {
			const errorData = z.parse(z.object({ error: z.string() }), data);
			throw new Error(`${response.status} ${errorData.error}`);
		}
		return schemas.ValidateKrunkScriptSchema.parse(data);
	}
}

export * from "./consts.ts";
