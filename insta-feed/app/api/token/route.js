import axios from "axios";

export async function POST(req) {
  console.log("Here's req: ", req);
  let code = req.body.code;
  let redirectUri = req.body.redirectUri;
  let accessToken = null;
  let formData = new FormData();

  formData.append("client_id", process.env.NEXT_PUBLIC_APP_ID);
  formData.append("client_secret", process.env.NEXT_PUBLIC_SECRET);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", redirectUri);
  formData.append("code", code);

  // console.log("formData: ", formData);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.instagram.com/oauth/access_token",
    headers: {
      "Content-Type": "multipart/form-data",
      // ...formData.getHeaders(),
    },
    data: data,
  };

  const bodyJson = {
    client_id: process.env.NEXT_PUBLIC_APP_ID,
    client_secret: process.env.NEXT_PUBLIC_SECRET,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code,
  };

  try {
    // send form based request to Instagram API
    // let result = await request.post({
    //   url: "https://api.instagram.com/oauth/access_token",
    //   form: {
    //     client_id: process.env.NEXT_PUBLIC_APP_ID,
    //     client_secret: process.env.NEXT_PUBLIC_SECRET,
    //     grant_type: "authorization_code",
    //     redirect_uri: redirectUri,
    //     code: code,
    //   },
    // });

    // let result = await fetch("https://api.instagram.com/oauth/access_token", {
    //   method: "POST",
    //   body: {
    //     form: {
    //       client_id: process.env.NEXT_PUBLIC_APP_ID,
    //       client_secret: process.env.NEXT_PUBLIC_SECRET,
    //       grant_type: "authorization_code",
    //       redirect_uri: redirectUri,
    //       code: code,
    //     },
    //   },
    // });

    let result = await axios.request(config);
    console.log("Response of short-lived: ", result);

    // Got access token. Parse string response to JSON
    accessToken = JSON.parse(result).access_token;
    console.log(
      "Token response of short-lived: ",
      JSON.parse(result).access_token
    );

    try {
      let resp = await axios.get(
        `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.NEXT_PUBLIC_SECRET}&access_token=${accessToken}`
      );
      console.log("Response of long-lived: ", resp);
      //   accessToken = resp.data.access_token;
      // save accessToken  to Database
    } catch (e) {
      console.log("Error getting long-lived token:= ", e);
    }

    return NextResponse.json({ msg: "Done!", status: 200 });
  } catch (e) {
    console.log("Error getting short-lived token:= ", e);
  }

  //   const { searchParams } = new URL(request.url);
  //   const id = searchParams.get("id");
  //   const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "API-Key": process.env.DATA_API_KEY,
  //     },
  //   });
  //   const product = await res.json();

  //   return NextResponse.json({ product });
}
