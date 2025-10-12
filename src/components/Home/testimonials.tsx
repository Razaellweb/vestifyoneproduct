export default function Testimonials() {
  const list = [
    { name: "Ada", text: "Vestify One helped me automate savings and get a quick loan when I needed it." },
    { name: "Bola", text: "The Ajo group feature keeps our circle organized and on time." },
    { name: "Femi", text: "Clean design, fast payments, no stress." },
  ];
  return (
    <div className="mt-[4rem] md:mt-[6rem]">
      <div className="w-[97%] mx-auto md:mx-0 md:w-[68%] left-0">
        <h2 className="text-3xl md:text-4xl 2xl:text-5xl text-center md:text-left">Loved by young Nigerians</h2>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.map((t, i) => (
          <article key={i} className="card p-5">
            <p className="text-sm">“{t.text}”</p>
            <p className="text-sm text-muted mt-3">— {t.name}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
