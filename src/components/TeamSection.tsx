import { team } from "@/data/team";

export function TeamSection() {
  return (
    <section id="equipe" aria-labelledby="equipe-title" className="bg-card border-y border-border/60 scroll-mt-24">
      <div className="container py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase text-accent mb-4">Profissionais Essenza</p>
          <h2 id="equipe-title" className="font-serif text-4xl sm:text-5xl text-primary leading-tight">
            Conheça nossa equipe
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {team.map((person) => (
            <article key={person.name} className="min-w-0">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={person.photo}
                  alt={person.name}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="pt-5 border-b border-border pb-5">
                <p className="text-xs uppercase text-accent mb-2">{person.role}</p>
                <h3 className="font-serif text-2xl leading-tight text-primary break-words">{person.name}</h3>
                {person.specialties.length > 0 && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{person.specialties.join(" · ")}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}