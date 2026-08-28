import { redirect } from "next/navigation";

/**
 * The message form used to live behind a chooser on /contact. It now sits on
 * /contact itself, so this route only exists to keep the roughly twenty
 * "Contact Us" and "Talk to someone" links across the site pointing somewhere
 * useful. The hash drops the visitor straight onto the form.
 */
export default function GeneralContactPage() {
  redirect("/contact#form");
}
