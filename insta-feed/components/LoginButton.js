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
      <button
        class='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        onClick={onClick}
      >
        Login with Instagram
      </button>
    </div>
  );
};

export default LoginButton;
