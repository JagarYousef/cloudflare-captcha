const FailedView = (message) => {
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
    <div class='text-white bg-danger row col-12 col-md-8 card mt-3 d-flex justify-content-center'>
    <h5>Your entered captcha was NOT correct</h5> <br />
    <h6>${message}</h6>
</div>
</div>

<script>
   
</script>
</body>
</html>`
}

export default FailedView