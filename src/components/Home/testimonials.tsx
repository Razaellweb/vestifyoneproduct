export default function Testimonials() {
  const items = [
    { name: "Dami, Lagos", text: "I set up autodebits in 2 minutes. Loan came in instantly when I needed it." },
    { name: "Uche, Abuja", text: "Ajo with my friends is finally stressfree and transparent." },
    { name: "Bisi, Ibadan", text: "I love the clean design and how fast deposits are." },
  ];
  return (
    <div className="mt-[4rem] md:mt-[6rem]">
      <h2 className="text-2xl md:text-3xl">What Nigerians are saying</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((t) => (
          <blockquote key={t.name} className="card p-5">
            <p>“{t.text}”</p>
            <footer className="text-sm text-muted mt-2">{t.name}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
