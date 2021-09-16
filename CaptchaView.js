const CaptchaView = (url, uid) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Captcha CloudFlare</title>
</head>
<body>

<div class="container d-flex justify-content-center mt-3">
    <form class="row col-12 col-md-4 card" action='/check' method='post'>
        <img class="mt-3" alt="captcha" width="200" height="150" src='${url}'/>
        <div class="d-flex justify-content-between mt-1">
        <span>* Case sensetive</span>
        <button onclick='{location.reload()}' class='btn btn-secondary'>Refresh</button>
</div>
        <div class="input-group input-group-lg mt-3 col">
            <span class="input-group-text" id="inputGroup-sizing-lg">Answer</span>
            <input name='enteredCaptcha' id='enteredCaptcha' type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" minlength='6' maxlength='6' required>
            <input value='${uid}' name='uid' id='uid' hidden>
        </div>
        <input type="submit" class="mt-3 mb-0 col-12 align-content-center btn btn-primary" value="Submit" />
    </form>
</div>

<script>
   
</script>
</body>
</html>`
}

export default CaptchaView