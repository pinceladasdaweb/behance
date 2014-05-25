# Behance Portfolio Page
> Behance Portfolio Page developed with Vanilla JS

![](https://raw.github.com/pinceladasdaweb/Behance-Portfolio-Page/master/screenshot.png)

## Motivation
I created a version of [Vanilla JS](http://vanilla-js.com/) based on the original [tuts+](http://webdesign.tutsplus.com/tutorials/how-to-use-the-behance-api-to-build-a-custom-portfolio-web-page--cms-20884). [Demo here](http://www.pinceladasdaweb.com.br/blog/uploads/behance/).

## How to use?
Behance Portfolio Page is a [Vanilla JS](http://vanilla-js.com/) plugin with no dependancies. Include the [`app.min.js`](assets/js/app.min.js) in the footer of your page and initialise it:

```javascript
(function(window, document, undefined) {
    Be.profile({
        user: 'behance-username-here'
    });
}(window, document));
```
In file [`request.php`](request.php) you must populate the variable $ client_id with the Client ID of your app created in central [Developers Behance](https://www.behance.net/dev/apps).

## Browser support
IE8+ and modern browsers.

## License
Behance Portfolio Page is licensed under the MIT License.