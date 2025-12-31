import assert from "node:assert";
import { before, describe, it } from "node:test";
import { KrunkerApi, Region } from "../dist/index.js";

// These tests exist so that it's easy to know when the zod schemas aren't updated to account for new api changes
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
			await assert.doesNotReject(api.fetchProfile("thegu5"));
		});

		it("should fetch player inventory", async () => {
			await assert.doesNotReject(api.fetchInventory("thegu5"));
		});

		it("should fetch match history for current season", async () => {
			await assert.doesNotReject(api.fetchMatchHistory("thegu5"));
		});

		it("should fetch player posts", async () => {
			await assert.doesNotReject(api.fetchPosts("thegu5"));
		});
	});

	describe("Match endpoints", () => {
		it("should fetch match details", async () => {
			await assert.doesNotReject(api.fetchMatch(100));
		});
	});

	describe("Clan endpoints", () => {
		it("should fetch clan info", async () => {
			await assert.doesNotReject(api.fetchClan("KSM"));
		});

		it("should fetch clan members", async () => {
			await assert.doesNotReject(api.fetchClanMembers("KSM"));
		});
	});

	describe("Leaderboard endpoints", () => {
		it("should fetch ranked leaderboard", async () => {
			await assert.doesNotReject(api.fetchRankedLeaderboard(Region.NorthAmerica));
		});
	});

	describe("Map endpoints", () => {
		it("should fetch map info", async () => {
			await assert.doesNotReject(api.fetchMapInfo("525"));
		});

		it("should fetch map leaderboard", async () => {
			await assert.doesNotReject(api.fetchMapLeaderboard("Lava_Run"));
		});
	});

	describe("Market endpoints", () => {
		it("should fetch skin listings", async () => {
			await assert.doesNotReject(api.fetchListingsForSkin(0));
		});
	});

	describe("Mod endpoints", () => {
		it("should fetch popular mods", async () => {
			await assert.doesNotReject(api.fetchMods());
		});
		
		it("should fetch mod info", async () => {
			await assert.doesNotReject(api.fetchMod("EchoOfWorlds"))
		})
	});
});
