import { z } from "zod";
import { LeaderboardOrder, MatchResult } from "./consts.ts";

export const ProfileSchema = z.strictObject({
	/** Player's username */
	player_name: z.string(),

	/** Player's clan name (empty string if not in a clan) */
	clan: z.string(),

	/** Whether the player is verified */
	verified: z.boolean(),

	/** Player's country flag index */
	flag: z.int(),

	/** Array of badge IDs the player has earned */
	badges: z.array(z.int()),

	/** Number of players this player is following */
	following: z.int(),

	/** Number of players following this player */
	followers: z.int(),

	/** Array of ranked profiles for the current season, one per region (only includes regions where player has completed 6+ placement matches) */
	ranked: z.array(
		z.strictObject({
			/** Region ID */
			region: z.int(),

			/** Matchmaking rating */
			mmr: z.int(),

			/** Ranked wins in this region */
			wins: z.int(),

			/** Ranked losses in this region */
			losses: z.int(),

			/** Total kills in ranked matches */
			kills: z.int(),

			/** Total deaths in ranked matches */
			deaths: z.int(),

			/** Total assists in ranked matches */
			assists: z.int(),

			/** Total score in ranked matches */
			score: z.int(),

			/** Total damage dealt in ranked matches */
			damage_done: z.int(),

			/** Total time played in ranked matches (seconds) */
			time_played: z.int(),
		}),
	),

	/** Currency balance */
	kr: z.int(),

	/** Calculated from score (0.03 × √score, min 1) */
	level: z.int(),

	/** ELO/Junk rating */
	junk: z.number(),

	/** Total skin value */
	inventory: z.int(),

	/** Total score */
	score: z.int(),

	/** Score per kill */
	spk: z.number(),

	/** Total kills */
	kills: z.int(),

	/** Total deaths */
	deaths: z.int(),

	/** Kill/Death ratio */
	kdr: z.number(),

	/** Kills per game */
	kpg: z.number(),

	/** Games played */
	games: z.int(),

	/** Games won */
	wins: z.int(),

	/** Games lost (games - wins) */
	losses: z.int(),

	/** Total assists */
	assists: z.int(),

	/** Melee kills */
	melees: z.int(),

	/** Fist kills */
	beatdowns: z.int(),

	/** Thrown weapon kills */
	bullseyes: z.int(),

	/** Headshot kills */
	headshots: z.int(),

	/** Leg shot kills */
	legshots: z.int(),

	/** Wallbang kills */
	wallbangs: z.int(),

	/** Total shots fired */
	shots: z.int(),

	/** Shots that connected */
	hits: z.int(),

	/** Shots missed (shots - hits) */
	misses: z.int(),

	/** Seconds played */
	time_played: z.int(),

	/** Nukes called in */
	nukes: z.int(),

	/** Airdrops called in */
	airdrops: z.int(),

	/** Airdrops stolen from enemies */
	airdrops_stolen: z.int(),

	/** Slimes called in */
	slimes: z.int(),

	/** Juggernaut killstreaks earned */
	juggernauts: z.int(),

	/** Enemy juggernauts killed */
	juggernauts_killed: z.int(),

	/** Warmachines called in */
	warmachines: z.int(),

	/** Whether the player has been flagged as a cheater */
	hacker_tagged: z.boolean(),

	/** Account creation date (RFC3339 format) */
	created_at: z.iso.datetime(),

	/** Whether the player is a KPD moderator */
	kpd: z.boolean(),

	/** Whether the player has an active premium subscription */
	premium: z.boolean(),

	/** Profile picture URL for premium users, empty string otherwise */
	profile_picture: z.string(),
});

export const InventorySchema = z.array(
	z.strictObject({
		/** Identifier for the skin */
		skin_index: z.int(),
		/** Number owned (excludes market listings) */
		count: z.int(),
	}),
);

