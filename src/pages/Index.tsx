import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Процесс", href: "#process" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Цены", href: "#prices" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "Home",
    title: "Дома под ключ",
    desc: "Полный цикл: от фундамента до чистовой отделки. Сдаём готовый дом в срок по договору.",
  },
  {
    icon: "Layers",
    title: "Коробка дома",
    desc: "Фундамент, стены из кирпича, перекрытия, кровля. Внешний контур под дальнейшую отделку.",
  },
  {
    icon: "Ruler",
    title: "Проектирование",
    desc: "Архитектурный проект, конструктивные решения, согласование. Проекты любой сложности.",
  },
  {
    icon: "Wrench",
    title: "Фундамент",
    desc: "Ленточный, плитный, свайный фундамент. Геологическое исследование грунта.",
  },
  {
    icon: "Wind",
    title: "Кровельные работы",
    desc: "Монтаж стропильной системы, металлочерепица, мягкая кровля, утепление.",
  },
  {
    icon: "PaintBucket",
    title: "Отделочные работы",
    desc: "Внутренняя и внешняя отделка, фасадные работы, декоративная штукатурка.",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Консультация", desc: "Бесплатная встреча, обсуждение пожеланий, выбор проекта и участка." },
  { num: "02", title: "Проектирование", desc: "Архитектурный проект, чертежи, согласования. Срок — 2–4 недели." },
  { num: "03", title: "Договор", desc: "Фиксируем стоимость, сроки и ответственность. Без скрытых платежей." },
  { num: "04", title: "Строительство", desc: "Поэтапное строительство с фотоотчётом каждые 2 недели." },
  { num: "05", title: "Сдача дома", desc: "Приёмка объекта, передача документов, гарантия 10 лет." },
];

const PORTFOLIO = [
  {
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    title: "Дом в Подмосковье",
    area: "180 м²",
    year: "2025",
    style: "Современный",
  },
  {
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    title: "Загородный коттедж",
    area: "240 м²",
    year: "2025",
    style: "Классический",
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    title: "Семейный особняк",
    area: "320 м²",
    year: "2024",
    style: "Европейский",
  },
  {
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    title: "Дом у леса",
    area: "150 м²",
    year: "2024",
    style: "Скандинавский",
  },
  {
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80",
    title: "Двухэтажный дом",
    area: "210 м²",
    year: "2025",
    style: "Современный",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    title: "Тихий уголок",
    area: "165 м²",
    year: "2024",
    style: "Минималистичный",
  },
];

const PRICES = [
  {
    name: "Старт",
    subtitle: "Коробка дома",
    price: "от 35 000 ₽/м²",
    features: [
      "Фундамент ленточный",
      "Стены из кирпича М150",
      "Перекрытия монолитные",
      "Кровля металлочерепица",
      "Оконные блоки ПВХ",
    ],
    note: "Без внутренней отделки",
    highlight: false,
  },
  {
    name: "Комфорт",
    subtitle: "Под чистовую отделку",
    price: "от 55 000 ₽/м²",
    features: [
      "Всё из тарифа «Старт»",
      "Внутренние перегородки",
      "Черновая отделка стен",
      "Стяжка пола",
      "Разводка электрики и сантехники",
    ],
    note: "Готово к финишной отделке",
    highlight: true,
  },
  {
    name: "Премиум",
    subtitle: "Под ключ",
    price: "от 80 000 ₽/м²",
    features: [
      "Всё из тарифа «Комфорт»",
      "Чистовая отделка",
      "Кухня и сантехника",
      "Ландшафт участка",
      "Гарантия 10 лет",
    ],
    note: "Заезжайте и живите",
    highlight: false,
  },
];

const REVIEWS = [
  {
    name: "Андрей Миронов",
    city: "Краснодар",
    text: "Строили дом 180 м². Сдали на 2 недели раньше срока. Качество кирпичной кладки — идеальное. Буду рекомендовать всем знакомым.",
    rating: 5,
    year: "2025",
  },
  {
    name: "Елена Соколова",
    city: "Ростов-на-Дону",
    text: "Очень приятная компания. Всё объяснили, ни разу не обманули. Дом стоит второй год — никаких проблем. Зимой тепло, летом прохладно.",
    rating: 5,
    year: "2025",
  },
  {
    name: "Дмитрий Павлов",
    city: "Краснодарский край",
    text: "Брали тариф «Премиум». Въехали сразу после сдачи — ничего доделывать не пришлось. Цена полностью соответствует качеству.",
    rating: 5,
    year: "2024",
  },
];

