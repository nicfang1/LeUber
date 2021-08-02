export interface Origin {
	location:
		| {
				lat: number;
				lng: number;
		  }
		| undefined;
	description: string;
}
