interface RawStore {
	name: string;
	address: string;
	phoneNumber: string;
	salesStartTime: string;
	sakesBreakStartTime: string | null;
	sakesBreakEndTime: string | null;
	salesEndTime: string;
	kuramoto: string;
	kuramotoStartTime: string | null;
	kuramotoEndTime: string | null;
	seat: string | null;
	appetizer: string | null;
	appetizerPrice: number | null;
	timeLimit: string | null;
	additionalNotes: string | null;
}

interface FormattedFields {
	salesStartTime: Date;
	sakesBreakStartTime: Date | null;
	sakesBreakEndTime: Date | null;
	salesEndTime: Date;
	kuramotoStartTime: Date | null;
	kuramotoEndTime: Date | null;
}

type Store = Omit<RawStore, keyof FormattedFields> & FormattedFields;
