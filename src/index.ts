import { z } from "zod";
import type { Region } from "./consts.ts";
import * as schemas from "./schemas.ts";

class KrunkerApi {
	#apiKey;

	constructor(props: { apiKey: string }) {
		this.#apiKey = props.apiKey;
	}

	async #fetchJson(path: string) {
		const response = await fetch(path, {
			headers: {
				"X-Developer-API-Key": this.#apiKey,
			},
		});
		const data = await response.json();
		if (!response.ok) {
			const errorData = z.parse(z.object({ error: z.string() }), data);
			throw new Error(`${response.status} ${errorData.error}`);
		}
		return data;
	}

	async fetchProfile(playerName: string) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/player/${playerName}`);
		return z.parse(schemas.ProfileSchema, data);
	}

	async fetchInventory(playerName: string) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/player/${playerName}/inventory`);
		return z.parse(schemas.InventorySchema, data);
	}

	/**
	 * Notes:
	 * - Only ranked matches are returned
	 * - Page size is fixed at 10 records
	 * - Matches are ordered by date descending
	 */
	async fetchMatchHistory(playerName: string, page = 1, season: number | undefined = undefined) {
		const url = new URL(`https://gapi.svc.krunker.io/api/player/${playerName}/matches`);
		url.searchParams.append("page", page.toString());
		if (season) url.searchParams.append("season", season.toString());

		const data = await this.#fetchJson(url.toString());
		return z.parse(schemas.MatchHistorySchema, data);
	}

	async fetchPosts(playerName: string, page = 1) {
		const url = new URL(`https://gapi.svc.krunker.io/api/player/${playerName}/posts`);
		url.searchParams.append("page", page.toString());

		const data = await this.#fetchJson(url.toString());
		return z.parse(schemas.PostsSchema, data);
	}

	/**
	 * Notes:
	 * - Only ranked matches are returned
	 * - Participants are ordered by team, then by score descending
	 */
	async fetchMatch(matchId: number) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/match/${matchId}`);
		return z.parse(schemas.MatchSchema, data);
	}

	async fetchClan(clanName: string) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/clan/${clanName}`);
		return z.parse(schemas.ClanSchema, data);
	}

	/**
	 * Notes:
	 * - Page size is fixed at 10 records
	 * - Members are sorted by role (descending), then by score (descending)
	 */
	async fetchClanMembers(clanName: string, page = 1) {
		const url = new URL(`https://gapi.svc.krunker.io/api/clan/${clanName}/members`);
		url.searchParams.append("page", page.toString());

		const data = await this.#fetchJson(url.toString());
		return z.parse(schemas.ClanMembersSchema, data);
	}

	/**
	 * Notes:
	 * - Only players with 6+ completed placement matches appear on the leaderboard
	 * - Page size is fixed at 10 records
	 * - Entries are sorted by MMR descending
	 */
	async fetchRankedLeaderboard(region: Region, page = 1) {
		const url = new URL(`https://gapi.svc.krunker.io/api/leaderboard/${region}`);
		url.searchParams.append("page", page.toString());

		const data = await this.#fetchJson(url.toString());
		return z.parse(schemas.RankedLeaderboardSchema, data);
	}

	/**
	 * Notes:
	 * - Returns 404 if map not found or is restricted/deleted
	 * - Map name is case-sensitive
	 */
	async fetchMapInfo(mapName: string) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/map/${encodeURIComponent(mapName)}`);
		return z.parse(schemas.MapInfoSchema, data);
	}

	/**
	 * Notes:
	 * - Returns empty entries array if the map has no leaderboard configured
	 * - Page size is fixed at 25 records
	 * - Entries are sorted by value according to leaderboard_order
	 */
	async fetchMapLeaderboard(mapName: string) {
		const data = await this.#fetchJson(
			`https://gapi.svc.krunker.io/api/map/${encodeURIComponent(mapName)}/leaderboard`,
		);
		return z.parse(schemas.MapLeaderboardSchema, data);
	}

	/**
	 * Notes:
	 * - Listings are sorted by price (lowest first)
	 * - Page size is fixed at 10 records
	 * - `average_price` is calculated from sales in the last 7 days
	 */
	async fetchListingsForSkin(skinIndex: number) {
		const data = await this.#fetchJson(`https://gapi.svc.krunker.io/api/market/skin/${skinIndex}`);
		return z.parse(schemas.SkinListingsSchema, data);
	}
}

export { KrunkerApi };
export * from "./consts.ts";
