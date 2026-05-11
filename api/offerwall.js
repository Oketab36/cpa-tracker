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
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        padding: "30px"
      }}
    >
      <h1>Complete Any Offer Below</h1>
      <p>
        Finish one quick task to unlock your reward.
      </p>

      <script
        src={`https://getafilenow.com/script_include.php?id=1895181&tracking_id=${clickId}`}
        async
      ></script>
    </div>
  );
}
