export default async function handler(req, res) {
  try {
    // Only accept POST from CPAGrip
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const {
      password,
      payout,
      offer_id,
      tracking_id
    } = req.body;

    // SECURITY CHECK
    if (password !== "secretpassword") {
      return res.status(403).json({ error: "Invalid password" });
    }

    if (!tracking_id) {
      return res.status(400).json({ error: "Missing tracking_id" });
    }

    console.log("CPAGrip Postback:", req.body);

    // FORWARD TO BITCOTASKS
    const url = new URL("https://bitcotasks.com/track/postback.php");

    url.searchParams.append("click_id", tracking_id);
    url.searchParams.append("event", "lead");
    url.searchParams.append("payout", payout || "0");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-Postback-Secret": "8b245429d70a4de9b35272af91bb33b925f76d8e"
      }
    });

    const result = await response.text();

    return res.status(200).json({
      success: true,
      forwarded: true,
      bitcotasks_response: result
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Server error"
    });
  }
}
