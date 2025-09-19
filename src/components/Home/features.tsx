import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import React from "react";

const Features = () => {
  return (
    <div className="w-full mt-[4rem] md:mt-[6rem]">
      <div className="w-[97%] mx-auto md:mx-0 md:w-[68%] left-0">
        <h2 className="text-3xl md:text-4xl xl:text-5xl text-center md:text-left pt-4">
          Powerful <span className="text-[var(--accent)]">features</span> built for Nigerians
        </h2>
        <p className="text-base pt-3.5 text-muted text-center md:text-left">
          Automate savings, access instant loans up to 80% of your savings, invest in curated low‑risk options, and run trusted Ajo/Esusu circles — all in one app.
        </p>
      </div>

      <div className="mt-[3.5rem] w-full flex items-start justify-between flex-wrap">
        <div className="w-[97%] mx-auto xl:mx-0 md:w-[23%] 2xl:w-[17.5%] bg-[var(--card)] border border-base rounded-[1rem] py-6 md:py-11 pl-6 md:pl-11 md:pr-11">
          <div className="flex gap-4 md:gap-0 overflow-x-auto md:overflow-x-hidden md:flex-col md:space-y-5">
            <div className="w-fit md:w-full whitespace-nowrap rounded-full py-3 px-5 bg-[var(--bg)]/40 text-base cursor-pointer text-[var(--primary)] border border-base">
              Automated Savings
            </div>

            <div className="w-fit md:w-full whitespace-nowrap rounded-full py-3 px-5 text-base cursor-pointer border border-base">
              Curated Investments
            </div>

            <div className="w-fit md:w-full whitespace-nowrap rounded-full py-3 px-5 text-base cursor-pointer border border-base">
              Loans & Ajo/Esusu
            </div>
          </div>
        </div>

        <div className="w-[97%] mx-auto md:mx-0 md:w-[75%] 2xl:w-[79%] mt-4 md:mt-0 flex items-center justify-between flex-wrap">
          <div className="w-[97%] mx-auto md:mx-0 md:w-[49%] 2xl:w-[48%] mt-6 md:mt-0 bg-[var(--card)] rounded-[1rem] px-8 py-11 md:px-11 md:py-14 border border-base">
            <h3 className="text-xl w-full flex items-center justify-between">
              Auto‑Save Goals
              <span className="text-[var(--accent)]">
                <ArrowUpRightIcon className="w-6 h-6" />
              </span>
            </h3>

            <p className="text-base pt-4 text-muted">
              Set daily, weekly, or monthly targets. We auto‑debit via Paystack/Flutterwave and grow your balance with competitive returns.
            </p>
          </div>

          <div className="w-[97%] mx-auto md:mx-0 md:w-[49%] 2xl:w-[48%] mt-6 md:mt-0 bg-[var(--card)] rounded-[1rem] px-8 py-11 md:px-11 md:py-14 border border-base">
            <h3 className="text-xl w-full flex items-center justify-between">
              Low‑Risk Investments
              <span className="text-[var(--accent)]">
                <ArrowUpRightIcon className="w-6 h-6" />
              </span>
            </h3>

            <p className="text-base pt-4 text-muted">
              Access a vetted marketplace of low‑risk opportunities curated for stability — earn, diversify, and withdraw when you need.
            </p>
          </div>

          <div className="w-[97%] mx-auto md:mx-0 md:w-[49%] 2xl:w-[48%] mt-6 bg-[var(--card)] rounded-[1rem] px-8 py-8 md:px-11 md:py-11 border border-base">
            <h3 className="text-xl w-full flex items-center justify-between">
              Instant Collateralized Loans
              <span className="text-[var(--accent)]">
                <ArrowUpRightIcon className="w-6 h-6" />
              </span>
            </h3>

            <p className="text-base pt-4 text-muted">
              Borrow up to 80% of your savings instantly. Transparent fees, no endless forms. Repay flexibly from your future saves.
            </p>
          </div>

          <div className="w-[97%] mx-auto md:mx-0 md:w-[49%] 2xl:w-[48%] mt-6 bg-[var(--card)] rounded-[1rem] px-8 py-11 md:px-11 md:py-14 border border-base">
            <h3 className="text-xl w-full flex items-center justify-between">
              Ajo/Esusu Circles
              <span className="text-[var(--accent)]">
                <ArrowUpRightIcon className="w-6 h-6" />
              </span>
            </h3>

            <p className="text-base pt-4 text-muted">
              Create or join trusted group savings with smart reminders and payout controls. Built for communities and accountability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
