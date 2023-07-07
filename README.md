# Instagram Basic Display API

## Pages
- Home Page: Click on the button to be redirected to Instagram for authentication
- /insta: After completing authentication, you will be redirected here and depending on the status of API call, either a loader, an error message or your posts will be displayed

## /insta Page
- Albums are displayed as carousel
![alt text](https://github.com/slowdivesun/sundae-assign/new/master/screenshots/image.jpg)

- Information like followers, following and like count cannot be displayed since the Basic Display API doesn't cover them.

- If too many requests are made, instagram will return a 429. In this case, alt text will be displayed
