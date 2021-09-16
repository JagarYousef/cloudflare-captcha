# Cloudflare Captcha
This is a simple demo on how we can use Cloudflare workers with KV to create our own simple captcha.

### DEMO
https://captcha-cloudflare.kurd.cc

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

<br>

#### NOTE: 
This has been submitted as a participation in <strong>Cloudflare Summer Challenge</strong>