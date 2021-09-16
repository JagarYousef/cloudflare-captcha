# Cloudflare Captcha
This is a simple demo on how we can use Cloudflare workers with KV to create our own simple captcha.
It uses pure JS with Cloudflare Workers and KV without any external packages.

### DEMO
https://captcha-worker.cergo.workers.dev
![Screenshot](https://user-images.githubusercontent.com/41321155/133565123-491bddbb-af19-40ed-bbe2-0e6e12fb352a.png)

### How does it work?
1. It creates a temporal UID and a corresponding captcha value, per request and save them in KV
`{UID: CAPTCHA_VALUE}` (expires after 60 seconds) <br>
2. It generates an image from a free text-over-image from https://textoverimage.moesif.com and load it
<br>
3. It compares the UID and the entered captcha value then generate an encrypted token.
<br>

### How to make it more secure? <br>
* Create your own text-over-image backend because the used free one has the captcha text value in its url!<br>
* Save the token to a database to use it later or to use it as a session token.
* Find your own better way to encrypt and generate the token
<br>

### Limits
* You cannot control `DOM` in Cloudflare, so I was not able to use `Canvas` to generate `Base64` image data and I didn't want to pass the Captcha value just as a String in the HTML, that is why I used an external API to generate the image.

#### NOTE: 
This has been submitted as a participation in <strong>Cloudflare Summer Challenge</strong>