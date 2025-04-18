
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { tech, vendor, jobAddress } = req.body;

  if (!tech || !vendor || !jobAddress) {
    return res.status(400).send("Missing fields");
  }

  const formData = new URLSearchParams();
  formData.append("tech", tech);
  formData.append("vendor", vendor);
  formData.append("jobAddress", jobAddress);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwxpbpTy3cZD0-FJYhwK7NFeG5U0ZEmMPTcUupBDjLky6zUgSQcBwUNI-3bmlFnWVys/exec", {
      method: "POST",
      body: formData
    });

    const result = await response.text();
    return res.status(200).send(result);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).send("Proxy failed");
  }
};
