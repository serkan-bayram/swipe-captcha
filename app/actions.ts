"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const xPos = parseInt(formData.get("xPos")?.toString() || "0")
    .toFixed(0)
    .toString();

  const username = formData.get("username");
  const password = formData.get("password");
  const answer = formData.get("answer")?.toString() || "";

  // Key and IV (Initialization Vector) setup
  const algorithm = "aes-256-cbc"; // AES encryption with a 256-bit key
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, "hex");
  const iv = Buffer.from(process.env.ENCRYPTION_IV!, "hex");

  // Function to decrypt text
  function decrypt(encryptedData: string) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  const decryptedAnswer = decrypt(answer);

  const isClose = Math.abs(parseInt(xPos) - parseInt(decryptedAnswer)) <= 5;

  if (isClose && username === "a" && password === "a")
    return redirect("/success");

  return redirect("/");
}
