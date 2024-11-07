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
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
}