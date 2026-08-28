import { NextResponse } from "next/server";
import Stripe from "stripe";

import { findProduct, resolvePriceCents } from "@/content/shop";

/**
 * Creates a Stripe Checkout Session and returns its URL.
 *
 * Stripe hosts the payment page, so no card details ever reach this site or
 * this server.
 *
 * The request carries only slug, variant and quantity. Every price is looked
 * up server-side from the catalog, because anything the browser sends about
 * money is a suggestion, not a fact.
 */

type IncomingLine = { slug: string; variant?: string; quantity: number };

const MAX_QTY = 20;

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;

  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Checkout is not connected yet. Add STRIPE_SECRET_KEY to the environment to enable payments.",
      },
      { status: 503 },
    );
  }

  let body: { lines?: IncomingLine[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const lines = Array.isArray(body.lines) ? body.lines : [];
  if (!lines.length) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const line of lines) {
    const product = findProduct(String(line.slug));
    const priceCents = resolvePriceCents(String(line.slug), line.variant);
    const quantity = Math.floor(Number(line.quantity));

    if (!product || priceCents === null) {
      return NextResponse.json(
        { error: "One of the items is no longer available." },
        { status: 409 },
      );
    }
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QTY) {
      return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
    }

    lineItems.push({
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: priceCents,
        product_data: {
          name: line.variant ? `${product.title} (${line.variant})` : product.title,
          description: product.tagline,
        },
      },
    });
  }

  const origin =
    request.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      shipping_address_collection: { allowed_countries: ["US"] },
      billing_address_collection: "auto",
      submit_type: "pay",
    });

    if (!session.url) throw new Error("Stripe returned no checkout URL");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout] Stripe session failed:", error);
    return NextResponse.json(
      { error: "We could not start checkout. Please try again, or call us." },
      { status: 502 },
    );
  }
}
