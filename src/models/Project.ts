import { IsInt } from 'class-validator';

import Category from './Category';

export default class Project {
	@IsInt()
	readonly id: number;
	@IsInt()
	readonly flId: number;
	title: string;
	date: Date;
	price: string;
	text?: string;
	isNew: boolean;
	link: string;
	category?: Category;
}
