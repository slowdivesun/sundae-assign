"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const InstaSection = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

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

    const func = () => {
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
    };

    func();

    // fetch("/api/profile-data")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data);
    //     setLoading(false);
    //   });
  }, [searchParams]);

  //   if (isLoading) return <p>Loading...</p>;
  //   if (!data) return <p>No profile data</p>;
  //   console.log(data);

  return <div>Insta Section</div>;
};

export default InstaSection;