import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

const toEmail = process.env.CONTACT_TO_EMAIL ?? "nicolaseugenio2022@gmail.com";
const fromEmail =
  process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        message:
          "Email delivery is not configured yet. Add RESEND_API_KEY to enable automatic sending.",
      },
      { status: 503 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Invalid contact request." }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const message = clean(payload.message);

  if (!name || !email || !message) {
    return Response.json(
      { message: "Please complete all fields before sending." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject: `Portfolio message from ${name}`,
    replyTo: email,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #18181b;">
        <h2 style="margin: 0 0 16px;">New portfolio message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <div style="margin-top: 20px;">
          <strong>Message:</strong>
          <p style="white-space: normal;">${safeMessage}</p>
        </div>
      </div>
    `,
    text: [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join(
      "\n"
    ),
  });

  if (error) {
    return Response.json(
      { message: error.message ?? "The message could not be sent." },
      { status: 502 }
    );
  }

  return Response.json({
    message: "Message sent successfully.",
    id: data?.id,
  });
}
