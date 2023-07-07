# Instagram Basic Display API

## Pages
- Home Page: Click on the button to be redirected to Instagram for authentication
- /insta: After completing authentication, you will be redirected here and depending on the status of API call, either a loader, an error message or your posts will be displayed

## /insta Page
- Albums are displayed as carousel
| ![Carousel](https://github.com/slowdivesun/sundae-assign/blob/master/insta-feed/public/screenshots/carousel-1.png) | 
|:--:| 
| *Albums as Carousel* |


- Information like followers, following and like count cannot be displayed since the Basic Display API doesn't cover them.

- If too many requests are made, instagram will return a 429. In this case, alt text will be displayed
| ![Too many requests](https://github.com/slowdivesun/sundae-assign/blob/master/insta-feed/public/screenshots/alt-text.png) | 
|:--:| 
| *Too many requests* |


## Issues
- Google has marked the hosted website as a phishing attempt, hence this link needs to be clicked to bypass it
| ![Demo](https://github.com/slowdivesun/sundae-assign/blob/master/insta-feed/public/screenshots/dangerous.png) | 
|:--:| 
| *Demo to bypass warning* |

