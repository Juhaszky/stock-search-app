export interface Detail {
    "Meta Data": MetaData;
    "Monthly Time Series": { [date: string]: MonthData };
}
export interface MetaData {
    "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed": string,
    "4. Time Zone": string
}
export interface MonthData {
    "1. open": number;
    "2. high": number;
    "3. low": number;
    "4. close": number;
    "5. volume": number;
}