import Features from "@/components/Home/features";
import FAQ from "@/components/Home/faq";
import Testimonials from "@/components/Home/testimonials";
import CTA from "@/components/cta";
import Link from "next/link";
import { ShieldCheck, PiggyBank, HandCoins, Users, Zap, Banknote } from "lucide-react";

export default function Home() {
  return (
    <div className="mt-[4rem] md:mt-[6rem] mb-[6rem]">
      {/* Hero */}
      <section className="w-full flex items-start flex-wrap justify-between">
        <div className="w-[97%] mx-auto md:mx-0 md:w-[54%] text-center md:text-left">
          <div className="w-fit flex items-center mx-auto md:mx-0 gap-2 px-4 py-2.5 bg-[var(--card)] border border-base rounded-full">
            <span className="inline-flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-[var(--primary)]" /> Bank‑grade security • Transparent fees
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl 2xl:text-6xl leading-tight pt-5 font-semibold">
            save, invest, and borrow — built for nigerians.
          </h1>

          <p className="text-base md:text-lg text-muted pt-5 max-w-[60ch] mx-auto md:mx-0">
            vestify one is a mobile‑first fintech for nigeria that lets you automate savings, invest in curated low‑risk opportunities, access instant collateralized loans (up to 80% of your savings), join trusted ajo/esusu circles, and make seamless payments via paystack/flutterwave.
          </p>

          <div className="flex items-center gap-3 md:gap-4 mt-7 justify-center md:justify-start">
            <Link href="/signup" className="px-6 py-3 rounded-full btn-primary text-base font-medium">
              start saving now
            </Link>
            <a href="#features" className="px-6 py-3 rounded-full btn-ghost text-base font-medium">
              see how it works
            </a>
          </div>

          <div className="flex items-center gap-6 mt-8 justify-center md:justify-start text-sm text-muted">
            <div className="flex items-center gap-2"><PiggyBank className="w-4 h-4 text-[var(--accent)]" /> automate savings</div>
            <div className="flex items-center gap-2"><HandCoins className="w-4 h-4 text-[var(--primary)]" /> instant loans</div>
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-[var(--secondary)]" /> ajo/esusu</div>
          </div>
        </div>

        <div className="relative w-full md:w-[42%] mt-[2.5rem] md:mt-0">
          <div className="w-full aspect-[4/5] md:aspect-[4/5] rounded-[1.5rem] bg-gradient-to-br from-[color-mix(in_oklab,var(--primary)_80%,black)] to-[color-mix(in_oklab,var(--secondary)_70%,black)] p-1">
            <div className="h-full w-full rounded-[1.25rem] bg-[var(--bg)] grid grid-rows-3 gap-3 p-4">
              <div className="card p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">Savings balance</p>
                  <p className="text-2xl font-semibold">₦420,500</p>
                </div>
                <PiggyBank className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <div className="card p-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-base p-3">
                  <p className="text-xs text-muted">Loan limit</p>
                  <p className="text-xl font-semibold">₦336,400</p>
                </div>
                <div className="rounded-xl border border-base p-3">
                  <p className="text-xs text-muted">Auto‑debits</p>
                  <p className="text-xl font-semibold">Active</p>
                </div>
              </div>
              <div className="card p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">Today</p>
                  <p className="text-base">Saved ₦2,000 • Ajo circle</p>
                </div>
                <Zap className="w-6 h-6 text-[var(--secondary)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="mt-12" id="social-proof">
        <div className="w-full rounded-2xl border border-base bg-[var(--card)] p-5 md:p-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm md:text-base text-muted">
            Trusted by 10,000+ young Nigerians. Works with Paystack and Flutterwave.
          </p>
          <div className="flex items-center gap-5 text-sm">
            <span className="inline-flex items-center gap-2"><Banknote className="w-4 h-4 text-[var(--primary)]" /> Paystack</span>
            <span className="inline-flex items-center gap-2"><Banknote className="w-4 h-4 text-[var(--secondary)]" /> Flutterwave</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[var(--accent)]" /> PCI‑DSS</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24">
        <Features />
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-24">
        <Testimonials />
      </section>

      {/* Pricing */}
      <section id="pricing" className="mt-[4rem] md:mt-[6rem] scroll-mt-24">
        <div className="w-[97%] mx-auto md:mx-0 md:w-[68%] left-0">
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl text-center md:text-left">
            Simple, transparent <span className="text-[var(--accent)]">pricing</span>
          </h2>
          <p className="text-base pt-3 text-muted text-center md:text-left">
            No hidden charges. Interest on loans, small transaction fees, and optional premium.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-6">
            <h3 className="text-xl font-semibold">Starter</h3>
            <p className="text-sm text-muted mt-1">Best for new savers</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>• Automated savings</li>
              <li>• Ajo/Esusu circles</li>
              <li>• Loans up to 60% of savings</li>
              <li>• Paystack/Flutterwave payments</li>
            </ul>
            <Link href="/signup" className="mt-6 inline-flex px-5 py-2 rounded-full btn-primary">Get started</Link>
          </div>
          <div className="card p-6 border-2" style={{ borderColor: "var(--primary)" }}>
            <h3 className="text-xl font-semibold">Growth</h3>
            <p className="text-sm text-muted mt-1">Most popular</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>• Automated savings + goals</li>
              <li>• Curated low‑risk investments</li>
              <li>• Loans up to 80% of savings</li>
              <li>• Referral rewards</li>
            </ul>
            <Link href="/signup" className="mt-6 inline-flex px-5 py-2 rounded-full btn-primary">Start Growth</Link>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold">Pro</h3>
            <p className="text-sm text-muted mt-1">Power features</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>• Investment marketplace</li>
              <li>• Advanced controls and limits</li>
              <li>• Priority support</li>
              <li>• Admin monitoring tools</li>
            </ul>
            <Link href="/signup" className="mt-6 inline-flex px-5 py-2 rounded-full btn-primary">Go Pro</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24">
        <FAQ />
      </section>

      {/* CTA */}
      <CTA />

      {/* Contact */}
      <section id="contact" className="mt-[4rem] md:mt-[6rem] scroll-mt-24">
        <div className="card p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Questions? Talk to us</h3>
            <p className="text-sm text-muted mt-1">We respond within 24 hours.</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a className="px-5 py-2 rounded-full btn-ghost" href="mailto:support@vestify.one">support@vestify.one</a>
            <a className="px-5 py-2 rounded-full btn-ghost" href="tel:+2348000000000">+234 800 000 0000</a>
          </div>
        </div>
      </section>
    </div>
  );
}
