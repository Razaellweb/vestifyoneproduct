import type { LucideIcon } from "lucide-react";
import { PiggyBank, CircleDollarSign, ShieldCheck, Users, Sparkles, Landmark } from "lucide-react";

const items: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: PiggyBank, title: "Automated savings", desc: "Set it and grow. Flexible goals with pause/edit anytime." },
  { icon: CircleDollarSign, title: "Instant loans", desc: "Up to 80% of your savings — no long forms." },
  { icon: ShieldCheck, title: "Bank‑grade security", desc: "BVN‑based KYC, encrypted data, transparent fees." },
  { icon: Users, title: "Ajo/Esusu groups", desc: "Invite friends, track contributions, smart reminders." },
  { icon: Landmark, title: "Seamless payments", desc: "Paystack & Flutterwave for fast funding and withdrawals." },
  { icon: Sparkles, title: "Curated investments", desc: "Low‑risk options vetted for stability and growth." },
];

export default function Features() {
  return (
    <div className="mt-[4rem] md:mt-[6rem]">
      <div className="w-[97%] mx-auto md:mx-0 md:w-[68%] left-0">
        <h2 className="text-3xl md:text-4xl 2xl:text-5xl text-center md:text-left">
          Everything you need to <span className="text-[var(--accent)]">grow</span>
        </h2>
        <p className="text-base pt-3 text-muted text-center md:text-left">
          Save, invest, borrow, and build together — all in one app.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <div className="card p-5 relative overflow-hidden" key={i}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-20 bg-[color-mix(in_oklab,var(--secondary)_50%,transparent)]" />
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] grid place-items-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mt-3">{it.title}</h3>
              <p className="text-sm text-muted mt-1">{it.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
