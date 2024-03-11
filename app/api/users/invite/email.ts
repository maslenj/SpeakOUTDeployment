var postmark = require("postmark");
const emailApiKey = process.env.EMAIL_API_KEY || '';
var client = new postmark.ServerClient(emailApiKey);

export default function sendInviteEmail(email: string, message: string, code: string) {
    client.sendEmail({
        "From": "james.maslen@tufts.edu",
        "To": email,
        "Subject": "Invitation to SpeakOutBoston",
        "HtmlBody": `${message}\nYour access code is ${code}`,
        "TextBody": "Hello from Postmark!",
        "MessageStream": "notifications"
    });
}