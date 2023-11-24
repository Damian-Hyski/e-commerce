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