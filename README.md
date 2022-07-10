# My Stock Tracker

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-whqg4l)

# ROADMAP

## STEP #1 - Implement the ability to enter a stock symbol and store all entered symbols in local storage

* [x] display simple form that asks for a stock symbol (1-5 letter code)
* [x] When click on "Track stock", store the entered stock symbol in local storage

## STEP #2 - Display current quote data for all stocks that have been added

* [x] Use Finnhub API to get current stock quote data
* [x] You can use Unicode arrows from this list or use your own images
* [x] The list of displayed stocks should be restored from local storage when the application is loaded in the browser

- https://finnhub.io/docs/api/quote
- https://finnhub.io/docs/api/symbol-search

## STEP #3 - Add an insider sentiment page

* [x] Use the component router to add a /sentiment/:symbol URL
* [x] displays the sentiment information for the last 3 months
* [x] For each, month display a green arrow if the change was positive, and a red arrow if negative
* [x] Also, display both the values of change and mspr

- https://finnhub.io/docs/api/insider-sentiment

# Futur improvment todo
## Stock form
* more secure search input (not allow " " and trim " x"," x ", "x ")
* add a loading "message/animation" while searching though the API
* cache the not existing stock name ?

## Filters
* add sorting by price/name
* add filter by country/industry

## List
* add animation fade-in/out when adding/removing card
* button "more details" to display more data about the card

## Sentiment
* when no monthly sentiment on an action then deactivate the link and display an error message directly in the main list
