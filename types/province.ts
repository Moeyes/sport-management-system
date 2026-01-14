export interface Province {
	id: string;
	name: string;
	khmerName?: string;
	athleteCount: number;
	medals: {
		gold: number;
		silver: number;
		bronze: number;
		total: number;
	};
	rank?: number;
}
