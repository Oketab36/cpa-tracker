import { useEffect } from "react";

export default function Offerwall({ clickId }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://getafilenow.com/script_include.php?id=1895181&tracking_id=${clickId}`;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clickId]);

  return (
    <div style={{
      backgroundColor: "#111",
      color: "#fff",
      minHeight: "100vh",
      textAlign: "center",
      padding: "30px"
    }}>
      <h1>Complete One Offer Below</h1>
      <p>Rewards unlock automatically after completion.</p>

      <div id="offerwall-container"></div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      clickId: context.query.click_id || ""
    }
  };
}
