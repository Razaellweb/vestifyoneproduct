import { PiggyBank, Landmark, Wallet, Users } from "lucide-react";

export default function Features() {
  const items = [
    { icon: PiggyBank, title: "Automated savings", desc: "Set goals and auto‑debit from card or bank." },
    { icon: Landmark, title: "Curated investments", desc: "Low‑risk options vetted for stability." },
    { icon: Wallet, title: "Instant loans", desc: "Up to 80% of your savings, no long forms." },
    { icon: Users, title: "Ajo/Esusu", desc: "Trusted group savings with smart reminders." },
  ];
  return (
    <section className="mt-[4rem] md:mt-[6rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, title, desc }, i) => (
          <div key={i} className="relative overflow-hidden card p-5">
            <div className="absolute -top-6 -right-6 size-24 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 opacity-20 blur-2xl" />
            <div className="inline-flex items-center gap-2 text-sm"><Icon className="size-4 text-[var(--primary)]"/> {title}</div>
            <p className="text-sm text-muted mt-2">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