const STATS = [
  { value: "287", label: "Домов построено" },
  { value: "14", label: "Лет на рынке" },
  { value: "10", label: "Лет гарантии" },
  { value: "96%", label: "Клиентов рекомендуют нас" },
];

// ─── Calculator ───────────────────────────────────────────────────────────────

function Calculator() {
  const [area, setArea] = useState(150);
  const [floors, setFloors] = useState(1);
  const [finish, setFinish] = useState<"start" | "comfort" | "premium">("comfort");

  const rates = { start: 35000, comfort: 55000, premium: 80000 };
  const floorCoeff = floors === 1 ? 1 : floors === 2 ? 0.95 : 0.9;
  const total = Math.round(area * rates[finish] * floorCoeff);
  const totalFormatted = total.toLocaleString("ru-RU");

  return (
    <div className="bg-white border border-[var(--border)] p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-[var(--text-main)]">Площадь дома</label>
              <span className="font-['Cormorant_Garamond'] text-2xl text-[var(--brick)]">{area} м²</span>
            </div>
            <input
              type="range"
              min={60}
              max={600}
              step={10}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
              <span>60 м²</span>
              <span>600 м²</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-main)] block mb-3">Этажность</label>
            <div className="flex gap-3">
              {[1, 2, 3].map((f) => (
                <button
                  key={f}
                  onClick={() => setFloors(f)}
                  className={`flex-1 py-3 text-sm font-medium border transition-all duration-200 ${
                    floors === f
                      ? "bg-[var(--brick)] text-white border-[var(--brick)]"
                      : "bg-white text-[var(--text-main)] border-[var(--border)] hover:border-[var(--brick)]"
                  }`}
                >
                  {f} {f === 1 ? "этаж" : "этажа"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-main)] block mb-3">Комплектация</label>
            <div className="space-y-2">
              {[
                { key: "start", label: "Коробка дома", price: "35 000 ₽/м²" },
                { key: "comfort", label: "Под чистовую отделку", price: "55 000 ₽/м²" },
                { key: "premium", label: "Под ключ", price: "80 000 ₽/м²" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFinish(item.key as typeof finish)}
                  className={`w-full flex justify-between items-center px-4 py-3 border text-sm transition-all duration-200 ${
                    finish === item.key
                      ? "bg-[var(--sand)] border-[var(--brick)] text-[var(--text-main)]"
                      : "bg-white border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--brick-light)]"
                  }`}
                >
                  <span className={finish === item.key ? "font-medium text-[var(--text-main)]" : ""}>{item.label}</span>
                  <span className={finish === item.key ? "text-[var(--brick)] font-medium" : ""}>{item.price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-[var(--stone)] p-8 text-white">
          <p className="section-label text-[var(--brick-light)] mb-6">Предварительная стоимость</p>
          <div className="font-['Cormorant_Garamond'] text-5xl font-light mb-2 leading-tight">
            {totalFormatted} ₽
          </div>
          <p className="text-white/50 text-sm mb-8">
            {area} м² · {floors} {floors === 1 ? "этаж" : "этажа"} ·{" "}
            {{ start: "Коробка", comfort: "Под отделку", premium: "Под ключ" }[finish]}
          </p>
          <p className="text-white/60 text-xs leading-relaxed mb-8">
            Расчёт предварительный. Точная стоимость определяется после осмотра участка и проектирования.
          </p>
          <button
            className="btn-brick w-full text-center"
            onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })}
          >
            Получить точный расчёт
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-[var(--sand-dark)] rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Check" size={28} className="text-[var(--brick)]" />
        </div>
        <h3 className="font-['Cormorant_Garamond'] text-3xl mb-3">Заявка отправлена</h3>
        <p className="text-[var(--text-muted)]">Мы свяжемся с вами в течение 2 часов</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          className="form-input"
          placeholder="Ваше имя"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
      <div>
        <input
          className="form-input"
          placeholder="Телефон"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
      </div>
      <div>
        <textarea
          className="form-input resize-none"
          placeholder="Расскажите о вашем проекте (необязательно)"
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      <button type="submit" className="btn-brick w-full" disabled={loading}>
        {loading ? "Отправляем..." : "Отправить заявку"}
      </button>
      <p className="text-xs text-[var(--text-muted)] text-center">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* ── NAV ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--brick)] flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Д</span>
            </div>
            <span
              className="text-xl font-medium tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: scrolled ? "var(--stone)" : "white" }}
            >
              ДомДзен
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{ color: scrolled ? "var(--text-main)" : "rgba(255,255,255,0.85)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+79057108890"
              className="text-sm font-medium transition-colors"
              style={{ color: scrolled ? "var(--brick)" : "white" }}
            >
              +7 905 710 88 90
            </a>
            <button className="btn-brick text-sm py-2 px-5" onClick={() => scrollTo("contacts")}>
              Рассчитать дом
            </button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: scrolled ? "var(--stone)" : "white" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu fixed top-0 right-0 bottom-0 w-72 bg-white z-50 p-8 shadow-2xl ${menuOpen ? "open" : ""}`}>
        <button className="absolute top-5 right-5 text-[var(--text-main)]" onClick={() => setMenuOpen(false)}>
          <Icon name="X" size={24} />
        </button>
        <div className="mt-12 space-y-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-2xl text-[var(--text-main)] hover:text-[var(--brick)] transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-10 pt-8 border-t border-[var(--border)]">
          <a href="tel:+79057108890" className="flex items-center gap-2 text-[var(--brick)] font-medium">
            <Icon name="Phone" size={16} />
            +7 905 710 88 90
          </a>
        </div>
      </div>
      {menuOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setMenuOpen(false)} />}

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=85')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--stone)]/90 via-[var(--stone)]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-xl">
            <p className="section-label text-[var(--brick-light)] mb-6 animate-fade-in opacity-0 delay-100">
              Строительство кирпичных домов
            </p>
            <h1
              className="text-5xl md:text-7xl font-light text-white leading-tight mb-8 animate-fade-up opacity-0 delay-200"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Дом, который
              <br />
              <em className="italic text-[var(--brick-light)]">простоит века</em>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 animate-fade-up opacity-0 delay-300">
              Строим кирпичные дома под ключ в Краснодарском крае. Фиксированная цена, чёткие сроки, 10 лет гарантии.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0 delay-400">
              <button className="btn-brick" onClick={() => scrollTo("calculator")}>Рассчитать стоимость</button>
              <button className="btn-outline" onClick={() => scrollTo("portfolio")}>Смотреть работы</button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-fade-in opacity-0 delay-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <Icon name="ChevronDown" size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[var(--stone)] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-light text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {s.value}
                </div>
                <div className="text-white/40 text-xs uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">О компании</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                14 лет строим<br /><em className="italic">настоящие дома</em>
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-5">
                ДомДзен — семейная строительная компания из Краснодарского края. Мы специализируемся
                исключительно на кирпичном строительстве, потому что верим: настоящий дом строится из кирпича.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                Наши мастера — профессионалы с опытом от 8 лет. Мы не нанимаем случайные бригады:
                каждый специалист прошёл отбор и работает с нами годами.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: "Shield", text: "Договор с фиксированной ценой" },
                  { icon: "Clock", text: "Сдаём в срок или платим неустойку" },
                  { icon: "Camera", text: "Фотоотчёт каждые 2 недели" },
                  { icon: "Award", text: "Гарантия 10 лет на конструктив" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[var(--sand)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon} fallback="CircleAlert" size={15} className="text-[var(--brick)]" />
                    </div>
                    <span className="text-sm text-[var(--text-muted)] leading-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1503594384566-461fe158e797?w=700&q=80"
                alt="Строительство"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[var(--brick)] p-6 text-white max-w-[180px]">
                <div className="text-4xl font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>287</div>
                <div className="text-xs text-white/70 uppercase tracking-wider">Домов построено</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-[var(--sand)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Что мы делаем</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Услуги компании
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white p-8 border border-[var(--border)] hover:border-[var(--brick)] hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 bg-[var(--sand)] flex items-center justify-center mb-5 group-hover:bg-[var(--brick)] transition-colors duration-300">
                  <Icon name={s.icon} fallback="CircleAlert" size={18} className="text-[var(--brick)] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-medium mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="md:sticky md:top-28">
              <p className="section-label mb-4">Как мы работаем</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Процесс<br /><em className="italic">строительства</em>
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                Каждый этап прозрачен. Вы знаете, что происходит на стройке в любой момент времени.
              </p>
              <button className="btn-brick" onClick={() => scrollTo("contacts")}>Начать проект</button>
            </div>

            <div className="space-y-0">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="flex gap-6 pb-10">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border border-[var(--brick)] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-[var(--brick)]">{step.num}</span>
                    </div>
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ background: "linear-gradient(to bottom, var(--brick), transparent)", minHeight: "50px" }} />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-medium mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-24 bg-[var(--sand)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Наши работы</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Портфолио</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO.map((p, i) => (
              <div key={i} className="portfolio-item relative cursor-pointer group">
                <img src={p.img} alt={p.title} className="w-full aspect-[4/3] object-cover" />
                <div className="portfolio-overlay absolute inset-0 flex flex-col justify-end p-5">
                  <div className="text-white">
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-1">{p.style}</p>
                    <h3 className="text-xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3>
                    <div className="flex gap-3 mt-1 text-sm text-white/70">
                      <span>{p.area}</span>
                      <span>·</span>
                      <span>{p.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICES ── */}
      <section id="prices" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Стоимость</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Прозрачные цены</h2>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto">
              Цены актуальны на 2026 год. Фиксируем стоимость в договоре — никаких доплат в процессе.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {PRICES.map((plan, i) => (
              <div
                key={i}
                className={`p-8 border transition-all duration-300 ${
                  plan.highlight
                    ? "bg-[var(--stone)] border-[var(--stone)] text-white shadow-xl md:scale-105"
                    : "bg-white border-[var(--border)] hover:border-[var(--brick)] hover:shadow-md"
                }`}
              >
                {plan.highlight && <div className="section-label text-[var(--brick-light)] mb-4">Популярный</div>}
                <div className={`text-xs uppercase tracking-wider mb-2 ${plan.highlight ? "text-white/50" : "text-[var(--text-muted)]"}`}>
                  {plan.subtitle}
                </div>
                <h3 className={`text-2xl font-medium mb-1 ${plan.highlight ? "text-white" : ""}`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {plan.name}
                </h3>
                <div className={`text-3xl font-light mb-6 ${plan.highlight ? "text-white" : "text-[var(--brick)]"}`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {plan.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm">
                      <Icon name="Check" size={14} className={plan.highlight ? "text-[var(--brick-light)]" : "text-[var(--brick)]"} />
                      <span className={plan.highlight ? "text-white/80" : "text-[var(--text-muted)]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className={`text-xs mb-6 ${plan.highlight ? "text-white/40" : "text-[var(--text-muted)]"}`}>{plan.note}</p>
                <button
                  onClick={() => scrollTo("contacts")}
                  className={plan.highlight
                    ? "btn-brick w-full text-center"
                    : "w-full py-3 border border-[var(--brick)] text-[var(--brick)] text-sm font-medium hover:bg-[var(--sand)] transition-colors"
                  }
                >
                  Выбрать
                </button>
              </div>
            ))}
          </div>

          <div id="calculator">
            <div className="text-center mb-8">
              <p className="section-label mb-2">Калькулятор</p>
              <h3 className="text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Рассчитайте свой дом</h3>
            </div>
            <Calculator />
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24 bg-[var(--stone)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label text-[var(--brick-light)] mb-4">Отзывы клиентов</p>
            <h2 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Что говорят люди
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, si) => (
                    <span key={si} className="text-[var(--brick-light)]">★</span>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{r.name}</div>
                    <div className="text-white/40 text-xs">{r.city}</div>
                  </div>
                  <div className="text-white/30 text-xs">{r.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="section-label mb-4">Свяжитесь с нами</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Начнём<br /><em className="italic">ваш проект?</em>
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-10">
                Оставьте заявку — мы перезвоним в течение 2 часов. Консультация и выезд на участок бесплатно.
              </p>

              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 905 710 88 90", href: "tel:+79057108890" },
                  { icon: "Mail", label: "Email", value: "domdzen@gmail.com", href: "mailto:domdzen@gmail.com" },
                ].map((c, i) => (
                  <a key={i} href={c.href} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-[var(--sand)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--brick)] transition-colors">
                      <Icon name={c.icon} fallback="CircleAlert" size={16} className="text-[var(--brick)] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">{c.label}</div>
                      <div className="font-medium text-[var(--text-main)] group-hover:text-[var(--brick)] transition-colors">{c.value}</div>
                    </div>
                  </a>
                ))}
                {[
                  { icon: "MapPin", label: "Регион", value: "Краснодарский край" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Сб: 9:00 – 19:00" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[var(--sand)] flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} fallback="CircleAlert" size={16} className="text-[var(--brick)]" />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">{c.label}</div>
                      <div className="font-medium text-[var(--text-main)]">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-[var(--sand)] p-8 md:p-10">
                <h3 className="text-2xl font-medium mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Оставить заявку
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[var(--stone)] py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[var(--brick)] flex items-center justify-center">
                <span className="text-white font-bold text-xs" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Д</span>
              </div>
              <span className="text-lg text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>ДомДзен</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="text-white/40 hover:text-white/80 text-xs transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="text-white/30 text-xs">© 2026 ДомДзен</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;