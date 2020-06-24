# DSStuMeet
Distributed Systems Project

**Register User**
---
    Considers data entered by the user to create an account.

* **URL**

    /register

* **METHOD**

    `POST`

* **Data Params**

    gender
    interests
    username
    email
    password
    passwordVerification
    birthday

* **Success Response**

    * **Code:** 201 CREATED
      **Content:** { msg: 'User has been successfully registered' }

* **Error Response**

    * **Code:** 409 CONFLICT
      **Content:** { errors: [] }

**Login User**
---
    Accepts username and password and redirects user to dashboard

* **URL**

    /Login

* **METHOD**

    `GET`

* **Data Params**

    username
    password

* **Success Response**

    * **Code:** 200 SUCCESS, page redirection

* **Error Response**

    * **Code:** 409 CONFLICT
      **Content:** { errors: [] }

    * **Code:** 500 INTERNAL SERVER ERROR
      **Content:** { msg: 'Password given does not match' }

**Logout User**
---
    Redirects user to register/login page and ends the current session.

* **URL**

    /logout

* **METHOD**

    `GET`

* **SUCCESS Response**

    * **Code:** 200 SUCCESS, page redirection
