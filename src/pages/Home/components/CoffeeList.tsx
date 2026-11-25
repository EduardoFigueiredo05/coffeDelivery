import { coffees } from '@/data/coffees'
import { CoffeeCard } from './CoffeeCard'

export function CoffeeList() {
  return (
    <section
      className="mx-auto max-w-[1120px] px-5 pt-8 pb-24 md:pb-40 xl:px-0"
      aria-labelledby="coffee-list-title"
    >
      <h2 id="coffee-list-title" className="font-title text-[2rem] font-extrabold text-base-subtitle">
        Nossos cafés
      </h2>

      <div className="mt-[54px] grid grid-cols-1 gap-x-8 gap-y-10 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1160px]:grid-cols-4">
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </section>
  )
}
