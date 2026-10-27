const stroke = { fill: "none", stroke: "var(--ink)", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function ToothDrawing() {
  return (
    <svg viewBox="0 0 600 640" role="img" aria-label="Контур коренного зуба с двумя корнями">
      <path data-fill d="M175 250 C165 200 195 165 235 160 C265 157 285 175 300 190 C315 175 335 157 365 160 C405 165 435 200 425 250 C422 280 418 305 415 330 C425 400 420 490 385 555 C375 572 352 572 345 552 C335 500 325 445 318 405 C312 388 288 388 282 405 C275 445 265 500 255 552 C248 572 225 572 215 555 C180 490 175 400 185 330 C182 305 178 280 175 250 Z" fill="var(--sheet)" />
      <path data-fill d="M365 160 C405 165 435 200 425 250 C422 280 418 305 415 330 C425 400 420 490 385 555 C378 568 362 571 352 562 C372 500 384 430 378 345 C382 300 384 250 372 215 C366 195 360 180 350 170 Z" fill="var(--sky-deep)" />
      <path data-draw {...stroke} d="M175 250 C165 200 195 165 235 160 C265 157 285 175 300 190 C315 175 335 157 365 160 C405 165 435 200 425 250 C422 280 418 305 415 330 C425 400 420 490 385 555 C375 572 352 572 345 552 C335 500 325 445 318 405 C312 388 288 388 282 405 C275 445 265 500 255 552 C248 572 225 572 215 555 C180 490 175 400 185 330 C182 305 178 280 175 250 Z" />
      <path data-draw {...stroke} d="M232 215 C255 230 275 200 300 212 C325 224 345 200 368 215" />
      <path data-draw {...stroke} d="M190 335 C250 310 350 310 410 335" />
      <path data-draw {...stroke} strokeWidth={2.5} d="M248 196 C255 186 268 184 278 190" />
    </svg>
  );
}

function Implant({ x = 150, top = 172 }: { x?: number; top?: number }) {
  return (
    <g>
      <path d={`M${x - 22} ${top} L${x + 22} ${top} L${x + 12} ${top + 100} Q${x} ${top + 118} ${x - 12} ${top + 100} Z`} fill="var(--sheet)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = top + 14 + i * 12;
        const w = 20 - i * 1.6;
        return <line key={i} x1={x - w} y1={y} x2={x + w} y2={y + 4} stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" />;
      })}
    </g>
  );
}

function Bone() {
  return (
    <g>
      <path d="M20 182 C70 168 110 190 150 180 C190 170 230 190 280 182 L280 300 L20 300 Z" fill="var(--sky-deep)" />
      <path d="M20 158 C70 148 110 166 150 160 C190 154 230 166 280 160 L280 184 C230 190 190 170 150 180 C110 190 70 168 20 182 Z" fill="var(--sheet)" />
    </g>
  );
}

export function ImplantStage({ stage }: { stage: 1 | 2 | 3 }) {
  const labels = ["Имплант в кости", "Формирователь десны", "Коронка на импланте"];
  return (
    <svg viewBox="30 40 240 260" role="img" aria-label={labels[stage - 1]}>
      <Bone />
      <Implant />
      {stage === 2 && <rect x={130} y={118} width={40} height={56} rx={10} fill="var(--sheet)" stroke="var(--ink)" strokeWidth={3} />}
      {stage === 3 && (
        <g>
          <rect x={138} y={132} width={24} height={42} rx={4} fill="var(--ink)" />
          <path d="M98 140 C95 105 110 72 150 70 C190 72 205 105 202 140 C204 150 196 158 186 160 L114 160 C104 158 96 150 98 140 Z" fill="var(--sheet)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
          <path d="M118 104 C130 114 142 92 150 102 C158 112 170 92 182 104" fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

export function PlanDrawing() {
  const rows = [
    ["Лечение каналов, три канала", "18 000 ₽"],
    ["Коронка керамическая", "32 000 ₽"],
    ["Профессиональная гигиена", "6 500 ₽"],
    ["Контрольный визит", "включён"],
  ];
  return (
    <svg viewBox="0 0 480 620" role="img" aria-label="План лечения с зафиксированной ценой: список этапов, итог и печать клиники">
      <rect x={48} y={40} width={384} height={540} fill="var(--sheet)" />
      <path d="M392 40 L432 80 L392 80 Z" fill="var(--sky-deep)" />
      <text x={80} y={104} fontFamily="var(--font-display), Georgia, serif" fontSize={30} fill="var(--ink)">
        План лечения
      </text>
      <text x={80} y={132} fontFamily="var(--font-body), system-ui, sans-serif" fontSize={14} fill="var(--muted)">
        Белова А. С., 29 октября
      </text>
      {rows.map(([name, price], i) => {
        const y = 192 + i * 40;
        return (
          <g key={name} fontFamily="var(--font-body), system-ui, sans-serif" fontSize={14} fill="var(--ink)">
            <text x={80} y={y}>
              {name}
            </text>
            <line x1={80} y1={y + 12} x2={400} y2={y + 12} stroke="var(--sky-deep)" strokeWidth={3} strokeLinecap="round" strokeDasharray="0 8" />
            <text x={400} y={y} textAnchor="end">
              {price}
            </text>
          </g>
        );
      })}
      <rect x={80} y={352} width={320} height={44} fill="var(--ink)" />
      <text x={96} y={381} fontFamily="var(--font-body), system-ui, sans-serif" fontSize={16} fontWeight={600} fill="var(--paper)">
        Итого
      </text>
      <text x={384} y={381} textAnchor="end" fontFamily="var(--font-body), system-ui, sans-serif" fontSize={16} fontWeight={600} fill="var(--paper)">
        56 500 ₽
      </text>
      <circle cx={340} cy={480} r={62} fill="none" stroke="var(--accent)" strokeWidth={3} />
      <circle cx={340} cy={480} r={52} fill="none" stroke="var(--accent)" strokeWidth={1.5} />
      <text x={340} y={476} textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif" fontSize={13} fontWeight={600} fill="var(--accent)">
        цена
      </text>
      <text x={340} y={494} textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif" fontSize={13} fontWeight={600} fill="var(--accent)">
        зафиксирована
      </text>
      <path d="M84 500 C100 450 112 530 128 488 C140 456 150 520 172 486 C188 462 200 512 224 494" fill="none" stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" />
      <text x={80} y={540} fontFamily="var(--font-body), system-ui, sans-serif" fontSize={13} fill="var(--muted)">
        Действует до 15 ноября
      </text>
    </svg>
  );
}
