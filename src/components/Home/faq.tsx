"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "How do I start saving with Vestify One?",
    answer:
      'Create an account, set your save plan (daily/weekly/monthly), and connect your card or bank via Paystack/Flutterwave. We auto‑debit and you can pause anytime in Settings.',
  },
  {
    question: "What is the loan limit and how fast is disbursement?",
    answer:
      "You can access instant collateralized loans up to 80% of your savings. Disbursement is near‑instant after eligibility checks. Repay flexibly from future saves.",
  },
  {
    question: "Are my funds and data secure?",
    answer:
      "Yes. We use bank‑grade encryption, device binding, and PCI‑DSS compliant processors. 2FA and biometrics are supported on compatible devices.",
  },
  {
    question: "How do Ajo/Esusu circles work?",
    answer:
      "Create or join a circle, set contribution amount and schedule, invite members, and payouts rotate automatically. Smart reminders help everyone stay consistent.",
  },
  {
    question: "What fees should I expect?",
    answer:
      "No hidden charges. We earn via small transaction fees, investment commissions, and interest on loans. All fees are shown clearly before you proceed.",
  },
  {
    question: "Is Vestify One available on mobile?",
    answer:
      "Yes — it's mobile‑first and installable as a PWA. A native experience is coming soon.",
  },
];

const FAQ = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <div className="w-full mt-[4rem] md:mt-[6rem]" id="faq">
      {/* Header */}
      <div className="w-[97%] mx-auto md:mx-0 md:w-[68%]">
        <h2 className="text-3xl md:text-4xl xl:text-5xl text-center md:text-left pt-4">
          <span className="text-[var(--accent)]">Frequently</span> Asked Questions
        </h2>
        <p className="text-base pt-3.5 text-muted text-center md:text-left">
          Still have questions? Email us at
          <a
            href="mailto:support@vestify.one"
            className="text-[var(--primary)] hover:underline ml-1"
          >
            support@vestify.one
          </a>
        </p>
      </div>

      {/* FAQ List */}
      <div className="relative mt-[2rem] md:mt-[3.5rem] w-full mb-[2rem]">
        <div className="flex flex-wrap justify-between">
          {visibleFaqs.map((faq, index) => (
            <div
              key={index}
              className="w-[97%] mx-auto md:w-[49%] 2xl:w-[48%] mt-[4.5%] md:mt-[2%] bg-[var(--card)] rounded-[1rem] px-6 py-9 md:px-11 md:py-14 border border-base"
            >
              <h3 className="text-xl">{faq.question}</h3>
              <div className="my-5 h-px bg-[var(--border)]" />
              <p className="text-base text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
        {/* Fade-out effect at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </div>

      {/* Load More Button */}
      {!showAll && (
        <div className="w-full flex items-center justify-center mt-5">
          <button
            onClick={() => setShowAll(true)}
            className="px-7 py-3 rounded-full btn-ghost text-base"
          >
            Load All FAQs ↓
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQ;
