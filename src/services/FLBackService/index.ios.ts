const FLBackService = {
	setAutostart: (): boolean => false,
	setBackground: (): boolean => false,
	setInterval: (): number => 5,
	getAutostart: (): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			resolve(false);
		});
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	start: (): void => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	stop: (): void => {},
};

export default FLBackService;
