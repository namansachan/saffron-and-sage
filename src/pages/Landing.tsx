import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight, Leaf, Award, ChefHat } from 'lucide-react';
import { restaurantInfo } from '../data/menu';
import SectionTitle from '../components/SectionTitle';

const highlights = [
  { icon: ChefHat, title: 'Chef-Crafted', desc: 'Seasonal menus by award-winning chefs.' },
  { icon: Leaf, title: 'Fresh Ingredients', desc: 'Locally sourced, organic produce daily.' },
  { icon: Award, title: 'Top Rated', desc: 'Rated 4.8/5 by 2,000+ happy guests.' },
  { icon: Clock, title: 'Open Late', desc: 'Kitchen open till midnight on weekends.' },
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={restaurantInfo.heroImage}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/60 to-stone-50 dark:to-stone-950" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl animate-fadeIn">
            <span className="chip bg-white/10 text-white ring-1 ring-white/20 backdrop-blur">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {restaurantInfo.rating} · {restaurantInfo.reviewsCount.toLocaleString()} reviews
            </span>
            <h1 className="mt-5 font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl text-balance">
              {restaurantInfo.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-brand-200">{restaurantInfo.tagline}</p>
            <p className="mt-5 max-w-xl text-base text-stone-200/90 text-balance">
              {restaurantInfo.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/menu" className="btn-primary group">
                View Menu
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/restaurant" className="btn-ghost text-white ring-white/30 bg-white/10 hover:bg-white/20">
                About Restaurant
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-200/90">
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {restaurantInfo.location}</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} /> Open now · Closes 11 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <SectionTitle
          eyebrow="Why dine with us"
          title="A taste of something extraordinary"
          subtitle="Every dish is a celebration of flavor, crafted with intention and served with warmth."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger">
          {highlights.map((h) => (
            <div key={h.title} className="card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                <h.icon size={22} />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold">{h.title}</h3>
              <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-16 sm:px-12 sm:py-20 text-center">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-black/10 blur-2xl" />
          <h2 className="relative font-serif text-3xl font-bold text-white sm:text-4xl text-balance">
            Ready to explore our menu?
          </h2>
          <p className="relative mt-3 text-brand-100 max-w-xl mx-auto">
            Browse dishes, build your order, and pay at the table — all from your phone.
          </p>
          <Link to="/menu" className="relative mt-7 inline-flex btn bg-white text-brand-700 hover:bg-brand-50">
            Start Ordering <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
