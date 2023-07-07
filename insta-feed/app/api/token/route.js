import axios from "axios";
import { NextResponse } from "next/server";

// export const runtime = "nodejs";
// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

export async function POST(req, res) {
  console.log("Here's req: ", req);
  // let body = await req.json();
  // console.log("Here's req in json: ", body);
  let req_text = await req.text();
  console.log("Here's req text : ", req_text);
  console.log("type: ", typeof req_text);
  let req_json = await JSON.parse(req_text);
  console.log("Here's req json : ", req_json);
  // let body = await req_json.body;
  // console.log("Here's body : ", body);
  let code = req_json.code;
  let redirectUri = req_json.redirectUri;
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
    data: formData,
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
    console.log("Data response of short-lived: ", result.data);

    // Got access token. Parse string response to JSON
    // accessToken = JSON.parse(result).access_token;
    accessToken = await result.data.access_token;
    console.log("Token response of short-lived: ", accessToken);

    try {
      let resp = await axios.get(
        `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.NEXT_PUBLIC_SECRET}&access_token=${accessToken}`
      );
      console.log("Response of long-lived: ", resp);
      let longAccessToken = resp.data.access_token;
      console.log("Token response of long lived: ", longAccessToken);

      return NextResponse.json({
        msg: "Done with long-lived!",
        longAccessToken,
        status: 200,
      });
      // save accessToken  to Database
    } catch (e) {
      console.log("Error getting long-lived token:= ", e);
      return NextResponse.json({
        msg: `Error: ${e}`,
        status: 500,
      });
    }
  } catch (e) {
    console.log("Error getting short-lived token:= ", e);
    return NextResponse.json({
      msg: `Error: ${e}`,
      status: 500,
    });
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
