import { z } from "zod";

export const ProfileSchema = z.object({
	/** Player's username */
	player_name: z.string(),

	/** Player's clan name (empty string if not in a clan) */
	clan: z.string(),

	/** Whether the player is verified */
	verified: z.boolean(),

	/** Player's country flag index */
	flag: z.number().int(),

	/** Array of badge IDs the player has earned */
	badges: z.array(z.number().int()),

	/** Number of players this player is following */
	following: z.number().int(),

	/** Number of players following this player */
	followers: z.number().int(),

	/** Array of ranked profiles for the current season, one per region (only includes regions where player has completed 6+ placement matches) */
	ranked: z.array(
		z.object({
			/** Region ID */
			region: z.number().int(),

			/** Matchmaking rating */
			mmr: z.number().int(),

			/** Ranked wins in this region */
			wins: z.number().int(),

			/** Ranked losses in this region */
			losses: z.number().int(),

			/** Total kills in ranked matches */
			kills: z.number().int(),

			/** Total deaths in ranked matches */
			deaths: z.number().int(),

			/** Total assists in ranked matches */
			assists: z.number().int(),

			/** Total score in ranked matches */
			score: z.number().int(),

			/** Total damage dealt in ranked matches */
			damage_done: z.number().int(),

			/** Total time played in ranked matches (seconds) */
			time_played: z.number().int(),
		}),
	),

	/** Currency balance */
	kr: z.number().int(),

	/** Calculated from score (0.03 × √score, min 1) */
	level: z.number().int(),

	/** ELO/Junk rating */
	junk: z.number(),

	/** Total skin value */
	inventory: z.number().int(),

	/** Total score */
	score: z.number().int(),

	/** Score per kill */
	spk: z.number(),

	/** Total kills */
	kills: z.number().int(),

	/** Total deaths */
	deaths: z.number().int(),

	/** Kill/Death ratio */
	kdr: z.number(),

	/** Kills per game */
	kpg: z.number(),

	/** Games played */
	games: z.number().int(),

	/** Games won */
	wins: z.number().int(),

	/** Games lost (games - wins) */
	losses: z.number().int(),

	/** Total assists */
	assists: z.number().int(),

	/** Melee kills */
	melees: z.number().int(),

	/** Fist kills */
	beatdowns: z.number().int(),

	/** Thrown weapon kills */
	bullseyes: z.number().int(),

	/** Headshot kills */
	headshots: z.number().int(),

	/** Leg shot kills */
	legshots: z.number().int(),

	/** Wallbang kills */
	wallbangs: z.number().int(),

	/** Total shots fired */
	shots: z.number().int(),

	/** Shots that connected */
	hits: z.number().int(),

	/** Shots missed (shots - hits) */
	misses: z.number().int(),

	/** Seconds played */
	time_played: z.number().int(),
});

export const InventorySchema = z.array(
	z.object({
		/** Identifier for the skin */
		skin_index: z.number(),
		/** Number owned (excludes market listings) */
		count: z.number(),
	}),
);

export const MatchHistorySchema = z.object({
	page: z.number(),
	per_page: z.number(),
	matches: z
		.array(
			z.object({
				match_id: z.number(),
				date: z.string(),
				map: z.number(),
				duration: z.number(),
				season: z.number(),
				region: z.number(),
				kills: z.number(),
				deaths: z.number(),
				assists: z.number(),
				score: z.number(),
				damage_done: z.number(),
				headshots: z.number(),
				accuracy: z.number(),
				objective_score: z.number(),
				kr: z.number(),
				victory: z.number(),
				rounds_won: z.number(),
				team: z.number(),
				play_time: z.number(),
			}),
		)
		.nullable(),
});

export const PostsSchema = z.object({
	page: z.number(),
	per_page: z.number(),
	posts: z.array(
		z.object({
			date: z.string(),
			text: z.string(),
			votes: z.number(),
			comment_count: z.number(),
		}),
	),
});

