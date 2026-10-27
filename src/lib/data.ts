export type ProblemId = "pain" | "hygiene" | "esthetic" | "child" | "implant" | "align";

export const PROBLEMS: { id: ProblemId; label: string; hint: string }[] = [
  { id: "pain", label: "Болит зуб", hint: "Острая боль, чувствительность, выпавшая пломба" },
  { id: "hygiene", label: "Профилактика", hint: "Осмотр, чистка и снимок раз в полгода" },
  { id: "esthetic", label: "Эстетика", hint: "Виниры, коронки, отбеливание" },
  { id: "child", label: "Ребёнок", hint: "Детский приём с двух лет" },
  { id: "implant", label: "Импланты", hint: "Имплантация и удаление" },
  { id: "align", label: "Выравнивание", hint: "Брекеты и элайнеры" },
];

export type Weekday = 1 | 2 | 3 | 4 | 5 | 6;

export type Doctor = {
  id: string;
  initials: string;
  name: string;
  short: string;
  role: string;
  years: number;
  about: string;
  problems: ProblemId[];
  grid: Partial<Record<Weekday, [number, number][]>>;
};

export const DOCTORS: Doctor[] = [
  {
    id: "belova",
    initials: "АБ",
    name: "Анна Белова",
    short: "Белова А. С.",
    role: "Главный врач, стоматолог-терапевт",
    years: 14,
    about: "Лечит кариес и каналы под микроскопом, ведёт профилактические осмотры. Первой смотрит каждого нового пациента и составляет план лечения.",
    problems: ["pain", "hygiene"],
    grid: { 1: [[9, 15]], 2: [[9, 15]], 3: [[14, 21]], 4: [[9, 15]], 5: [[9, 15]] },
  },
  {
    id: "korneeva",
    initials: "ДК",
    name: "Дарья Корнеева",
    short: "Корнеева Д. И.",
    role: "Стоматолог-ортопед",
    years: 12,
    about: "Коронки, виниры и отбеливание. Подбирает цвет и форму по фотопротоколу и показывает будущий результат на модели до начала работы.",
    problems: ["esthetic"],
    grid: { 1: [[15, 21]], 3: [[9, 15]], 4: [[15, 21]], 6: [[9, 15]] },
  },
  {
    id: "lebedev",
    initials: "МЛ",
    name: "Михаил Лебедев",
    short: "Лебедев М. А.",
    role: "Хирург-имплантолог",
    years: 11,
    about: "Имплантация по этапам, удаление зубов мудрости, костная пластика. Каждую операцию планирует по компьютерной томограмме.",
    problems: ["implant"],
    grid: { 2: [[10, 19]], 4: [[10, 19]], 6: [[10, 16]] },
  },
  {
    id: "samoilova",
    initials: "ОС",
    name: "Ольга Самойлова",
    short: "Самойлова О. В.",
    role: "Детский стоматолог, ортодонт",
    years: 9,
    about: "Принимает детей с двух лет, ставит брекеты и ведёт лечение элайнерами у подростков и взрослых.",
    problems: ["child", "align"],
    grid: { 1: [[9, 14]], 2: [[15, 21]], 3: [[15, 21]], 5: [[9, 14]], 6: [[10, 15]] },
  },
];

export function doctorFor(problem: ProblemId): Doctor {
  return DOCTORS.find((d) => d.problems.includes(problem)) ?? DOCTORS[0];
}

