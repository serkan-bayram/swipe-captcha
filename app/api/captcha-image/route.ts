import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import crypto from "crypto";
import assert from "assert";

export async function GET(request: Request) {
  const inputImagePath = `${process.cwd()}/photos/example.jpg`;

  const outputImagePath = `${process.cwd()}/photos/output.jpg`;

  // Load the image
  const image = await loadImage(inputImagePath);

  const canvasSize = { width: 192, height: 112 };
  const boxSize = 32;

  const randomX = parseInt(
    (Math.random() * (canvasSize.width - boxSize)).toFixed(0)
  );
  const randomY = parseInt(
    (Math.random() * (canvasSize.height - boxSize)).toFixed(0)
  );
  const boxes = [
    { x: randomX, y: randomY, width: boxSize, height: boxSize, color: "red" },
  ];

  // Create a canvas with the same dimensions as the image
  const canvas = createCanvas(canvasSize.width, canvasSize.height);
  const ctx = canvas.getContext("2d");

  // Draw the image onto the canvas
  ctx.drawImage(image, 0, 0, canvasSize.width, canvasSize.height);

  // Draw each box
  boxes.forEach((box) => {
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.width, box.height); // Draw the rectangle
  });

  // Save the canvas as an image
  const buffer = canvas.toBuffer("image/jpeg");
  fs.writeFileSync(outputImagePath, buffer);

  console.log("answer x: ", randomX);

  // Key and IV (Initialization Vector) setup
  const algorithm = "aes-256-cbc"; // AES encryption with a 256-bit key
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, "hex");
  const iv = Buffer.from(process.env.ENCRYPTION_IV!, "hex");

  // Function to encrypt text
  function encrypt(text: string) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  return Response.json({
    buffer: buffer,
    answer: encrypt(randomX.toString()),
    yPos: randomY,
  });
}
