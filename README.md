# Anime Reactor

- Jess Zhang
- Chengyun Lee
- Alvi Khandakar
- Jordan Tran
- Tommy Mai

## Design
- [API Design](docs/api-design.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integreations](docs/integrations.md)

## Intended market

We are targeting general anime enjoyers that want to be up to date for the latest anime releases and discover old/new anime.

## Features

- Users to the site can sign-up for an account to use features that come with the site.
    - A watchlist allows users to save into their watchlist to watch an anime series later.
    - A favorites feature allows users to save their all time series into their favorites list.
    - Detailed view of an anime series and will have links to streaming services that will redirect you a streaming site.
- Users can search up any anime titles from OVAs to movies.

## Running the app

- Steps to run this application on your PC
1. Clone the repo down to your pc
2. CD into project.
3. Run `docker volume create pg-admin`
    3.a Run `docker volume create postgres-data`
4. Run `docker compose build`
5. Run `docker compose up`
6. Now go watch some anime

