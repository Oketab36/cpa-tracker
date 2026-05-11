export async function getServerSideProps(context) {
  const clickId = context.query.click_id || "";

  return {
    props: {
      clickId
    }
  };
}

export default function Offerwall({ clickId }) {
  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "100vh",
        textAlign: "center",
        padding: "30px"
      }}
    >
      <h1>Complete One Offer Below</h1>
      <p>Rewards unlock automatically after completion.</p>

      <script
        src={`https://getafilenow.com/script_include.php?id=1895181&tracking_id=${clickId}`}
        async
      ></script>
    </div>
  );
}
