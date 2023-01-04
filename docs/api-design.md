
### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string
  * pasword confirmation: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

### Sign Up

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * first name: string
  * last name: string
  * email: string
  * username: string
  * password: string
  * password confirmation: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```

### Account Details View

* Endpoint path: /account
* Endpoint method: GET

* Headers:
* Authorization: Bearer token

* Response: Account details
* Response shape:
    ```json
    {
      "accounts": [
        {
          "first_name": string,
          "last_name": string,
          "email": string,
          "username": string,
        }
      ]
    }
    ```

### Account Update

* Endpoint path: /account
* Endpoint method: PUT

* Request shape (form):
  * first name: string
  * last name: string
  * email: string
  * username: string
 

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "accounts": [
        {
          "first_name": string,
          "last_name": string,
          "email": string,
          "username": string,
        }
      ]
    }
    ```
### Password Update

* Endpoint path: /password
* Endpoint method: PUT

* Request Shape (form):
  * password: string
  * password confirmation: string

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

## List Favorites

* Endpoint path: /favorites
* Endpoint method: GET
* Query parameters:
  * «name»: «purpose»

* Headers:
  * Authorization: Bearer token

* Response: List of favorites and favorite's information

* Response shape (JSON):
    ```
    {
    "favorites":[
        {
            "id": string,
            "name": string,
            "date": datetime,
            "image_url": string,
            }
        ]
    }

    ```


## Create a new favorite

* Endpoint path: /favorites
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```
    - name
    - date
    ```

* Response: Gathering anime info
* Response shape (JSON):
    ```
    {
    "favorites":[
        {
            "id": string,
            "name": string,
            "date": datetime,
            "image_url": string,
            }
        ]
    }

    ```

## Watchlist
'''
TBD: Might change to mal_id
'''

### Watchlist List View

* Endpoint path: /watchlists
* Endpoint method: GET
* Query parameters:
  * «name»: «purpose»
* Headers:
  * Authorization: Bearer token

* Request shape (form):
  * username: string


* Response: A list of Watchlist
* Response shape(JSON):
    ```json
    {
      "watchlists": [
        {
          "anime_title": string,
          "anime_intro": string,
          "anime_picture_url": string,

        }
      ]
    }
    ```

### Watchlist Create

* Endpoint path: /watchlists
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (form):
    ```json
    {
      "watchlists": [
        {
          "anime_title": string,
        }
      ]
    }
    ```


* Response: An indication of success or failure
* Response shape(JSON):
    ```json
    {
      true
    }
    ```



### Watchlist Update

* Endpoint path: /watchlists
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (form):
  * username: string
    ```json
    {
      "watchlists": [
        {
          "anime_title": string,
          "status_completed": boolean,
        }
      ]
    }
    ```


* Response: An indication of success or failure
* Response shape(JSON):
    ```json
    {
      "watchlists": [
        {
          "anime_title": string,
          "status_completed": boolean,
        }
      ]
    }
    ```


### Watchlists DELETE

* Endpoint path: /watchlists
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Request shape (form):
  * username: string
    ```json
    {
      "watchlists": [
        {
          "anime_title": string,
        }
      ]
    }
    ```


* Response: An indication of success or failure
* Response shape:
    ```json
    {
      true
    }
    ```

## Anime Details List

* Endpoint path: /anime 
* Endpoint method: GET

* Headers:
* Authorization: Bearer token

* Response: A list of Anime Details 
* Response shape (JSON):

    ```
    {
      “anime”: [
        {
          "title": string,
          ”synopsis”: string,
          "image_url": string html,
          “rating”: integer,
          “streaming_platform”: string,
          “status”: boolean
        }
      ]
    }
    ```



## Search List

* Endpoint path: /search
* Endpoint method: GET
* Query parameters:
  * tv, Movie, ova, special

* Headers:
  * Authorization: Bearer token

* Response: A list of Searches
* Response shape (JSON):

    ```
    {
      “Searches”: [
        {
          “title”: string,
          "text": string,
          “rating”: integer,
          “length”: integer,
          “released_year”: string,
          “status”: boolean
        }
      ]
    }
    ```
