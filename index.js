import CaptchaView from "./CaptchaView.js";
import SuccessView from './SuccessView'
import FailedView from './FailedView'
import {encrypt} from './Cryptor'

addEventListener('fetch', event => {

  event.respondWith(handleRequest(event.request))
})


async function increaseFailureTimes(ip) {
  const currentTimes = await FAILS_KV.get(ip)
  if (currentTimes === null){
    await FAILS_KV.put(ip, 1)
  }else{
    await FAILS_KV.put(ip, parseInt(currentTimes) + 1)
  }

}

async function getFailureTimes(ip) {
  return await FAILS_KV.get(ip)
}

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  if (request.url.includes("check")){
    const data = await request.formData()
    console.log(data)
    const enteredCaptcha = data.get("enteredCaptcha")
    const uid = data.get("uid")

    if (await checkCaptcha(uid, enteredCaptcha)){

      const token = await generateCaptchaToken(uid, enteredCaptcha)
      return Response.redirect(request.url.replace("check", "success?token=" + token), 301)
    }else{
      return Response.redirect(request.url.replace("check", "failed"), 301)
    }

  }else if (request.url.includes("success")){
    return new Response(SuccessView(decodeURI(request.url.split("?")[1])), {
      headers: { 'content-type': 'text/html' },
    })
  }else if (request.url.includes("failed")){
    await increaseFailureTimes(request.headers.get("cf-connecting-ip"))
    const message = await getFailureTimes(request.headers.get("cf-connecting-ip")) + " failures from this IP: " + request.headers.get("cf-connecting-ip")

    return new Response(FailedView(message), {
      headers: { 'content-type': 'text/html' },
    })
  }else{
    const captchaValue = createRandom(6)
    const captchaImageUrl = generateImage(captchaValue)
    const tempUID = createRandom(10)
    const response = new Response(CaptchaView(captchaImageUrl, tempUID), {
      headers: { 'content-type': 'text/html' },
    })
    await saveCookieUID(captchaValue, response, tempUID)
    await saveCaptchaKV(tempUID, captchaValue)
    return response
  }


}

async function generateCaptchaToken(uid, enteredCaptcha) {
  const token = await encrypt(uid, uid+enteredCaptcha)
  return token
}



async function saveCaptchaKV(tempUID, captchaValue) {
  await CAPTCHA_KV.put(tempUID, captchaValue, {expiration: Math.floor(Date.now()/1000) + 60})
}

async function checkCaptcha(uid, enteredCaptcha){
  return await CAPTCHA_KV.get(uid) === enteredCaptcha
}

function generateImage(text){
  return "https://textoverimage.moesif.com/image?image_url=https%3A%2F%2Fi.imgur.com%2FYaICixf.png&overlay_color=faae4059&text="+text+"&text_color=3a393bff&text_size=32&y_align=middle&x_align=center"
}


function createRandom(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
  }
  return result;
}

async function saveCookieUID(currentCaptcha, response, uid){
  const uidCookie = `uid=${uid}; path=/; secure;`;
  response.headers.set('Set-Cookie', uidCookie);
}

