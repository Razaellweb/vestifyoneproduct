export default function FAQ() {
  const faqs = [
    { q: "Is Vestify One secure?", a: "Yes. We use bank‑grade encryption and comply with CBN guidance." },
    { q: "How fast are loans?", a: "Instant approval up to 80% of your savings, credited within minutes." },
    { q: "What investments are available?", a: "Curated low‑risk options like T‑Bills and money market notes." },
    { q: "Can I do group savings?", a: "Yes. Create or join Ajo/Esusu circles with flexible schedules." },
  ];
  return (
    <section className="mt-[4rem] md:mt-[6rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-xl border p-4">
            <div className="text-sm font-medium">{f.q}</div>
            <div className="text-sm text-muted mt-1">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
