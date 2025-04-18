const fetch = require("node-fetch");

module.exports = async (req, res) => {
  console.log("Incoming request method:", req.method);

  if (req.method !== "POST") {
    console.log("Invalid method");
    return res.status(405).send("Method not allowed");
  }

  try {
    const { tech, vendor, jobAddress } = req.body;
    console.log("Received:", { tech, vendor, jobAddress });

    if (!tech || !vendor || !jobAddress) {
      console.log("Missing fields");
      return res.status(400).send("Missing fields");
    }

    const formData = new URLSearchParams();
    formData.append("tech", tech);
    formData.append("vendor", vendor);
    formData.append("jobAddress", jobAddress);

    console.log("Sending to Google Script...");

    const response = await fetch("https://script.google.com/macros/s/AKfycbwxpbpTy3cZD0-FJYhwK7NFeG5U0ZEmMPTcUupBDjLky6zUgSQcBwUNI-3bmlFnWVys/exec", {
      method: "POST",
      body: formData
    });

    const result = await response.text();
    console.log("Google Script responded:", result);

    return res.status(200).send(result);
   } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).send("Proxy failed");
  }
};
