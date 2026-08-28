/**
 * Line icon set.
 *
 * One consistent drawing style throughout: 24px grid, 1.6 stroke, round caps
 * and joins, no fills. Everything inherits `currentColor` so a single icon
 * works on persimmon, on ink, and on paper without variants.
 *
 * Distinct from BrandIcons, which are the YWCA-supplied solid marks used as
 * large watermarks. These are the working icons that sit next to labels.
 */

type Props = { className?: string; strokeWidth?: number };

const S = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({
  className,
  strokeWidth = 1.6,
  children,
}: Props & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "size-6"}
      aria-hidden="true"
      strokeWidth={strokeWidth}
      {...S}
    >
      {children}
    </svg>
  );
}

export const PhoneLine = (p: Props) => (
  <Svg {...p}>
    <path d="M6.2 3.5h2.9l1.4 3.8-1.9 1.4a11.6 11.6 0 0 0 6.3 6.3l1.4-1.9 3.8 1.4v2.9a1.9 1.9 0 0 1-2.1 1.9A16.5 16.5 0 0 1 4.3 5.6a1.9 1.9 0 0 1 1.9-2.1Z" />
  </Svg>
);

export const ChatLine = (p: Props) => (
  <Svg {...p}>
    <path d="M20 12.5a7.5 7.5 0 0 1-7.5 7.5c-1 0-2-.2-2.9-.6L4 21l1.6-4.4A7.5 7.5 0 1 1 20 12.5Z" />
  </Svg>
);

export const ShieldLine = (p: Props) => (
  <Svg {...p}>
    <path d="M12 3 5 6v5.5c0 4.3 2.9 7.6 7 9.5 4.1-1.9 7-5.2 7-9.5V6l-7-3Z" />
    <path d="m9.2 12.2 2 2 3.6-3.9" />
  </Svg>
);

export const HomeLine = (p: Props) => (
  <Svg {...p}>
    <path d="M4 10.4 12 4l8 6.4V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8.6Z" />
    <path d="M9.7 20.5v-6h4.6v6" />
  </Svg>
);

export const ScalesLine = (p: Props) => (
  <Svg {...p}>
    <path d="M12 4v16M7 20h10M4 8h16M8.2 7.4 5 13.6h6.2L8.2 7.4ZM15.8 7.4 12.6 13.6h6.2l-3-6.2Z" />
    <path d="M5 13.6a3.1 3.1 0 0 0 6.2 0M12.6 13.6a3.1 3.1 0 0 0 6.2 0" />
  </Svg>
);

export const UsersLine = (p: Props) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M17.5 14.6a5.5 5.5 0 0 1 3 4.9" />
  </Svg>
);

export const HeartHandsLine = (p: Props) => (
  <Svg {...p}>
    <path d="M12 20.5S4.5 16 4.5 10.6A3.6 3.6 0 0 1 12 8.4a3.6 3.6 0 0 1 7.5 2.2c0 5.4-7.5 9.9-7.5 9.9Z" />
  </Svg>
);

export const CalendarLine = (p: Props) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" />
    <path d="M3.5 9.6h17M8.4 3.5v3M15.6 3.5v3" />
  </Svg>
);

export const ClockLine = (p: Props) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.3l3.4 2" />
  </Svg>
);

export const MapPinLine = (p: Props) => (
  <Svg {...p}>
    <path d="M12 21s7-5.4 7-10.5a7 7 0 1 0-14 0C5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.3" r="2.6" />
  </Svg>
);

export const BookLine = (p: Props) => (
  <Svg {...p}>
    <path d="M4 5.2A1.7 1.7 0 0 1 5.7 3.5H11a2.5 2.5 0 0 1 2.5 2.5v14A2 2 0 0 0 11.5 18H5.7A1.7 1.7 0 0 1 4 16.3V5.2Z" />
    <path d="M20 5.2a1.7 1.7 0 0 0-1.7-1.7H13a2.5 2.5 0 0 0-2.5 2.5v14A2 2 0 0 1 12.5 18h5.8a1.7 1.7 0 0 0 1.7-1.7V5.2Z" />
  </Svg>
);

export const AlertLine = (p: Props) => (
  <Svg {...p}>
    <path d="M12 4.4 2.9 19.6h18.2L12 4.4Z" />
    <path d="M12 10v4M12 17.2h.01" />
  </Svg>
);

