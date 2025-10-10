export default function Testimonials() {
  const items = [
    { n: "Ada, Lagos", t: "I set my first savings goal in minutes and got a loan when I needed it." },
    { n: "Tunde, Abuja", t: "Simple and trustworthy. Group savings with my friends is seamless." },
    { n: "Hauwa, Kano", t: "Love the curated investments—steady returns without stress." },
  ];
  return (
    <section className="mt-[4rem] md:mt-[6rem]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((it, i) => (
          <div key={i} className="card p-4">
            <p className="text-sm">“{it.t}”</p>
            <div className="text-xs text-muted mt-2">{it.n}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
