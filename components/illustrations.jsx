function Svg({ children, viewBox = "0 0 320 220" }) {
  return (
    <svg
      aria-hidden="true"
      className="svg-illustration"
      fill="none"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function EmojiArt({ emoji }) {
  return <div className="emoji-illustration">{emoji}</div>;
}

function MoneyScene() {
  return (
    <Svg>
      <rect x="32" y="170" width="256" height="18" rx="9" fill="#EAE5DC" />
      <rect x="76" y="56" width="168" height="98" rx="12" fill="#EEF2F7" stroke="#1C2430" strokeWidth="8" />
      <path d="M112 126L138 104L163 112L191 81L212 92" stroke="#4A86F7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="9" />
      <circle cx="112" cy="126" r="6" fill="#4A86F7" />
      <circle cx="138" cy="104" r="6" fill="#4A86F7" />
      <circle cx="163" cy="112" r="6" fill="#4A86F7" />
      <circle cx="191" cy="81" r="6" fill="#4A86F7" />
      <circle cx="212" cy="92" r="6" fill="#4A86F7" />
      <rect x="116" y="154" width="88" height="10" rx="5" fill="#1C2430" opacity="0.2" />
      <rect x="52" y="124" width="56" height="36" rx="8" fill="#D4B56F" />
      <path d="M64 134H97" stroke="#FFF6E5" strokeLinecap="round" strokeWidth="6" />
      <path d="M64 146H88" stroke="#FFF6E5" strokeLinecap="round" strokeWidth="6" />
      <rect x="214" y="133" width="44" height="32" rx="8" fill="#D9E5D6" />
      <path d="M236 137C227 137 220 144 220 153H252C252 144 245 137 236 137Z" fill="#5E8E62" />
      <rect x="232" y="152" width="8" height="18" rx="4" fill="#7E5D3B" />
    </Svg>
  );
}

function FitnessScene() {
  return (
    <Svg>
      <rect x="42" y="170" width="236" height="18" rx="9" fill="#EAE5DC" />
      <rect x="96" y="72" width="34" height="76" rx="12" fill="#1C2430" />
      <rect x="190" y="72" width="34" height="76" rx="12" fill="#1C2430" />
      <rect x="124" y="100" width="72" height="20" rx="10" fill="#313B49" />
      <path d="M70 152L116 124C127 117 141 117 151 123L185 145C196 152 210 156 224 156H242C248 156 253 161 253 167C253 173 248 178 242 178H219C204 178 189 174 176 166L136 141L96 164C89 168 81 170 73 170H58V161L70 152Z" fill="#F6F8FB" stroke="#1C2430" strokeLinejoin="round" strokeWidth="7" />
      <path d="M132 131L157 146" stroke="#4A86F7" strokeLinecap="round" strokeWidth="7" />
    </Svg>
  );
}

function SocialScene() {
  return (
    <Svg>
      <rect x="40" y="174" width="240" height="14" rx="7" fill="#EAE5DC" />
      <circle cx="88" cy="54" r="8" fill="#D3A64F" />
      <circle cx="122" cy="46" r="8" fill="#D3A64F" />
      <circle cx="156" cy="58" r="8" fill="#D3A64F" />
      <circle cx="190" cy="44" r="8" fill="#D3A64F" />
      <circle cx="224" cy="55" r="8" fill="#D3A64F" />
      <path d="M80 118C80 97 97 80 118 80C139 80 156 97 156 118V126H80V118Z" fill="#B7C6D9" />
      <circle cx="118" cy="72" r="24" fill="#1C2430" />
      <path d="M146 120C146 101 162 86 181 86C200 86 216 101 216 120V128H146V120Z" fill="#1C2430" opacity="0.92" />
      <circle cx="181" cy="78" r="22" fill="#2B3340" />
      <path d="M182 128C182 104 201 84 225 84C249 84 268 104 268 128V138H182V128Z" fill="#F3F5F8" />
      <circle cx="225" cy="75" r="26" fill="#202A37" />
    </Svg>
  );
}

function ScreensArt() {
  return (
    <Svg>
      <rect x="70" y="72" width="188" height="102" rx="16" fill="#F4F7FB" stroke="#1C2430" strokeWidth="10" />
      <rect x="94" y="96" width="140" height="54" rx="12" fill="url(#screen-gradient)" />
      <rect x="136" y="176" width="58" height="8" rx="4" fill="#9AA5B1" />
      <rect x="40" y="98" width="74" height="116" rx="18" fill="#F4F7FB" stroke="#1C2430" strokeWidth="8" />
      <rect x="54" y="118" width="46" height="76" rx="10" fill="url(#phone-gradient)" />
      <defs>
        <linearGradient id="screen-gradient" x1="94" x2="234" y1="96" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EAF2FF" />
          <stop offset="1" stopColor="#9EC1FF" />
        </linearGradient>
        <linearGradient id="phone-gradient" x1="54" x2="100" y1="118" y2="194" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4FBFF" />
          <stop offset="1" stopColor="#A4C8FF" />
        </linearGradient>
      </defs>
    </Svg>
  );
}

function QuitCloud() {
  return (
    <Svg>
      <circle cx="158" cy="98" r="54" fill="#FFD46A" />
      <path d="M135 85C143 92 149 92 157 85" stroke="#724110" strokeLinecap="round" strokeWidth="8" />
      <path d="M167 87C175 93 182 93 189 88" stroke="#724110" strokeLinecap="round" strokeWidth="8" />
      <path d="M134 124C148 112 168 112 182 124" stroke="#724110" strokeLinecap="round" strokeWidth="9" />
      <path d="M216 141C234 141 248 154 248 171C248 188 234 201 216 201H94C76 201 62 188 62 171C62 154 76 141 94 141H216Z" fill="#F4F6FA" />
      <path d="M235 143L258 130" stroke="#DCE4EF" strokeLinecap="round" strokeWidth="9" />
      <path d="M248 157L272 154" stroke="#DCE4EF" strokeLinecap="round" strokeWidth="9" />
    </Svg>
  );
}

function QuestionFocus() {
  return (
    <Svg>
      <circle cx="152" cy="112" r="58" fill="#FFD24D" />
      <circle cx="128" cy="103" r="10" fill="#724110" />
      <circle cx="170" cy="103" r="10" fill="#724110" />
      <path d="M131 141C141 135 152 133 164 137" stroke="#724110" strokeLinecap="round" strokeWidth="9" />
      <path d="M222 58C222 43 235 30 252 30C268 30 282 43 282 58C282 70 275 78 264 84C255 89 252 94 252 102" stroke="#4A86F7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="9" />
      <circle cx="252" cy="118" r="7" fill="#4A86F7" />
    </Svg>
  );
}

function TooMuch() {
  return (
    <Svg>
      <rect x="72" y="48" width="74" height="96" rx="10" fill="#F5F5F2" stroke="#A9A093" strokeWidth="5" transform="rotate(-10 72 48)" />
      <path d="M88 80L105 97L130 65" stroke="#4D5B6B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
      <rect x="170" y="46" width="68" height="88" rx="10" fill="#4A86F7" stroke="#31559A" strokeWidth="5" transform="rotate(8 170 46)" />
      <circle cx="230" cy="129" r="28" fill="#F5F5F2" stroke="#4D5B6B" strokeWidth="5" />
      <path d="M230 115V130H243" stroke="#4D5B6B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
      <circle cx="160" cy="158" r="42" fill="#FFD24D" />
      <path d="M138 151C145 159 153 159 160 151" stroke="#724110" strokeLinecap="round" strokeWidth="8" />
      <path d="M165 151C172 159 180 159 187 151" stroke="#724110" strokeLinecap="round" strokeWidth="8" />
      <path d="M138 182C149 169 169 166 183 178" stroke="#724110" strokeLinecap="round" strokeWidth="9" />
    </Svg>
  );
}

function NeutralDot() {
  return (
    <Svg>
      <circle cx="160" cy="110" r="56" fill="#FFD24D" />
      <circle cx="138" cy="100" r="9" fill="#724110" />
      <circle cx="182" cy="100" r="9" fill="#724110" />
      <path d="M133 140H187" stroke="#724110" strokeLinecap="round" strokeWidth="10" />
    </Svg>
  );
}

function JunkFood() {
  return (
    <Svg>
      <rect x="54" y="82" width="64" height="86" rx="10" fill="#E34B44" />
      <path d="M58 96H114L96 154H76L58 96Z" fill="#F7C64D" />
      <rect x="168" y="78" width="52" height="68" rx="12" fill="#D53A2A" />
      <rect x="162" y="60" width="64" height="22" rx="11" fill="#F6EFE7" />
      <path d="M193 60L205 42" stroke="#D53A2A" strokeLinecap="round" strokeWidth="6" />
      <path d="M150 162C150 146 164 132 180 132H206C222 132 236 146 236 162H150Z" fill="#F5B45D" />
      <path d="M148 164H238C238 182 223 196 205 196H181C163 196 148 182 148 164Z" fill="#B86D2B" />
      <path d="M155 154H231" stroke="#F0D96B" strokeLinecap="round" strokeWidth="8" />
      <circle cx="246" cy="178" r="10" fill="#E94C48" />
      <circle cx="270" cy="184" r="10" fill="#F0C33C" />
      <circle cx="232" cy="196" r="10" fill="#3E7B59" />
      <circle cx="256" cy="204" r="10" fill="#4A86F7" />
    </Svg>
  );
}

function Motivation() {
  return (
    <Svg>
      <rect x="44" y="74" width="224" height="92" rx="20" fill="#F5F6FA" stroke="#303640" strokeWidth="10" />
      <rect x="58" y="92" width="40" height="56" rx="10" fill="#F15B5B" />
      <rect x="268" y="108" width="16" height="24" rx="8" fill="#303640" />
      <circle cx="160" cy="164" r="44" fill="#E8E8EA" stroke="#676A72" strokeWidth="6" />
      <path d="M142 156C149 163 156 163 163 156" stroke="#303640" strokeLinecap="round" strokeWidth="8" />
      <path d="M157 156C164 163 171 163 178 156" stroke="#303640" strokeLinecap="round" strokeWidth="8" />
      <path d="M144 186H176" stroke="#303640" strokeLinecap="round" strokeWidth="9" />
    </Svg>
  );
}

function MountainFlag() {
  return (
    <Svg>
      <path d="M50 184L120 92L158 142L196 114L268 184H50Z" fill="#17202E" />
      <path d="M98 184L145 126L164 149L191 134L226 184H98Z" fill="#2B3340" />
      <path d="M124 92V46" stroke="#17202E" strokeWidth="10" />
      <path d="M124 48H170L150 74H124V48Z" fill="#17202E" />
    </Svg>
  );
}

function TargetArt() {
  return (
    <Svg>
      <circle cx="160" cy="110" r="72" fill="#17202E" />
      <circle cx="160" cy="110" r="54" fill="#FFF8ED" />
      <circle cx="160" cy="110" r="36" fill="#17202E" />
      <circle cx="160" cy="110" r="18" fill="#FFF8ED" />
      <path d="M208 66L246 46L228 84L160 112" stroke="#17202E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
      <path d="M246 46L228 84L218 74" stroke="#17202E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
    </Svg>
  );
}

function BalanceArt() {
  return (
    <Svg>
      <path d="M160 62V176" stroke="#17202E" strokeLinecap="round" strokeWidth="10" />
      <path d="M106 84H214" stroke="#17202E" strokeLinecap="round" strokeWidth="10" />
      <path d="M116 84L88 138H144L116 84Z" fill="#17202E" />
      <path d="M204 84L176 138H232L204 84Z" fill="#17202E" />
      <path d="M136 176H184" stroke="#17202E" strokeLinecap="round" strokeWidth="12" />
      <circle cx="160" cy="48" r="14" fill="#17202E" />
    </Svg>
  );
}

function StopwatchArt() {
  return (
    <Svg>
      <circle cx="160" cy="118" r="62" fill="#FFF" stroke="#17202E" strokeWidth="10" />
      <path d="M160 118V82" stroke="#4A86F7" strokeLinecap="round" strokeWidth="10" />
      <path d="M160 118L191 103" stroke="#4A86F7" strokeLinecap="round" strokeWidth="10" />
      <rect x="145" y="32" width="30" height="22" rx="6" fill="#17202E" />
      <path d="M207 72L226 53" stroke="#17202E" strokeLinecap="round" strokeWidth="9" />
    </Svg>
  );
}

function ClockArt() {
  return (
    <Svg>
      <circle cx="160" cy="110" r="72" fill="#FFF" stroke="#17202E" strokeWidth="10" />
      <path d="M160 110V60" stroke="#17202E" strokeLinecap="round" strokeWidth="10" />
      <path d="M160 110H212" stroke="#4A86F7" strokeLinecap="round" strokeWidth="10" />
      <path d="M160 34V46" stroke="#17202E" strokeLinecap="round" strokeWidth="6" />
      <path d="M160 174V186" stroke="#17202E" strokeLinecap="round" strokeWidth="6" />
      <path d="M86 110H74" stroke="#17202E" strokeLinecap="round" strokeWidth="6" />
      <path d="M246 110H234" stroke="#17202E" strokeLinecap="round" strokeWidth="6" />
    </Svg>
  );
}

function DumbbellArt() {
  return (
    <Svg>
      <rect x="92" y="102" width="136" height="16" rx="8" fill="#303640" />
      <rect x="68" y="80" width="28" height="60" rx="12" fill="#1C2430" />
      <rect x="224" y="80" width="28" height="60" rx="12" fill="#1C2430" />
      <rect x="46" y="88" width="20" height="44" rx="10" fill="#4B5665" />
      <rect x="254" y="88" width="20" height="44" rx="10" fill="#4B5665" />
    </Svg>
  );
}

function QuestionMarkArt() {
  return (
    <Svg>
      <circle cx="160" cy="110" r="70" fill="#17202E" />
      <path d="M137 86C137 72 149 60 164 60C180 60 192 71 192 86C192 98 185 105 173 110C165 113 160 121 160 131" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="11" />
      <circle cx="160" cy="154" r="8" fill="#FFF" />
    </Svg>
  );
}

function MoneyGrowth() {
  return (
    <Svg>
      <rect x="54" y="82" width="208" height="96" rx="14" fill="#FFF" stroke="#323B47" strokeWidth="8" />
      <rect x="84" y="132" width="26" height="30" rx="6" fill="#323B47" />
      <rect x="120" y="120" width="26" height="42" rx="6" fill="#323B47" />
      <rect x="156" y="104" width="26" height="58" rx="6" fill="#323B47" />
      <rect x="192" y="90" width="26" height="72" rx="6" fill="#323B47" />
      <path d="M78 120L124 103L160 118L202 82" stroke="#D3A64F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="9" />
      <path d="M202 82H185" stroke="#D3A64F" strokeLinecap="round" strokeWidth="9" />
      <path d="M202 82V98" stroke="#D3A64F" strokeLinecap="round" strokeWidth="9" />
      <circle cx="76" cy="186" r="28" fill="#D3A64F" />
      <path d="M74 170V201" stroke="#FFF6E5" strokeLinecap="round" strokeWidth="8" />
      <path d="M86 177C82 173 76 171 70 173C65 175 63 181 67 185C70 188 74 188 79 189C86 190 90 197 86 202C82 206 74 206 68 203" stroke="#FFF6E5" strokeLinecap="round" strokeWidth="6" />
    </Svg>
  );
}

function BetterShape() {
  return (
    <Svg>
      <circle cx="176" cy="90" r="42" fill="#1C2430" />
      <path d="M62 154L112 118L138 154" stroke="#3E4653" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <circle cx="70" cy="154" r="22" fill="#1C2430" />
      <circle cx="130" cy="154" r="22" fill="#1C2430" />
      <path d="M154 154L204 154L242 129C250 124 260 130 260 139V145C260 150 256 154 251 154H154Z" fill="#1C2430" />
      <path d="M188 154L226 118H242C255 118 266 129 266 142V148" stroke="#4B5665" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
      <path d="M164 147L193 147" stroke="#F4F6FA" strokeLinecap="round" strokeWidth="6" />
    </Svg>
  );
}

function DisciplineArt() {
  return (
    <Svg>
      <rect x="90" y="52" width="116" height="138" rx="12" fill="#F5F6FA" stroke="#303640" strokeWidth="7" />
      <rect x="126" y="34" width="44" height="24" rx="8" fill="#C7C7CB" stroke="#8F8F94" strokeWidth="5" />
      <rect x="114" y="88" width="20" height="20" rx="5" fill="#303640" />
      <path d="M119 98L124 103L132 92" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      <path d="M144 98H182" stroke="#C0C6D0" strokeLinecap="round" strokeWidth="6" />
      <path d="M114 126H182" stroke="#C0C6D0" strokeLinecap="round" strokeWidth="6" />
      <path d="M114 152H182" stroke="#C0C6D0" strokeLinecap="round" strokeWidth="6" />
      <rect x="202" y="92" width="62" height="74" rx="10" fill="#FFF" stroke="#303640" strokeWidth="7" />
      <path d="M202 110H264" stroke="#303640" strokeWidth="7" />
      <path d="M220 92V110" stroke="#303640" strokeWidth="7" />
      <path d="M246 92V110" stroke="#303640" strokeWidth="7" />
      <path d="M217 133H225" stroke="#303640" strokeLinecap="round" strokeWidth="5" />
      <path d="M233 133H241" stroke="#303640" strokeLinecap="round" strokeWidth="5" />
      <path d="M249 133H257" stroke="#303640" strokeLinecap="round" strokeWidth="5" />
      <circle cx="78" cy="168" r="28" fill="#FFF" stroke="#303640" strokeWidth="7" />
      <path d="M78 168V152" stroke="#303640" strokeLinecap="round" strokeWidth="5" />
      <path d="M78 168L91 160" stroke="#303640" strokeLinecap="round" strokeWidth="5" />
    </Svg>
  );
}

function SingleFocusArt() {
  return (
    <Svg>
      <circle cx="160" cy="110" r="72" fill="#FFF" stroke="#303640" strokeWidth="8" />
      <circle cx="160" cy="110" r="48" fill="#F3F5F8" stroke="#303640" strokeWidth="8" />
      <circle cx="160" cy="110" r="24" fill="#303640" />
      <path d="M160 110L222 64" stroke="#303640" strokeLinecap="round" strokeWidth="10" />
      <path d="M222 64L246 56L233 82" stroke="#303640" strokeLinecap="round" strokeLinejoin="round" strokeWidth="9" />
    </Svg>
  );
}

export function LeadHeroIllustration() {
  return (
    <div className="lead-hero-art" aria-hidden="true">
      <div className="lead-hero-stage">
        <div className="lead-hero-ring lead-hero-ring--top">
          <span className="lead-hero-orbit lead-hero-orbit--focus">
            <TargetArt />
          </span>
          <span className="lead-hero-orbit lead-hero-orbit--relationships">
            <SocialScene />
          </span>
          <span className="lead-hero-orbit lead-hero-orbit--discipline">
            <DisciplineArt />
          </span>
          <span className="lead-hero-orbit lead-hero-orbit--wealth">
            <MoneyGrowth />
          </span>
          <span className="lead-hero-orbit lead-hero-orbit--health">
            <BetterShape />
          </span>
        </div>
        <div className="lead-hero-path" />
        <div className="lead-hero-silhouette">
          <div className="lead-hero-head" />
          <div className="lead-hero-body" />
          <div className="lead-hero-shadow" />
        </div>
      </div>
    </div>
  );
}

export function Illustration({ art }) {
  switch (art) {
    case "money-scene":
      return <MoneyScene />;
    case "fitness-scene":
      return <FitnessScene />;
    case "social-scene":
      return <SocialScene />;
    case "face-1":
      return <EmojiArt emoji="😫" />;
    case "face-2":
      return <EmojiArt emoji="🙁" />;
    case "face-3":
      return <EmojiArt emoji="😐" />;
    case "face-4":
      return <EmojiArt emoji="🙂" />;
    case "face-5":
      return <EmojiArt emoji="😄" />;
    case "screens":
      return <ScreensArt />;
    case "quit-cloud":
      return <QuitCloud />;
    case "question-focus":
      return <QuestionFocus />;
    case "too-much":
      return <TooMuch />;
    case "neutral-dot":
      return <NeutralDot />;
    case "junk-food":
      return <JunkFood />;
    case "motivation":
      return <Motivation />;
    case "mountain-flag":
      return <MountainFlag />;
    case "target":
      return <TargetArt />;
    case "balance":
      return <BalanceArt />;
    case "stopwatch":
      return <StopwatchArt />;
    case "clock":
      return <ClockArt />;
    case "dumbbell":
      return <DumbbellArt />;
    case "question-mark":
      return <QuestionMarkArt />;
    case "money-growth":
      return <MoneyGrowth />;
    case "better-shape":
      return <BetterShape />;
    case "discipline":
      return <DisciplineArt />;
    case "single-focus":
      return <SingleFocusArt />;
    default:
      return <NeutralDot />;
  }
}
