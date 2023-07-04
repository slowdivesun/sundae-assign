import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  let code = req.body.code;
  let redirectUri = req.body.redirectUri;
  let accessToken = null;

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

    let result = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      body: {
        form: {
          client_id: process.env.NEXT_PUBLIC_APP_ID,
          client_secret: process.env.NEXT_PUBLIC_SECRET,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
          code: code,
        },
      },
    });

    // Got access token. Parse string response to JSON
    accessToken = JSON.parse(result).access_token;
    console.log("Response of short-lived: ", resp);

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
