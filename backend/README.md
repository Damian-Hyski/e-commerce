### Description of Endpoints for Products

| Patch                         | Method    | How it works
| -                             | -         | -
| /products                     | `GET`     | Retrieves all products
| /products                     | `POST`    | Adds a new product
| /products/`1`                 | `GET`     | Retrieves the product with id `1`
| /products/`1`                 | `PUT`     | Edits the product with id `1`
| /products/`1`                 | `DELETE`  | Deletes the product with id `1`
| /products/`1`/reviews         | `GET`     | Displays all reviews of the product with id `1`
| /products/`1`/reviews         | `POST`    | Adds a new review to the product with id `1`
| /products/`1`/reviews/`2`     | `GET`     | Retrieves the review with id `2` from the product with id `1`


### Product data structure
#### `[GET] example.com/products/1`

<details>

    {
        "id": 1,
        "reviews": [{
            "id": 1,
            "review": "example review",
            "rating": 5,
            "date": "2023-11-24T09:21:28.688527Z",
            "user": 1,
            "product": 1
        }],
        "name": "example name",
        "description": "example description",
        "current_price": "32.00",
        "old_price": "64.00",
        "in_stock": true,
        "quantity_in_stock": 12,
        "status": true
    }

</details>

### Review data structure
#### `[GET] example.com/products/1/reviews/1`

<details>

    {
        "id": 1,
        "review": "example review",
        "rating": 5,
        "date": "2023-11-24T09:21:28.688527Z",
        "user": 1,
        "product": 1
    }

</details>
