import { Globe, Shield, Headphones, Award } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "80+ маршрутов",
    description: "Экскурсии по России и за рубежом — от городских прогулок до экзотических путешествий",
  },
  {
    icon: Shield,
    title: "Безопасно и надёжно",
    description: "Все программы проверены, гиды сертифицированы, страхование включено в стоимость",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    description: "Наши менеджеры всегда на связи — до поездки, в пути и после возвращения",
  },
  {
    icon: Award,
    title: "Опытные гиды",
    description: "Профессиональные экскурсоводы со знанием истории, культуры и местных секретов",
  },
]

export function WhyChooseUs() {
  return (
    <section id="about" className="py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">
            Почему выбирают <span className="font-semibold">нас</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Мы превращаем каждую экскурсию в яркое событие — с заботой о каждом госте и вниманием к деталям
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-2">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}