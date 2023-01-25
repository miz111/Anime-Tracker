# Data models

## Favorites microservice

---

### Favorites

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| user_id          | string | yes    | no       |
| anime_title      | string | no     | no       |
| data             |  date  | no     | no       |
| img_url          | string | no     | no       |

The favorite service contains data about users' favorite anime series list and user can create a new favorite for their favorite anime.

## Watchlist microservice

---

### Watchlist

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| user_id          | string | yes    | no       |
| anime_title      | string | no     | no       |
| data             |  date  | no     | no       |
| img_url          | string | no     | no       |

The watchlist service contains data about users' watchlist, series that can be saved that allows users to watch a series later. Users can also add a series into their watchlist as well.

## Account microservice

---

### Account

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| first_name       | string | no     | no       |
| last_name        | string | no     | no       |
| email            | string | yes    | no       |
| username         | string | yes    | no       |
| password         | string | no     | no       |

The accounts service allows users to sign-up, login and allow users to access their favorites and watchlist data. 