export const MatchHistorySchema = z.strictObject({
	page: z.int(),
	per_page: z.int(),
	matches: z
		.array(
			z.strictObject({
				match_id: z.number(),
				date: z.string(),
				map: z.int(),
				duration: z.int(),
				season: z.int(),
				region: z.int(),
				kills: z.int(),
				deaths: z.int(),
				assists: z.int(),
				score: z.int(),
				damage_done: z.int(),
				headshots: z.int(),
				accuracy: z.int(),
				objective_score: z.int(),
				kr: z.int(),
				victory: z.enum(MatchResult),
				rounds_won: z.int(),
				team: z.int(),
				play_time: z.int(),
				mmr: z.int(),
			}),
		)
		.nullable(),
});

export const PostsSchema = z.strictObject({
	page: z.int(),
	per_page: z.int(),
	posts: z.array(
		z.strictObject({
			date: z.string(),
			text: z.string(),
			votes: z.int(),
			comment_count: z.int(),
		}),
	),
});

export const MatchSchema = z.strictObject({
	match_id: z.number(),
	date: z.string(),
	map: z.int(),
	duration: z.int(),
	season: z.int(),
	region: z.int(),
	participants: z.array(
		z.strictObject({
			player_name: z.string(),
			kills: z.int(),
			deaths: z.int(),
			assists: z.int(),
			score: z.int(),
			damage_done: z.int(),
			headshots: z.int(),
			accuracy: z.int(),
			objective_score: z.int(),
			victory: z.enum(MatchResult),
			rounds_won: z.int(),
			team: z.int(),
			play_time: z.int(),
		}),
	),
});

export const ClanSchema = z.strictObject({
	/** Clan name */
	name: z.string(),

	/** Name of the clan owner */
	owner_name: z.string(),

	/** Clan's total score */
	score: z.number(),

	/** Clan's leaderboard rank */
	rank: z.int(),

	/** Number of members in the clan */
	member_count: z.int(),

	/** Clan creation date */
	created_at: z.iso.datetime(),

	/** Discord invite code (empty string if not set) */
	discord: z.string(),
});

export const ClanMembersSchema = z.strictObject({
	page: z.int(),
	per_page: z.int(),
	members: z.array(z.strictObject({ player_name: z.string(), role: z.int(), verified: z.boolean() })),
});

export const RankedLeaderboardSchema = z.strictObject({
	/** Current page number */
	page: z.int(),

	/** Number of entries per page (10) */
	per_page: z.int(),

	/** Current ranked season */
	season: z.int(),

	/** Region ID */
	region: z.int(),

	/** Array of leaderboard entries */
	entries: z.array(
		z.strictObject({
			/** Leaderboard position */
			position: z.int(),

			/** Player's username */
			player_name: z.string(),

			/** Matchmaking rating */
			mmr: z.int(),

			/** Total ranked wins */
			wins: z.int(),

			/** Total ranked losses */
			losses: z.int(),

			/** Total kills in ranked matches */
			kills: z.int(),

			/** Total deaths in ranked matches */
			deaths: z.int(),

			/** Total assists in ranked matches */
			assists: z.int(),

			/** Total score in ranked matches */
			score: z.int(),

			/** Total damage dealt in ranked matches */
			damage_done: z.int(),
		}),
	),
});

export const MapInfoSchema = z.strictObject({
	/** Unique map identifier */
	map_id: z.int(),

	/** Map name */
	name: z.string(),

	/** Map description */
	description: z.string(),

	/** Username of the map creator */
	creator_name: z.string(),

	/** Total upvotes */
	votes: z.int(),

	/** Number of times the map has been played */
	gameplays: z.int(),

	/** Total playtime in milliseconds */
	playtime: z.int(),

	/** Map category ID */
	category: z.int(),

	/** When the map was created */
	created_at: z.string(),

	/** When the map was last updated */
	updated_at: z.string(),

	/** Type of leaderboard (e.g., "time", "score", empty if none) */
	leaderboard_type: z.string(),

	/** Sort order for leaderboard (0 = ascending/lower is better, 1 = descending/higher is better) */
	leaderboard_order: z.enum(LeaderboardOrder),
});

