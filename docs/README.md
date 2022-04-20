# APIs

## POST("/verify-user")

### Usage

get user information

### frontend

### backend

```json
{
    "userName": "example username",
    "pfp": "https://s.gravatar/avatar/102o301238.png",
    "email": "test@test.com",
    "follower": [0,1,2,3],
    "following": [0,1,2,3],
    "firstName": "FirstName",
    "lastName": "LastName",
    "gender": "male",
    "location": {
        "longitude": "39.010518",
        "latitude": "-75.340201",
    },
    "auth0Id": "auth0|625a299e379bfd006f271119",
}
```
## GET("/profile")

### Usage

Get user profile

### frontend

### backend

```json
{
  "location": { "longitude": "37.423021", "latitude": "-122.083739" },
  "id": "625f836ef6e7af31574772da",
  "auth0Id": "auth0|625e1a95359d0b006f4e99e9",
  "email": "sjqskqqp@gmail.com",
  "username": "sjqskqqp",
  "picture": "newPictureUrl",
  "follower": [],
  "following": [],
  "firstName": "newFirstName",
  "lastName": "newLastName",
  "gender": "female"
}
```

## PUT("/profile")

### Usage
modify user profile

### frontend

```json
{
    "picture": "newPictureUrl",
    "firstName": "newFirstName",
    "lastName": "newLastName",
    "gender": "female",
    "location": {
        "latitude": "-122.083739",
        "longitude": "37.423021",
    }
}
```

### backend

```json
{
  "location": { "longitude": "37.423021", "latitude": "-122.083739" },
  "id": "625f836ef6e7af31574772da",
  "auth0Id": "auth0|625e1a95359d0b006f4e99e9",
  "email": "sjqskqqp@gmail.com",
  "username": "sjqskqqp",
  "picture": "newPictureUrl",
  "follower": [],
  "following": [],
  "firstName": "newFirstName",
  "lastName": "newLastName",
  "gender": "female"
}
```

## GET("/user/:username")

### Usage
Get a user's profile information

### frontend
### backend

```json
{
  "location": { "longitude": "37.423021", "latitude": "-122.083739" },
  "id": "625f836ef6e7af31574772da",
  "auth0Id": "auth0|625e1a95359d0b006f4e99e9",
  "email": "sjqskqqp@gmail.com",
  "username": "sjqskqqp",
  "picture": "newPictureUrl",
  "follower": [],
  "following": [],
  "firstName": "newFirstName",
  "lastName": "newLastName",
  "gender": "female"
}
```

## PUT("/user/:username/follow")

### Usage

Follow a user

### frontend
### backend

## PUT("/user/:username/unfollow")

### Usage

Unfollow a user

### frontend
### backend

## GET("/post/:id")

### Usage

Get a single post

### frontend

```json
{
    "id": "62600ba4a8200d11a28ce83c"
}
```

### backend

```json
{
    "id": "62600ba4a8200d11a28ce83c",
    "content": "abasldkfjlasj",
    "image": null,
    "createAt": "2022-04-20T13:33:24.366Z",
    "authorId": "auth0|625fd39599de6d0069fbe1a1",
    "likedBy": [],
    "comments": []
}
```

## DELETE("/post/:id")

### Usage

Delete a single post

### frontend

### backend

```json
{
    "id": "6260233c575621ccb48901a8",
    "content": "abasldkfjlasj",
    "image": null,
    "createAt": "2022-04-20T15:14:04.919Z",
    "authorId": "auth0|625fd39599de6d0069fbe1a1",
    "likedBy": [],
    "comments": []
}
```

## GET("/post/feeds")

### Usage

Get user posts feeds (requires login)

### frontend

### backend

```json
{
    ["62600b9a1c89d7d328e8660a", "62600ba4a8200d11a28ce83c"]
}
```

## GET("/post/from/:username")

### Usage

Get all posts from certain user

### frontend

### backend

```json
{
    [ "62600b9a1c89d7d328e8660a", "62600ba4a8200d11a28ce83c" ]
}
```

## POST("/post/create")

### Usage

create a post

### frontend

```json
{
    "title": "title",
    "content": "another post abcdefg",
}
```

### backend
```json
{
    "id": "62600b9a1c89d7d328e8660a",
    "content": "another post abcdefg",
    "image": null,
    "createAt": "2022-04-20T13:33:14.895Z",
    "authorId": "auth0|625fd39599de6d0069fbe1a1",
    "likedBy": [],
    "comments": []
}
```

## delete("post/:id")

### Usage

delete a post


## PUT("/post/:id/like)

### Usage

like a post

### frontend

### backend

```json
{
    "id": "626023307df19c1d1715b85a",
    "content": "abasldkfjlasj",
    "image": null,
    "createAt": "2022-04-20T15:13:52.059Z",
    "authorId": "auth0|625fd39599de6d0069fbe1a1",
    "likedBy": [ "auth0|625fd39599de6d0069fbe1a1" ],
    "comments": []
}
```

## PUT("/post/:id/unlike)

### Usage

unlike a post

### frontend

### backend

```json
{
    "id": "626023307df19c1d1715b85a",
    "content": "abasldkfjlasj",
    "image": null,
    "createAt": "2022-04-20T15:13:52.059Z",
    "authorId": "auth0|625fd39599de6d0069fbe1a1",
    "likedBy": [],
    "comments": []
}
```