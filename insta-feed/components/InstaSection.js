"use client";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const InstaSection = () => {
  // state objects
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const searchParams = useSearchParams();
  let code = searchParams.get("code");

  // DEBUG messages
  // console.log("params: ", searchParams);
  // console.log("params code: ", searchParams.get("code"));
  // console.log("redirectUri: ", window.location.origin + "/insta/");

  useEffect(() => {
    setLoading(true);
    code = searchParams.get("code");

    // DEBUG message
    // console.log("params code: ", searchParams.get("code"));

    const func = async () => {
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
          `https://graph.instagram.com/me/media?fields=username,media_type,caption,permalink,media_url,children{media_url}&access_token=${token}`
        );
        resp = resp.data;
        let instaData = resp;
        setData(instaData);
        console.log("insta photos: ", instaData);
      } catch (e) {
        console.log(e.response.data.error);
      }
    };

    func();
  }, [token]);

  // useEffect(() => {
  //   const func = async () => {
  //     try {
  //       let resp = await axios.get(
  //         `https://graph.instagram.com/me/media?fields=username,media_type,caption,permalink,media_url,children&access_token=${token}`
  //       );
  //       resp = resp.data;
  //       let instaData = resp.data;
  //       setData(instaData);
  //       console.log("insta photos: ", instaData);
  //       // Got insta photos
  //     } catch (e) {
  //       console.log(e.response.data.error);
  //     }
  //   };

  //   func();
  // }, [token]);

  //   if (isLoading) return <p>Loading...</p>;
  //   if (!data) return <p>No profile data</p>;
  //   console.log(data);

  return (
    <div>
      {/* {instaPhotos.map((photo) => {
        if (photo.media_type === "IMAGE") {
          return (
            <Image
              src={photo.media_url}
              width={photo.width}
              height={photo.height}
              alt={`an instagram post by ${}`}
            />
          );
        }
      })} */}
      yuhh
    </div>
  );
};

export default InstaSection;