export const MapLeaderboardSchema = z.strictObject({
	/** Current page number */
	page: z.int(),

	/** Number of entries per page (25) */
	per_page: z.int(),

	/** The map name queried */
	map_name: z.string(),

	/** Type of leaderboard (e.g., "time", "score") */
	leaderboard_type: z.string(),

	/** Sort order (0 = ascending, 1 = descending) */
	leaderboard_order: z.enum(LeaderboardOrder),

	/** Array of leaderboard entries */
	entries: z.array(
		z.strictObject({
			/** Leaderboard position */
			position: z.int(),

			/** Player's username */
			player_name: z.string(),

			/** Score or time value */
			value: z.int(),

			/** When the entry was recorded */
			date: z.string(),
		}),
	),
});

export const MapLeaderboardEntrySchema = z.strictObject({
	/** The map name queried */
	map_name: z.string(),

	/** Type of leaderboard (e.g., "time", "score") */
	leaderboard_type: z.string(),

	/** Sort order (0 = ascending, 1 = descending) */
	leaderboard_order: z.enum(LeaderboardOrder),

	/** Player's username */
	player_name: z.string(),

	/** Player's position on the leaderboard */
	position: z.int(),

	/** Player's score or time value */
	value: z.int(),

	/** When the entry was recorded */
	date: z.string(),
});

export const SkinListingsSchema = z.strictObject({
	/** The skin index queried */
	skin_index: z.int(),

	/** Total number of active listings */
	total_listings: z.int(),

	/** Lowest listed price (0 if no listings) */
	lowest_price: z.int(),

	/** Average sale price from last 7 days */
	average_price: z.number(),

	/** Total quantity of this skin in circulation */
	total_circulating: z.int(),

	/** Paginated list of active listings (sorted by price ascending) */
	listings: z.array(
		z.strictObject({
			/** Listing price in KR */
			price: z.int(),

			/** Seller's username */
			seller_name: z.string(),

			/** When the listing was created (rfc-3339 datetime) */
			listed_at: z.iso.datetime(),
		}),
	),

	/** First 100 owners sorted by quantity owned (descending) */
	owners: z.array(
		z.strictObject({
			/** Owner's username */
			player_name: z.string(),

			/** Number of this skin the player owns */
			count: z.int(),
		}),
	),

	/** Daily average sale prices for the last 30 days */
	price_history: z.array(
		z.strictObject({
			/** Date (YYYY-MM-DD format) */
			date: z.iso.date(),

			/** Average sale price on that day */
			average_price: z.number(),

			/** Number of sales on that day */
			sales: z.int(),
		}),
	),
});

export const PlayerListingsSchema = z.strictObject({
	page: z.int(),
	per_page: z.int(),
	listings: z.array(
		z.strictObject({
			/** Identifier for the skin being sold */
			skin_index: z.int(),
			/** Listing price in KR */
			price: z.int(),
			/** When the listing was created (rfc-3339 datetime) */
			listed_at: z.string(),
		}),
	),
});

export const ModSchema = z.strictObject({
	/** Unique mod identifier */
	mod_id: z.int(),
	/** Mod name */
	name: z.string(),
	/** Mod description */
	description: z.string(),
	/** Username of the mod creator */
	creator_name: z.string(),
	/** Number of upvotes */
	votes: z.int(),
	/** Whether the mod is featured */
	featured: z.boolean(),
	/** Mod version number */
	version: z.int(),
	/** When the mod was first published (not rfc-3339, pending a fix) */
	created_at: z.string(),
	/** When the mod was last updated (not rfc-3339, pending a fix) */
	updated_at: z.string(),
});

export const ModListSchema = z.strictObject({
	/** Current page number */
	page: z.int(),
	/** Number of mods per page (10) */
	per_page: z.int(),
	/** Array of mod objects sorted by votes (most popular first) */
	mods: z.array(ModSchema),
});

export const ValidateKrunkScriptSchema = z.union([
	z.strictObject({ success: z.literal(true) }),
	z.strictObject({ success: z.literal(false), error: z.string() }),
]);
