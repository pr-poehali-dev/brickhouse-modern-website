import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"

const destinations = [
  {
    name: "Золотое кольцо",
    country: "Россия",
    image: "/santorini-sunset.png",
    description: "Древние монастыри, белокаменные соборы и живописные русские просторы",
    price: "от 4 900 ₽",
  },
  {
    name: "Бали",
    country: "Индонезия",
    image: "/bali-indonesia-rice-terraces-tropical-paradise.jpg",
    description: "Экзотические рисовые террасы, храмы и океанское побережье",
    price: "от 49 900 ₽",
  },
  {
    name: "Киото",
    country: "Япония",
    image: "/kyoto-japan-traditional-temples-cherry-blossoms.jpg",
    description: "Тысячелетние традиции, храмы и сакура — погружение в японскую культуру",
    price: "от 69 900 ₽",
  },
  {
    name: "Мальдивы",
    country: "Индийский океан",
    image: "/maldives-overwater-bungalows-crystal-clear-water.jpg",
    description: "Бирюзовые лагуны, коралловые рифы и виллы над водой",
    price: "от 89 900 ₽",
  },
  {
    name: "Исландия",
    country: "Северная Европа",
    image: "/iceland-northern-lights-waterfalls-dramatic-landsc.jpg",
    description: "Северное сияние, гейзеры и вулканические пейзажи — природа на краю земли",
    price: "от 79 900 ₽",
  },
  {
    name: "Дубай",
    country: "ОАЭ",
    image: "/dubai-modern-skyline-luxury-desert.jpg",
    description: "Небоскрёбы, пустынные сафари и роскошь современного мегаполиса",
    price: "от 59 900 ₽",
  },
]

export function FeaturedDestinations() {
  return (
    <section id="destinations" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">
            Популярные <span className="font-semibold">направления</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Тщательно отобранные маршруты с профессиональными гидами и яркими впечатлениями
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 bg-card hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium">{destination.country}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{destination.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{destination.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-primary">{destination.price}</span>
                  <Button variant="ghost" size="sm" className="group/btn text-foreground hover:text-primary">
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="rounded-full px-8 border-2 bg-transparent">
            Все направления
          </Button>
        </div>
      </div>
    </section>
  )
}