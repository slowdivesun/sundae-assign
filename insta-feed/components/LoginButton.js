"use client";

const LoginButton = () => {
  const onClick = () => {
    let appId = process.env.NEXT_PUBLIC_APP_ID;
    console.log(appId);
    let redUri = window.location.origin + "/insta/";
    // redUri = "https://localhost:3000/";
    console.log(redUri);
    let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`;
    window.open(url, "_blank").focus();
  };
  return (
    <div>
      <button onClick={onClick}>Login with Instagram</button>
    </div>
  );
};

export default LoginButton;
