export interface RawStore {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    salesStartTime: string;
    salesBreakStartTime: string | null;
    salesBreakEndTime: string | null;
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

export interface FormattedFields {
    salesStartTime: Date;
    salesBreakStartTime: Date | null;
    salesBreakEndTime: Date | null;
    salesEndTime: Date;
    kuramotoStartTime: Date | null;
    kuramotoEndTime: Date | null;
}

export interface RawStores {
    stores: RawStore[];
}

export type Store = Omit<RawStore, keyof FormattedFields> & FormattedFields;

export interface Stores {
    stores: Store[];
}