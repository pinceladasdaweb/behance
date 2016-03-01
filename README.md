# Behance
> Behance Portfolio Page developed with Vanilla JS

![](https://raw.github.com/pinceladasdaweb/behance/master/screenshot.png)

## Motivation

I created a version of [Vanilla JS](http://vanilla-js.com/) based on the original [tuts+](http://webdesign.tutsplus.com/tutorials/how-to-use-the-behance-api-to-build-a-custom-portfolio-web-page--cms-20884). [Demo here](http://www.pinceladasdaweb.com.br/blog/uploads/behance/).

## How to use?

In file [`index.html`](index.html), just fill out the user variable with your Behance username:

```javascript
Behance({
    user: 'behance-username-here'
});
```
In file [`request.php`](request.php) you must populate the variable $client_id with the Client ID of your app created in central [Developers Behance](https://www.behance.net/dev/apps).

## Browser support

![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 8+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## License

[MIT](LICENSE)