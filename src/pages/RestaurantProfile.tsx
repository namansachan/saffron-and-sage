import { Star, MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { restaurantInfo } from '../data/menu';
import SectionTitle from '../components/SectionTitle';

export default function RestaurantProfile() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header card */}
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={restaurantInfo.heroImage}
          alt={restaurantInfo.name}
          className="h-64 w-full object-cover sm:h-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-brand-300 text-sm font-medium">{restaurantInfo.tagline}</p>
              <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-white">
                {restaurantInfo.name}
              </h1>
              <div className="mt-2 flex flex-wrap gap-2">
                {restaurantInfo.cuisines.map((c) => (
                  <span key={c} className="chip bg-white/10 text-white ring-1 ring-white/20 backdrop-blur">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-stone-900 shadow-lg">
              <Star size={16} className="fill-amber-500 text-amber-500" />
              <span className="font-bold">{restaurantInfo.rating}</span>
              <span className="text-sm text-stone-500">
                ({restaurantInfo.reviewsCount.toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* About */}
        <div className="lg:col-span-2 card p-6 sm:p-8">
          <SectionTitle
            center={false}
            eyebrow="Our story"
            title="Where tradition meets modern craft"
          />
          <p className="mt-4 text-stone-600 dark:text-stone-400 leading-relaxed">
            {restaurantInfo.description}
          </p>
          <p className="mt-3 text-stone-600 dark:text-stone-400 leading-relaxed">
            From our open kitchen to your table, every plate is prepared with care.
            Our seasonal menus celebrate the best of local produce, global techniques,
            and the timeless joy of sharing a great meal.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Established', value: '2014' },
              { label: 'Seating', value: '120 guests' },
              { label: 'Chef', value: 'Aarav Mehta' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-stone-100 dark:bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-stone-500">{s.label}</p>
                <p className="mt-1 font-serif text-lg font-semibold">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info card */}
        <div className="card p-6 sm:p-8 h-fit">
          <h3 className="font-serif text-xl font-semibold">Visit us</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-500" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-stone-600 dark:text-stone-400">{restaurantInfo.address}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-brand-500" />
              <div>
                <p className="font-medium">Phone</p>
                <a href={`tel:${restaurantInfo.phone}`} className="text-stone-600 dark:text-stone-400 hover:text-brand-500">
                  {restaurantInfo.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-brand-500" />
              <div>
                <p className="font-medium">Email</p>
                <a href={`mailto:${restaurantInfo.email}`} className="text-stone-600 dark:text-stone-400 hover:text-brand-500">
                  {restaurantInfo.email}
                </a>
              </div>
            </li>
          </ul>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-6 w-full"
          >
            <Navigation size={16} /> Get Directions
          </a>
        </div>
      </div>

      {/* Hours */}
      <div className="mt-6 card p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-brand-500" />
          <h3 className="font-serif text-xl font-semibold">Opening hours</h3>
        </div>
        <div className="mt-5 divide-y divide-stone-200/70 dark:divide-white/10">
          {restaurantInfo.hours.map((h) => (
            <div key={h.day} className="flex items-center justify-between py-3">
              <span className="font-medium">{h.day}</span>
              <span className="text-stone-600 dark:text-stone-400">{h.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
