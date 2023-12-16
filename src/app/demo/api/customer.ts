export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    gender?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
}