export const LockLine = (p: Props) => (
  <Svg {...p}>
    <rect x="4.5" y="10.2" width="15" height="10.3" rx="2.2" />
    <path d="M8 10.2V7.6a4 4 0 0 1 8 0v2.6" />
  </Svg>
);

export const MailLine = (p: Props) => (
  <Svg {...p}>
    <rect x="3" y="5.2" width="18" height="13.6" rx="2.2" />
    <path d="m3.8 6.6 8.2 6 8.2-6" />
  </Svg>
);

export const KeyLine = (p: Props) => (
  <Svg {...p}>
    <circle cx="8" cy="12" r="4" />
    <path d="M12 12h9M18 12v3.4M15.4 12v2.4" />
  </Svg>
);

export const HandshakeLine = (p: Props) => (
  <Svg {...p}>
    <path d="M8.5 12.8 11 15.3a1.8 1.8 0 0 0 2.5 0l4.6-4.6" />
    <path d="M3 9.5 6.5 6h4L13 8.5 10.6 11a1.6 1.6 0 0 1-2.3 0L7 9.7" />
    <path d="M13 8.5h4.5L21 12M3 9.5v4l3 3M21 12v3l-2.9 2.9" />
  </Svg>
);

export const GiftLine = (p: Props) => (
  <Svg {...p}>
    <rect x="3.5" y="9" width="17" height="11.5" rx="1.8" />
    <path d="M2.8 9h18.4M12 9v11.5" />
    <path d="M12 9S10.6 4 8.3 4a2.2 2.2 0 0 0 0 5M12 9s1.4-5 3.7-5a2.2 2.2 0 0 1 0 5" />
  </Svg>
);

export const SparkLine = (p: Props) => (
  <Svg {...p}>
    <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.4 10.1 12.8 4.5 10.9 10.1 9 12 3.5Z" />
  </Svg>
);

export const EarLine = (p: Props) => (
  <Svg {...p}>
    <path d="M8 9.2a4 4 0 0 1 8 0c0 2.6-2.6 3.5-2.6 5.6a2.1 2.1 0 0 1-4.2 0" />
    <path d="M11.2 9.4a1.1 1.1 0 0 1 2.1.4M9 18.5c0 1.2.9 2 2 2" />
  </Svg>
);

export const RouteLine = (p: Props) => (
  <Svg {...p}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M8.5 6h5A3.5 3.5 0 0 1 17 9.5v0a3.5 3.5 0 0 1-3.5 3.5h-3A3.5 3.5 0 0 0 7 16.5v0A1.5 1.5 0 0 0 8.5 18h7" />
  </Svg>
);

export const DressLine = (p: Props) => (
  <svg
    viewBox="0 0 100 140"
    className={p.className ?? "size-6"}
    aria-hidden="true"
    strokeWidth={(p.strokeWidth ?? 1.6) * 4}
    {...S}
  >
    <path d="M30 10 L40 12 L50 24 L60 12 L70 10 L66 50 L92 132 L8 132 L34 50 Z" />
    <path d="M34 50 L66 50" />
  </svg>
);

export type LineIconName =
  | "phone" | "chat" | "shield" | "home" | "scales" | "users"
  | "heart" | "calendar" | "clock" | "pin" | "book" | "alert"
  | "lock" | "mail" | "key" | "handshake" | "gift" | "spark"
  | "ear" | "route" | "dress";

export const LINE_ICONS: Record<LineIconName, (p: Props) => React.ReactElement> = {
  phone: PhoneLine, chat: ChatLine, shield: ShieldLine, home: HomeLine,
  scales: ScalesLine, users: UsersLine, heart: HeartHandsLine,
  calendar: CalendarLine, clock: ClockLine, pin: MapPinLine, book: BookLine,
  alert: AlertLine, lock: LockLine, mail: MailLine, key: KeyLine,
  handshake: HandshakeLine, gift: GiftLine, spark: SparkLine, ear: EarLine,
  route: RouteLine, dress: DressLine,
};

export function LineIcon({
  name,
  className,
  strokeWidth,
}: {
  name?: LineIconName | null;
  className?: string;
  strokeWidth?: number;
}) {
  if (!name) return null;
  const Icon = LINE_ICONS[name];
  return Icon ? <Icon className={className} strokeWidth={strokeWidth} /> : null;
}
