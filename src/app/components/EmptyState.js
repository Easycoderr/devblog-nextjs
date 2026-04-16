export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center pb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        className="w-full h-full max-w-md mx-auto"
      >
        <defs>
          <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          <linearGradient id="imagePlaceholder" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="16"
              floodColor="#64748b"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        <style>{`
        .character-group { animation: float 4s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
        .floor-shadow { transform-origin: 250px 430px; animation: shadowPulse 4s ease-in-out infinite; }
        @keyframes shadowPulse { 0%, 100% { transform: scaleX(1); opacity: 0.8; } 50% { transform: scaleX(0.7); opacity: 0.3; } }
        .eye { animation: blink 5s infinite; }
        .eye-l { transform-origin: 215px 325px; }
        .eye-r { transform-origin: 285px 325px; }
        @keyframes blink { 0%, 46%, 48%, 100% { transform: scaleY(1); } 47% { transform: scaleY(0.1); } }
        .bg-float-1 { animation: floatBgUp 5s ease-in-out infinite; }
        .bg-float-2 { animation: floatBgDown 6s ease-in-out infinite; }
        .bg-float-3 { animation: floatBgUp 4.5s ease-in-out infinite; }
        @keyframes floatBgUp { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes floatBgDown { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(12px); } }
      `}</style>

        <rect
          x="50"
          y="50"
          width="400"
          height="400"
          rx="120"
          fill="#f4f8ff"
          transform="rotate(45, 250, 250)"
          opacity="0.6"
        />

        <g className="bg-float-2" opacity="0.7">
          <circle
            cx="110"
            cy="180"
            r="22"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="5"
          />
          <line
            x1="126"
            y1="196"
            x2="142"
            y2="212"
            stroke="#cbd5e1"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 95 170 A 12 12 0 0 1 115 165"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        <g className="bg-float-3" opacity="0.8">
          <rect
            x="370"
            y="240"
            width="40"
            height="40"
            rx="8"
            fill="#e0e7ff"
            transform="rotate(15, 390, 260)"
          />
          <line
            x1="378"
            y1="254"
            x2="402"
            y2="254"
            stroke="#c7d2fe"
            strokeWidth="3"
            strokeLinecap="round"
            transform="rotate(15, 390, 260)"
          />
          <line
            x1="378"
            y1="264"
            x2="395"
            y2="264"
            stroke="#c7d2fe"
            strokeWidth="3"
            strokeLinecap="round"
            transform="rotate(15, 390, 260)"
          />
        </g>

        <path
          d="M 370 140 Q 370 152 358 152 Q 370 152 370 164 Q 370 152 382 152 Q 370 152 370 140 Z"
          fill="#bae6fd"
          className="bg-float-1"
        />
        <path
          d="M 120 320 Q 120 328 112 328 Q 120 328 120 336 Q 120 328 128 328 Q 120 328 120 320 Z"
          fill="#ddd6fe"
          className="bg-float-1"
        />
        <circle cx="390" cy="330" r="5" fill="#e2e8f0" className="bg-float-2" />
        <circle cx="140" cy="240" r="4" fill="#bfdbfe" className="bg-float-3" />

        <ellipse
          cx="250"
          cy="430"
          rx="75"
          ry="10"
          fill="#e2e8f0"
          className="floor-shadow"
        />

        <g className="character-group">
          <rect
            x="155"
            y="110"
            width="190"
            height="270"
            rx="28"
            fill="#e2e8f0"
            opacity="0.5"
            transform="rotate(-6, 250, 245)"
          />
          <rect
            x="155"
            y="110"
            width="190"
            height="270"
            rx="28"
            fill="#f1f5f9"
            transform="rotate(4, 250, 245)"
          />
          <rect
            x="155"
            y="110"
            width="190"
            height="270"
            rx="28"
            fill="url(#cardGrad)"
            filter="url(#softShadow)"
          />

          <g transform="translate(0, -5)">
            <rect
              x="180"
              y="140"
              width="140"
              height="70"
              rx="14"
              fill="url(#imagePlaceholder)"
            />
            <circle cx="215" cy="160" r="10" fill="#cbd5e1" opacity="0.6" />
            <path
              d="M 180 195 L 205 168 L 225 188 L 255 158 L 320 200"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          <circle cx="195" cy="230" r="10" fill="#e2e8f0" />
          <rect x="215" y="226" width="65" height="8" rx="4" fill="#cbd5e1" />
          <rect x="180" y="250" width="140" height="8" rx="4" fill="#e2e8f0" />
          <rect x="180" y="268" width="95" height="8" rx="4" fill="#f1f5f9" />

          <g className="face">
            <ellipse
              cx="202"
              cy="332"
              rx="7"
              ry="4"
              fill="#fecaca"
              opacity="0.5"
            />
            <ellipse
              cx="298"
              cy="332"
              rx="7"
              ry="4"
              fill="#fecaca"
              opacity="0.5"
            />
            <circle
              cx="215"
              cy="325"
              r="7.5"
              fill="#475569"
              className="eye eye-l"
            />
            <circle
              cx="285"
              cy="325"
              r="7.5"
              fill="#475569"
              className="eye eye-r"
            />
            <circle
              cx="217"
              cy="322"
              r="2.5"
              fill="#ffffff"
              className="eye eye-l"
            />
            <circle
              cx="287"
              cy="322"
              r="2.5"
              fill="#ffffff"
              className="eye eye-r"
            />
            <path
              d="M 241 337 Q 250 332 259 337"
              fill="none"
              stroke="#475569"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
      <h2 className="text-2xl font-bold">There is no article yet</h2>
      <p className="text-gray-500">Check back later!</p>
    </div>
  );
}
