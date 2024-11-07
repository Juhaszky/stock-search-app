# Stock Search App

A web application that allows users to search for stock quotes and view detailed data using the Alpha Vantage API.

## Features

- **Search Stocks**: Users can search for stocks by **name** or **symbol**.
- **Best Match Search**: The app finds the best match for the stock based on the user's symbol or name input. (this is a third api's integration ([ticker search][1]))
- **Stock Details**: Users can view detailed information about stocks, including:
  - **Name**: The name of the company or stock.
  - **Stock Values**:
    - **Open**: The price of the stock at market open.
    - **High**: The highest price of the stock during the trading day.
    - **Low**: The lowest price of the stock during the trading day.
    - **Volume**: The number of shares traded.
  - **Chart**: A historical chart showing the stock's performance over time.
  - **Current Price**: The current price of the stock.

## How It Works

1. **Search View**:
   - The user enters a stock **name** or **symbol** to search for.
   - The app makes an API call to fetch stock data based on the user input.

2. **Details View**:
   - After selecting a stock from the search results, the user can view detailed information about the stock. Stock informations like: the stock’s name, current price, values (open, high, low), volume, and a historical chart showing price trends.

## API Integration

The app fetches stock data from **Alpha Vantage API** using the following endpoints:
- **Stock Search**: `/api/search?query={query}`
- **Stock Details**: `/api/detail?symbol={symbol}`

These endpoints retrieve information about stocks such as historical price data, volume, and the latest market prices.

## Setup

To run the app locally, follow these steps:

1. Clone this repository:
   **git clone https://github.com/Juhaszky/stock-search-app**
   
2. Install dependencies:
 **npm install**
3. Set up environment variables:
`NEXT_PUBLIC_API_URL=https://your-api-url`
`API_KEY=your-alpha-vantage-api-key`
4. Run the development server:
**npm run dev**

5. Open the app
In your browser at http://localhost:3000.

##Technologies used
- [Next.js][2]
- [Tailwind CSS][3]
- [Alpha Vantage API][4]

[1]: https://www.alphavantage.co/documentation/#symbolsearch "ticker search"
[2]: https://nextjs.org/ "Next.js"
[3]: https://tailwindcss.com/ "Tailwind CSS"
[4]: https://www.alphavantage.co/ "Alpha Vantage API"