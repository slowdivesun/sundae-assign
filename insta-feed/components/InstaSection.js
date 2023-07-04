"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const InstaSection = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const searchParams = useSearchParams();
    console.log(searchParams.get("code"));

    console.log("params: ", searchParams);
    console.log("redirectUri: ", window.location.origin + "/insta/");

    fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        redirectUri: window.location.origin + "/insta/",
      }),
    });

    // fetch("/api/profile-data")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data);
    //     setLoading(false);
    //   });
  }, []);

  //   if (isLoading) return <p>Loading...</p>;
  //   if (!data) return <p>No profile data</p>;
  //   console.log(data);

  return <div>Insta Section</div>;
};