export function rub(value: number, from = false): string {
  const digits = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${from ? "от " : ""}${digits} ₽`;
}

export type PriceItem = { name: string; price: string };
export type PriceGroup = { id: string; name: string; items: PriceItem[] };

export const PRICE_GROUPS: PriceGroup[] = [
  {
    id: "consult",
    name: "Консультация и снимок",
    items: [
      { name: "Консультация и осмотр", price: rub(1500) },
      { name: "Прицельный снимок", price: rub(600) },
      { name: "Панорамный снимок", price: rub(1800) },
      { name: "Компьютерная томограмма обеих челюстей", price: rub(3900) },
      { name: "План лечения с фиксированной ценой", price: "входит в консультацию" },
    ],
  },
  {
    id: "hygiene",
    name: "Гигиена",
    items: [
      { name: "Профессиональная гигиена: ультразвук, Air Flow, полировка", price: rub(6500, true) },
      { name: "Гигиена детям", price: rub(3500, true) },
      { name: "Фторирование", price: rub(2000) },
    ],
  },
  {
    id: "treatment",
    name: "Лечение",
    items: [
      { name: "Лечение кариеса, световая пломба", price: rub(5500, true) },
      { name: "Глубокий кариес, реставрация зуба", price: rub(8500, true) },
      { name: "Лечение каналов, один канал", price: rub(9000, true) },
      { name: "Лечение каналов, три канала", price: rub(18000, true) },
      { name: "Перелечивание каналов", price: rub(14000, true) },
    ],
  },
  {
    id: "crowns",
    name: "Коронки и виниры",
    items: [
      { name: "Коронка керамическая", price: rub(32000, true) },
      { name: "Коронка из диоксида циркония", price: rub(36000, true) },
      { name: "Временная коронка", price: rub(4000) },
      { name: "Винир керамический", price: rub(38000, true) },
      { name: "Винир композитный", price: rub(15000, true) },
    ],
  },
  {
    id: "implants",
    name: "Имплантация по этапам",
    items: [
      { name: "Установка импланта", price: rub(48000, true) },
      { name: "Формирователь десны", price: rub(7000) },
      { name: "Коронка на импланте", price: rub(42000, true) },
      { name: "Синус-лифтинг", price: rub(35000, true) },
    ],
  },
  {
    id: "whitening",
    name: "Отбеливание",
    items: [
      { name: "Кабинетное отбеливание", price: rub(18000, true) },
      { name: "Домашнее отбеливание с каппами", price: rub(12000, true) },
    ],
  },
  {
    id: "kids",
    name: "Детям",
    items: [
      { name: "Консультация детского стоматолога", price: rub(1200) },
      { name: "Лечение кариеса молочного зуба", price: rub(4500, true) },
      { name: "Герметизация фиссур, один зуб", price: rub(2500) },
      { name: "Удаление молочного зуба", price: rub(2500, true) },
    ],
  },
  {
    id: "ortho",
    name: "Брекеты и элайнеры",
    items: [
      { name: "Брекеты металлические, одна челюсть", price: rub(65000, true) },
      { name: "Брекеты керамические, одна челюсть", price: rub(90000, true) },
      { name: "Элайнеры, полный курс", price: rub(190000, true) },
      { name: "Ретейнер после лечения", price: rub(8000, true) },
    ],
  },
  {
    id: "surgery",
    name: "Удаление",
    items: [
      { name: "Простое удаление", price: rub(4500, true) },
      { name: "Сложное удаление", price: rub(8500, true) },
      { name: "Удаление зуба мудрости", price: rub(12000, true) },
    ],
  },
  {
    id: "gums",
    name: "Лечение дёсен",
    items: [
      { name: "Лечение гингивита", price: rub(5000, true) },
      { name: "Закрытый кюретаж, один зуб", price: rub(2500, true) },
      { name: "Плазмолифтинг дёсен", price: rub(6500, true) },
    ],
  },
];

export type VisitStep = { time: string; title: string; rows: { what: string; minutes: string }[] };

export const VISIT: VisitStep[] = [
  {
    time: "9:00",
    title: "Приходите к назначенному времени",
    rows: [
      { what: "Администратор встречает, вы заполняете короткую анкету", minutes: "5 мин" },
      { what: "Если болит, сразу обезболиваем", minutes: "по ситуации" },
    ],
  },
  {
    time: "9:05",
    title: "Осмотр и снимок",
    rows: [
      { what: "Врач осматривает зубы и дёсны", minutes: "10 мин" },
      { what: "Прицельный или панорамный снимок", minutes: "10 мин" },
    ],
  },
  {
    time: "9:25",
    title: "Разговор о вариантах",
    rows: [
      { what: "Показываем снимок на экране и объясняем, что видим", minutes: "10 мин" },
      { what: "Обсуждаем варианты, сроки и порядок этапов", minutes: "10 мин" },
    ],
  },
  {
    time: "9:45",
    title: "План и цена",
    rows: [
      { what: "Врач записывает план лечения", minutes: "10 мин" },
      { what: "Администратор считает стоимость и рассрочку", minutes: "5 мин" },
    ],
  },
];

export type MenuGroup = { name: string; items: { name: string; value: string; text: string }[] };

export const PAINLESS: MenuGroup[] = [
  {
    name: "До укола",
    items: [
      { name: "Аппликационный гель", value: "всегда", text: "Десну обезболивают гелем, и сам укол не чувствуется." },
      { name: "Компьютерная анестезия", value: "всегда", text: "Анестетик подаёт прибор: медленно, тонкой иглой, под контролем давления, поэтому нет ощущения распирания." },
    ],
  },
  {
    name: "Во время лечения",
    items: [
      { name: "Пауза по знаку", value: "всегда", text: "Подняли руку, и врач останавливается. Пауза длится столько, сколько вам нужно." },
      { name: "Седация", value: "по показаниям", text: "Лёгкий медикаментозный сон для долгих вмешательств и при сильном страхе. Решает анестезиолог." },
      { name: "Коффердам", value: "при лечении каналов", text: "Латексная завеса изолирует зуб: ни вкуса, ни воды во рту." },
    ],
  },
  {
    name: "Детям",
    items: [
      { name: "Знакомство без лечения", value: "первый визит", text: "Ребёнок сидит в кресле, трогает инструменты и считает зубы в зеркале. Лечим только когда готов." },
      { name: "Лечение в один приём", value: "по возможности", text: "Небольшой кариес лечим за один короткий визит, чтобы не тянуть." },
    ],
  },
  {
    name: "После",
    items: [
      { name: "Рекомендации в мессенджер", value: "всегда", text: "Что можно есть, когда пройдёт онемение и что делать, если что-то беспокоит." },
      { name: "Контрольный визит", value: "входит в план", text: "Через неделю врач проверяет, как заживает, и отвечает на вопросы." },
    ],
  },
];

export const FAQ: { q: string; a: string }[] = [
  { q: "Цена правда не изменится?", a: "В плане лечения записаны все этапы и стоимость каждого. Если в процессе обнаруживается что-то новое, врач останавливается и обсуждает с вами отдельный план; без вашего согласия ничего не добавляется." },
  { q: "Как работает рассрочка?", a: "Сумму из плана делим на равные ежемесячные части на срок до двенадцати месяцев, переплаты нет. Оформляем в клинике за десять минут, нужен только паспорт." },
  { q: "С какого возраста принимаете детей?", a: "С двух лет. Первый визит ребёнка проходит как знакомство: без лечения, если он к нему не готов." },
  { q: "Можно прийти с ребёнком на один приём?", a: "Да. Запишите двоих подряд: взрослого и ребёнка примут в соседних кабинетах, и вам не придётся ждать." },
  { q: "Снимок безопасен?", a: "Цифровой снимок даёт очень малую дозу, сравнимую с несколькими часами полёта на самолёте. Беременным снимки делаем только по необходимости и с защитным фартуком." },
  { q: "Что делать, если болит прямо сейчас?", a: "Позвоните. Для острой боли в расписании каждого дня оставлены окна, и мы примем вас в тот же день." },
  { q: "Сколько длится первый визит?", a: "Около часа: осмотр, снимок, разговор о вариантах и план лечения с ценой." },
  { q: "Нужно ли что-то брать с собой?", a: "Паспорт и, если есть, прошлые снимки. Всё остальное есть в клинике." },
  { q: "Можно ли лечиться без укола?", a: "Небольшой кариес иногда лечат без анестезии, это решает врач вместе с вами. Если сомневаетесь, обезболим." },
  { q: "Как отменить или перенести запись?", a: "Позвоните или напишите в мессенджер не позже чем за сутки, и администратор предложит другое время." },
  { q: "Работаете ли по полису ДМС?", a: "Да, с несколькими страховыми компаниями. Назовите свою по телефону, и администратор проверит условия." },
];

export type Credit = { file: string; title: string; author: string; license: string; licenseUrl: string; page: string; alt: string };

export const CREDITS: Credit[] = [
  { file: "mirror-tooth.jpg", title: "A tooth", author: "Dr. Partha Sarathi Sahana", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", page: "https://commons.wikimedia.org/w/index.php?curid=74844342", alt: "Стоматологическое зеркало и зонд на белом столе, в зеркале отражается удалённый зуб" },
  { file: "xray.jpg", title: "Pano-GH21101912", author: "Fastsmiles", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", page: "https://commons.wikimedia.org/wiki/File:Pano-GH21101912.jpg", alt: "Панорамный рентгеновский снимок обеих челюстей" },
  { file: "instruments.jpg", title: "Beladungsmuster für Sterilisation Zahnarztinstrumente 01", author: "Bin im Garten", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/wiki/File:Beladungsmuster_f%C3%BCr_Sterilisation_Zahnarztinstrumente_01.JPG", alt: "Лоток со стоматологическими зеркалами и зондами на голубой салфетке перед стерилизацией" },
  { file: "model.jpg", title: "Dental model demonstrating oral anatomy", author: "Shixart1985", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", page: "https://commons.wikimedia.org/wiki/File:Dental_model_demonstrating_oral_anatomy_with_detailed_teeth_and_gum_structure_in_clear_display.jpg", alt: "Гипсовая модель челюстей с восковой постановкой зубов на белом столе" },
  { file: "implants.jpg", title: "Root analogue ceramic dental implant vs titanium screw type implant", author: "Logicwhatelse", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", page: "https://commons.wikimedia.org/wiki/File:Root_analogue_ceramic_dental_implant_vs_titanium_screw_type_implant.jpg", alt: "Керамический имплант в форме корня и титановый винтовой имплант на бирюзовой ткани" },
  { file: "sky.jpg", title: "Blue sky with wisps of cloud on a clear summer morning", author: "Tom Axford 1", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", page: "https://commons.wikimedia.org/wiki/File:Blue_sky_with_wisps_of_cloud_on_a_clear_summer_morning.jpg", alt: "Ясное синее небо с лёгкими перистыми облаками" },
];

export function credit(file: string): Credit {
  return CREDITS.find((c) => c.file === file) ?? CREDITS[0];
}
