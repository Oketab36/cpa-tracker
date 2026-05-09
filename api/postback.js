export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // 🔥 SAFE BODY PARSING (CPAGrip is inconsistent)
    let body = req.body;

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    body = body || {};

    const password = body.password;
    const payout = body.payout;
    const offer_id = body.offer_id;
    const tracking_id = body.tracking_id || body.subid || body.click_id;

    console.log("🔥 RAW CPAGrip POSTBACK:", body);

    // SECURITY CHECK
    if (password !== "secretpassword") {
      return res.status(403).json({ error: "Invalid password" });
    }

    if (!tracking_id) {
      console.log("❌ Missing tracking_id");
      return res.status(400).json({ error: "Missing tracking_id" });
    }

    // 🚀 BUILD BITCOTASKS POSTBACK
    const url = new URL("https://bitcotasks.com/track/postback.php");

    url.searchParams.set("click_id", tracking_id);
    url.searchParams.set("status", "approved");
    url.searchParams.set("event", "lead");

    // optional debugging only
    if (payout) {
      url.searchParams.set("payout", payout);
    }

    console.log("➡️ Sending to Bitcotasks:", url.toString());

    // 🚀 SEND TO BITCOTASKS
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-Postback-Secret": "0354e625600128cb486a9f1e27825ba76395028b"
      }
    });

    const result = await response.text();

    console.log("📩 BITCOTASKS RESPONSE:", result);

    return res.status(200).json({
      success: true,
      forwarded: true,
      tracking_id,
      bitcotasks_response: result
    });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);

    return res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
