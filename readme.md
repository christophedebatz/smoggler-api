Welcome to Smoggler API
===================


Smoggler is a mobile app which allow user being aware of its own tobacco consumption.

----------


API documentation
-------------

#### <i class="icon-file"></i> Create a user ####

Via Facebook access token, with this request:

> **POST** /api/users

```
{
   "fbAccessToken": "<user-fb-token>",
   "fbId": "<user-fb-id>",
   "email": "<user-email>",
   "firstName": "<user-first-name>",
   "lastName": "<user-last-name>",
   "pictureUrl": "<user-picture-url>"
}
```

#### <i class="icon-file"></i> Authenticate user ####

All other request has to be authenticated through a token that has to be passed on an Authorization header.

You have to proceed like that:

> **GET** /api/me/cigarettes

> `Authorization`:**`[fb-user-id]`**-**`[fb-user-access-token]`**

Authorization value example:

> **VuY35sGQK0RpNsArp3**-**ox5U1bbiBN4ulJm6OPriLHxKOgwxq9d3ox5U1bbiBN4ulJm6OPriLHxKOgwxq9d36uf6r**

#### <i class="icon-file"></i> Add user cigarette(s) ####

You can add one or several cigarette by requesting the user-cigarettes endpoint like this (example to add 2 cigarettes for a user):

> **POST** /api/me/cigarettes

> `Authorization`:**`[fb-user-id]`**-**`[fb-user-access-token]`**
```
[
	{
		"creationDate": "2016-01-08T00:00:00-06:00",
		"sentiment": "chilling"
	},
	{
		"creationDate": "2016-01-08T00:01:00-03:00",
		"sentiment": "drunk"
	},
	{
		...
	}
]
```

 > - The `creationDate`parameter is optional. If you don't pass it to request, it will equals to the current time.
 > - The `sentiment` parameter is optional. If you don't pass it to request, it will remains `NULL`.
 > - The available sentiments list is:

 >  - `happy`
 >  - `not-happy`
 >  - `nostalgic`
 >  - `chilling`
 >  - `drunk`
 >  - `sick`

#### <i class="icon-file"></i> Retrieve user cigarettes ####

You can retrieve user cigarettes history by querying the following endpoint:

> **GET** /api/me/cigarettes[?**from=date**&**to=date**]

> `Authorization`:**`[fb-user-id]`**-**`[fb-user-access-token]`**


> - **from**: the date from the first cigarette will be show
> - **to**: the date until the last cigarette is taken
> Note: There is a max of 10 days of cigarette per request. If you need more than this period, you have to make multiple requests.
