"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const InstaSection = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  console.log("im in insta section");

  const searchParams = useSearchParams();
  let code = searchParams.get("code");

  // TEST maessages
  console.log("params: ", searchParams);
  console.log("params code: ", searchParams.get("code"));
  console.log("redirectUri: ", window.location.origin + "/insta/");

  useEffect(() => {
    setLoading(true);
    code = searchParams.get("code");

    // TEST messages
    console.log("params code: ", searchParams.get("code"));

    console.log(
      "body of the request: ",
      JSON.stringify({
        code,
        redirectUri: window.location.origin + "/insta/",
      })
    );

    const func = async () => {
      // const res = await fetch("/api/token/", {
      //   body: JSON.stringify({
      //     code,
      //     redirectUri: window.location.origin + "/insta/",
      //   }),
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // console.log("res: ", res);
      try {
        const res = await axios.post(
          "/api/token/",
          JSON.stringify({
            code,
            redirectUri: window.location.origin + "/insta/",
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res);
        console.log("token: ", res.data?.longAccessToken);
        setToken(res.data?.longAccessToken);
      } catch (error) {
        console.log("/api/token/ api error: ", error);
      }
    };

    func();

    // fetch("/api/profile-data")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data);
    //     setLoading(false);
    //   });
  }, [searchParams]);

  useEffect(() => {
    const func = async () => {
      try {
        let resp = await axios.get(
          `https://graph.instagram.com/me/media?fields=media_type,permalink,media_url&access_token=${token}`
        );
        resp = resp.data;
        let instaPhotos = resp.data
          .filter((d) => d.media_type === "IMAGE")
          .map((d) => d.media_url);
        setData(instaPhotos);
        // Got insta photos
      } catch (e) {
        console.log(e.response.data.error);
      }
    };

    func();
  }, [token]);

  //   if (isLoading) return <p>Loading...</p>;
  //   if (!data) return <p>No profile data</p>;
  //   console.log(data);

  return <div>Insta Section</div>;
};

export default InstaSection;
