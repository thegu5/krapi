import assert from "node:assert";
import { before, describe, it } from "node:test";
import { KrunkerApi } from "../dist/index.mjs";

describe("KrunkerApi", () => {
	/** @type {KrunkerApi} */
	let api;

	before(() => {
		const apiKey = process.env.KRUNKER_API_KEY;
		assert.ok(apiKey, "KRUNKER_API_KEY environment variable must be set");
		api = new KrunkerApi({ apiKey });
	});

	describe("Player endpoints", () => {
		it("should fetch player profile", async () => {
			const profile = await api.fetchProfile("thegu5");
			assert.ok(profile, "Profile should be returned");
		});

		it("should fetch player inventory", async () => {
			const inventory = await api.fetchInventory("thegu5");
			assert.ok(inventory, "Inventory should be returned");
		});

		it("should fetch match history for current season", async () => {
			const history = await api.fetchMatchHistory("thegu5");
			assert.ok(history, "Match history should be returned");
		});

		it("should fetch player posts", async () => {
			const posts = await api.fetchPosts("thegu5");
			assert.ok(posts, "Posts should be returned");
		});
	});

	describe("Match endpoints", () => {
		it("should fetch match details", async () => {
			const match = await api.fetchMatch(100);
			assert.ok(match, "Match should be returned");
		});
	});

	describe("Clan endpoints", () => {
		it("should fetch clan info", async () => {
			const clan = await api.fetchClan("KSM");
			assert.ok(clan, "Clan should be returned");
		});

		it("should fetch clan members", async () => {
			const members = await api.fetchClanMembers("KSM");
			assert.ok(members, "Clan members should be returned");
		});
	});

	describe("Leaderboard endpoints", () => {
		it("should fetch ranked leaderboard", async () => {
			const leaderboard = await api.fetchRankedLeaderboard(2);
			assert.ok(leaderboard, "Leaderboard should be returned");
		});
	});

	describe("Map endpoints", () => {
		it("should fetch map info", async () => {
			const mapInfo = await api.fetchMapInfo("525");
			assert.ok(mapInfo, "Map info should be returned");
		});

		it("should fetch map leaderboard", async () => {
			const leaderboard = await api.fetchMapLeaderboard("525");
			assert.ok(leaderboard, "Map leaderboard should be returned");
		});
	});

	describe("Market endpoints", () => {
		it("should fetch skin listings", async () => {
			const listings = await api.fetchListingsForSkin(0);
			assert.ok(listings, "Skin listings should be returned");
		});
	});

	describe("Error handling", () => {
		it("should throw error for invalid player", async () => {
			await assert.rejects(
				async () => await api.fetchProfile("nonexistentplayer123456789"),
				Error,
				"Should throw error for non-existent player",
			);
		});

		it("should throw error for invalid clan", async () => {
			await assert.rejects(
				async () => await api.fetchClan("NONEXISTENTCLAN123456789"),
				Error,
				"Should throw error for non-existent clan",
			);
		});

		it("should throw error for invalid map", async () => {
			await assert.rejects(
				async () => await api.fetchMapInfo("nonexistentmap123456789"),
				Error,
				"Should throw error for non-existent map",
			);
		});
	});
});