export const MatchSchema = z.object({
	match_id: z.number(),
	date: z.string(),
	map: z.number(),
	duration: z.number(),
	season: z.number(),
	region: z.number(),
	participants: z.array(
		z.object({
			player_name: z.string(),
			kills: z.number(),
			deaths: z.number(),
			assists: z.number(),
			score: z.number(),
			damage_done: z.number(),
			headshots: z.number(),
			accuracy: z.number(),
			objective_score: z.number(),
			victory: z.number(),
			rounds_won: z.number(),
			team: z.number(),
			play_time: z.number(),
		}),
	),
});

export const ClanSchema = z.object({
	name: z.string(),
	owner_name: z.string(),
	score: z.number(),
	rank: z.number(),
	member_count: z.number(),
	created_at: z.string(),
});

export const ClanMembersSchema = z.object({
	page: z.number(),
	per_page: z.number(),
	members: z.array(z.object({ player_name: z.string(), role: z.number() })),
});

export const RankedLeaderboardSchema = z.object({
	/** Current page number */
	page: z.number().int(),

	/** Number of entries per page (10) */
	per_page: z.number().int(),

	/** Current ranked season */
	season: z.number().int(),

	/** Region ID */
	region: z.number().int(),

	/** Array of leaderboard entries */
	entries: z.array(
		z.object({
			/** Leaderboard position */
			position: z.number().int(),

			/** Player's username */
			player_name: z.string(),

			/** Matchmaking rating */
			mmr: z.number().int(),

			/** Total ranked wins */
			wins: z.number().int(),

			/** Total ranked losses */
			losses: z.number().int(),

			/** Total kills in ranked matches */
			kills: z.number().int(),

			/** Total deaths in ranked matches */
			deaths: z.number().int(),

			/** Total assists in ranked matches */
			assists: z.number().int(),

			/** Total score in ranked matches */
			score: z.number().int(),

			/** Total damage dealt in ranked matches */
			damage_done: z.number().int(),
		}),
	),
});

export const MapInfoSchema = z.object({
	/** Unique map identifier */
	map_id: z.number().int(),

	/** Map name */
	name: z.string(),

	/** Map description */
	description: z.string(),

	/** Username of the map creator */
	creator_name: z.string(),

	/** Total upvotes */
	votes: z.number().int(),

	/** Number of times the map has been played */
	gameplays: z.number().int(),

	/** Total playtime in milliseconds */
	playtime: z.number().int(),

	/** Map category ID */
	category: z.number().int(),

	/** When the map was created */
	created_at: z.string(),

	/** When the map was last updated */
	updated_at: z.string(),

	/** Type of leaderboard (e.g., "time", "score", empty if none) */
	leaderboard_type: z.string(),

	/** Sort order for leaderboard (0 = ascending/lower is better, 1 = descending/higher is better) */
	leaderboard_order: z.number().int(),
});

export const MapLeaderboardSchema = z.object({
	/** Current page number */
	page: z.number().int(),

	/** Number of entries per page (25) */
	per_page: z.number().int(),

	/** The map name queried */
	map_name: z.string(),

	/** Type of leaderboard (e.g., "time", "score") */
	leaderboard_type: z.string(),

	/** Sort order (0 = ascending, 1 = descending) */
	leaderboard_order: z.number().int(),

	/** Array of leaderboard entries */
	entries: z.array(
		z.object({
			/** Leaderboard position */
			position: z.number().int(),

			/** Player's username */
			player_name: z.string(),

			/** Score or time value */
			value: z.number().int(),

			/** When the entry was recorded */
			date: z.string(),
		}),
	),
});

export const SkinListingsSchema = z.object({
	/** The skin index queried */
	skin_index: z.number().int(),

	/** Total number of active listings */
	total_listings: z.number().int(),

	/** Lowest listed price (0 if no listings) */
	lowest_price: z.number().int(),

	/** Average sale price from last 7 days */
	average_price: z.number(),

	/** Total quantity of this skin in circulation */
	total_circulating: z.number().int(),

	/** Paginated list of active listings (sorted by price ascending) */
	listings: z.array(
		z.object({
			/** Listing price in KR */
			price: z.number().int(),

			/** Seller's username */
			seller_name: z.string(),

			/** When the listing was created */
			listed_at: z.string(),
		}),
	),
});
