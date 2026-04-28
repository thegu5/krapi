export const Region = {
	// Unknown: 0,
	// Oceania: 1,
	Asia: 2,
	Europe: 3,
	NorthAmerica: 4,
	// SouthAmerica: 5
} as const;
export type Region = (typeof Region)[keyof typeof Region];

export const MatchResult = {
	Draw: -1,
	Loss: 0,
	Win: 1,
} as const;
export type MatchResult = (typeof MatchResult)[keyof typeof MatchResult];

export const LeaderboardOrder = {
	Ascending: 0,
	Descending: 1,
} as const;
export type LeaderboardOrder = (typeof LeaderboardOrder)[keyof typeof LeaderboardOrder];
