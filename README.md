# Super Message Board

- supports in-place editing

- implemented as a Single Page Application (SPA)

- message rendering engine uses `momentjs` library, as recommended

## Limitations

- This message board has a rudimentary authentication feature.
On the landing page the user should enter their name and password.
If the user name is not found, a new user with provided password will be created.
If the user name already exist in the database, application will check if
the password is correct.

- Users can read, post, edit, and delete messages.

- Users can reply to a message, but only at one level. It is not possible
to reply on a reply.

## Installation

run `npm install`

then `node server.js`

## Link to Heroku

https://infinite-harbor-4519.herokuapp.com
