export interface Task {
	id: string;
	title: string;
	description: string;
	isUsed: boolean;
	lastUpdated: Date | string;
}
