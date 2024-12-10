import { SwipeCaptcha } from "@/components/swipe-captcha";
import { login } from "./actions";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/captcha-image");

  const body = await response.json();

  const buffer = body.buffer;

  const base64Image = Buffer.from(buffer).toString("base64");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form action={login} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded-md"
          name="username"
          type="text"
          placeholder="Username"
        />
        <input
          className="border p-2 rounded-md"
          name="password"
          type="password"
          placeholder="Password"
        />

        <SwipeCaptcha
          base64Image={base64Image}
          answer={body.answer}
          yPos={body.yPos}
        />

        <button
          className="bg-black text-white rounded-md px-2 py-2"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
