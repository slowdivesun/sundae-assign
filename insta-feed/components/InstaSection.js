"use client";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InstaCarousel from "./InstaCarousel";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";

const InstaSection = () => {
  // state objects
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
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
        console.log("token: ", res.data?.longAccessToken);
        if (res.data && res.data.longAccessToken) {
          setToken(res.data.longAccessToken);
        }
      } catch (error) {
        setError(true);
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
        if (resp.data) {
          let instaData = resp.data;
          setData(instaData);
          console.log("data: ", data);
        }
        setLoading(false);
      } catch (e) {
        setError(true);
        console.log(e.response.data.error);
      }
    };

    func();
  }, [token]);

  if (isLoading)
    return (
      <p>
        <CircularProgress />
      </p>
    );
  if (error)
    return (
      <p>
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          Could not fetch data — <strong>check out your permissions!</strong>
        </Alert>
      </p>
    );
  //   if (!data) return <p>No profile data</p>;
  //   console.log(data);

  return (
    <div>
      {console.log("data inside return: ", data)}
      {data?.map((post, i) => {
        if (post.media_type === "IMAGE") {
          return (
            <Image
              key={i}
              src={post.media_url}
              width={post.width}
              height={post.height}
              alt={`an instagram post by ${post.username}`}
            />
          );
        }
        return <InstaCarousel key={i} post={post} />;
      })}
    </div>
  );
};

export default InstaSection;
