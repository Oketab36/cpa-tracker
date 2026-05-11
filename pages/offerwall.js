import { useEffect } from "react";

export default function Offerwall() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://getafilenow.com/script_include.php?id=1895181";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{
      backgroundColor: "black",
      color: "white",
      textAlign: "center",
      minHeight: "100vh",
      padding: "30px"
    }}>
      <h1>Complete One Offer Below</h1>
      <p>Rewards unlock automatically after completion.</p>

      {/* Offerwall loads here */}
      <div id="offerwall-container" />
    </div>
  );
}
