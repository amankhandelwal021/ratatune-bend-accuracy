import { memo } from "react";

const HarmonicaArtwork = memo(function HarmonicaArtwork() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 220"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="harp-cover"
          x1="500"
          y1="40"
          x2="500"
          y2="118"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#515e54" />
          <stop offset=".09" stopColor="#c9cfc3" />
          <stop offset=".22" stopColor="#f5f6ed" />
          <stop offset=".42" stopColor="#c6ccc0" />
          <stop offset=".57" stopColor="#8b978a" />
          <stop offset=".75" stopColor="#e4e8dc" />
          <stop offset=".94" stopColor="#b5bdad" />
          <stop offset="1" stopColor="#546752" />
        </linearGradient>
        <linearGradient
          id="harp-bottom"
          x1="500"
          y1="140"
          x2="500"
          y2="180"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#d4dacb" />
          <stop offset=".16" stopColor="#70806d" />
          <stop offset=".45" stopColor="#aab6a2" />
          <stop offset=".68" stopColor="#e7ebdc" />
          <stop offset="1" stopColor="#65745e" />
        </linearGradient>
        <linearGradient id="harp-brass">
          <stop stopColor="#72603c" />
          <stop offset=".25" stopColor="#dac58e" />
          <stop offset=".5" stopColor="#9d8551" />
          <stop offset=".8" stopColor="#e1d5a9" />
          <stop offset="1" stopColor="#7b663a" />
        </linearGradient>
        <linearGradient id="harp-well" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#030b08" />
          <stop offset="1" stopColor="#27372b" />
        </linearGradient>
        <linearGradient id="harp-glint">
          <stop stopColor="#fffef3" stopOpacity="0" />
          <stop offset=".45" stopColor="#fffef3" stopOpacity=".03" />
          <stop offset=".5" stopColor="#fffef3" stopOpacity=".6" />
          <stop offset=".55" stopColor="#fffef3" stopOpacity=".03" />
          <stop offset="1" stopColor="#fffef3" stopOpacity="0" />
        </linearGradient>
        <clipPath id="harp-cover-clip">
          <path d="M52 87 67 63Q86 41 137 41H864q52 0 70 22l15 24-18 29H70Z" />
        </clipPath>
        <clipPath id="harp-frame">
          <rect width="1000" height="220" rx="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#harp-frame)">
        <g className="harp-camera">
          <ellipse
            className="harp-shadow"
            cx="500"
            cy="188"
            rx="440"
            ry="11"
            fill="#132b20"
            opacity=".17"
          />
          <g className="harp-draw-reeds">
            <path d="M68 151h866" stroke="url(#harp-brass)" strokeWidth="5" />
            <path
              d="M102 150v19h36v-19"
              fill="#a38b56"
              stroke="#77623b"
              strokeWidth="2"
            />
            <path
              d="M109 153v12h21"
              fill="none"
              stroke="#d4c18a"
              strokeWidth="2"
            />
            <path
              d="M184 150v19h36v-19"
              fill="#a38b56"
              stroke="#77623b"
              strokeWidth="2"
            />
            <path
              d="M191 153v12h21"
              fill="none"
              stroke="#d4c18a"
              strokeWidth="2"
            />
            <g className="harp-reed-third-lower">
              <path
                d="M266 150v19h36v-19"
                fill="#a38b56"
                stroke="#77623b"
                strokeWidth="2"
              />
              <path
                d="M273 153v12h21"
                fill="none"
                stroke="#d4c18a"
                strokeWidth="2"
              />
            </g>
            <path
              d="M348 150v19h36v-19"
              fill="#a38b56"
              stroke="#77623b"
              strokeWidth="2"
            />
            <path
              d="M355 153v12h21"
              fill="none"
              stroke="#d4c18a"
              strokeWidth="2"
            />
            <path
              d="M430 150v19h36v-19"
              fill="#a38b56"
              stroke="#77623b"
              strokeWidth="2"
            />
            <path
              d="M437 153v12h21"
              fill="none"
              stroke="#d4c18a"
              strokeWidth="2"
            />
            <path
              d="M512 150v19h36v-19"
              fill="#a38b56"
              stroke="#77623b"
              strokeWidth="2"
            />
            <path
              d="M519 153v12h21"
              fill="none"
              stroke="#d4c18a"
              strokeWidth="2"
            />
            <path
              d="M594 150v19h36v-19"
              fill="#a38b56"
              stroke="#77623b"
              strokeWidth="2"
            />
            <path
              d="M601 153v12h21"
              fill="none"
              stroke="#d4c18a"
              strokeWidth="2"
            />
            <path
              d="M676 150v19h36v-19"
              fill="#a38b56"
              stroke="#77623b"
              strokeWidth="2"
            />
            <path
              d="M683 153v12h21"
              fill="none"
              stroke="#d4c18a"
              strokeWidth="2"
            />
            <path
              d="M758 150v19h36v-19"
              fill="#a38b56"
              stroke="#77623b"
              strokeWidth="2"
            />
            <path
              d="M765 153v12h21"
              fill="none"
              stroke="#d4c18a"
              strokeWidth="2"
            />
            <path
              d="M840 150v19h36v-19"
              fill="#a38b56"
              stroke="#77623b"
              strokeWidth="2"
            />
            <path
              d="M847 153v12h21"
              fill="none"
              stroke="#d4c18a"
              strokeWidth="2"
            />
          </g>
          <g className="harp-lower">
            <path
              d="m52 136 18 27q11 16 56 16h745q44 0 60-16l18-27Z"
              fill="url(#harp-bottom)"
              stroke="#6e7965"
              strokeWidth="1.5"
            />
            <path
              d="M72 163q34 11 68 11h720q43 0 65-12"
              stroke="#f1f2e5"
              strokeOpacity=".6"
            />
            <path d="M55 137h890" stroke="url(#harp-brass)" strokeWidth="5" />
          </g>
          <path
            d="M57 99q6-8 24-8h836q21 0 29 8v48q-10 12-29 12H82q-16 0-25-12Z"
            fill="#374435"
            stroke="#101e17"
            strokeWidth="2"
          />
          <path
            d="M62 104h876M65 152h870"
            stroke="url(#harp-brass)"
            strokeWidth="5"
          />
          <g className="harp-hole">
            <rect
              x="88"
              y="112"
              width="62"
              height="34"
              rx="5"
              fill="url(#harp-well)"
              stroke="#9b8554"
              strokeWidth="2"
            />
            <path
              d="M92 140v-24h54"
              fill="none"
              stroke="#060f0c"
              strokeWidth="3"
            />
            <path d="M97 145h44" stroke="#88764e" opacity=".5" />
          </g>
          <g className="harp-hole">
            <rect
              x="170"
              y="112"
              width="62"
              height="34"
              rx="5"
              fill="url(#harp-well)"
              stroke="#9b8554"
              strokeWidth="2"
            />
            <path
              d="M174 140v-24h54"
              fill="none"
              stroke="#060f0c"
              strokeWidth="3"
            />
            <path d="M179 145h44" stroke="#88764e" opacity=".5" />
          </g>
          <g className="harp-hole harp-hole-third">
            <rect
              x="252"
              y="112"
              width="62"
              height="34"
              rx="5"
              fill="url(#harp-well)"
              stroke="#9b8554"
              strokeWidth="2"
            />
            <path
              d="M256 140v-24h54"
              fill="none"
              stroke="#060f0c"
              strokeWidth="3"
            />
            <path d="M261 145h44" stroke="#88764e" opacity=".5" />
          </g>
          <g className="harp-hole">
            <rect
              x="334"
              y="112"
              width="62"
              height="34"
              rx="5"
              fill="url(#harp-well)"
              stroke="#9b8554"
              strokeWidth="2"
            />
            <path
              d="M338 140v-24h54"
              fill="none"
              stroke="#060f0c"
              strokeWidth="3"
            />
            <path d="M343 145h44" stroke="#88764e" opacity=".5" />
          </g>
          <g className="harp-hole">
            <rect
              x="416"
              y="112"
              width="62"
              height="34"
              rx="5"
              fill="url(#harp-well)"
              stroke="#9b8554"
              strokeWidth="2"
            />
            <path
              d="M420 140v-24h54"
              fill="none"
              stroke="#060f0c"
              strokeWidth="3"
            />
            <path d="M425 145h44" stroke="#88764e" opacity=".5" />
          </g>
          <g className="harp-hole">
            <rect
              x="498"
              y="112"
              width="62"
              height="34"
              rx="5"
              fill="url(#harp-well)"
              stroke="#9b8554"
              strokeWidth="2"
            />
            <path
              d="M502 140v-24h54"
              fill="none"
              stroke="#060f0c"
              strokeWidth="3"
            />
            <path d="M507 145h44" stroke="#88764e" opacity=".5" />
          </g>
          <g className="harp-hole">
            <rect
              x="580"
              y="112"
              width="62"
              height="34"
              rx="5"
              fill="url(#harp-well)"
              stroke="#9b8554"
              strokeWidth="2"
            />
            <path
              d="M584 140v-24h54"
              fill="none"
              stroke="#060f0c"
              strokeWidth="3"
            />
            <path d="M589 145h44" stroke="#88764e" opacity=".5" />
          </g>
          <g className="harp-hole">
            <rect
              x="662"
              y="112"
              width="62"
              height="34"
              rx="5"
              fill="url(#harp-well)"
              stroke="#9b8554"
              strokeWidth="2"
            />
            <path
              d="M666 140v-24h54"
              fill="none"
              stroke="#060f0c"
              strokeWidth="3"
            />
            <path d="M671 145h44" stroke="#88764e" opacity=".5" />
          </g>
          <g className="harp-hole">
            <rect
              x="744"
              y="112"
              width="62"
              height="34"
              rx="5"
              fill="url(#harp-well)"
              stroke="#9b8554"
              strokeWidth="2"
            />
            <path
              d="M748 140v-24h54"
              fill="none"
              stroke="#060f0c"
              strokeWidth="3"
            />
            <path d="M753 145h44" stroke="#88764e" opacity=".5" />
          </g>
          <g className="harp-hole">
            <rect
              x="826"
              y="112"
              width="62"
              height="34"
              rx="5"
              fill="url(#harp-well)"
              stroke="#9b8554"
              strokeWidth="2"
            />
            <path
              d="M830 140v-24h54"
              fill="none"
              stroke="#060f0c"
              strokeWidth="3"
            />
            <path d="M835 145h44" stroke="#88764e" opacity=".5" />
          </g>
          <g className="harp-reeds">
            <path
              d="M102 100v-18h36v18"
              fill="#bda26a"
              stroke="#766139"
              strokeWidth="2"
            />
            <path
              d="M109 98V86h21"
              fill="none"
              stroke="#e9d39b"
              strokeWidth="2"
            />
            <path
              d="M184 100v-18h36v18"
              fill="#bda26a"
              stroke="#766139"
              strokeWidth="2"
            />
            <path
              d="M191 98V86h21"
              fill="none"
              stroke="#e9d39b"
              strokeWidth="2"
            />
            <g className="harp-reed-third-upper">
              <path
                d="M266 100v-18h36v18"
                fill="#bda26a"
                stroke="#766139"
                strokeWidth="2"
              />
              <path
                d="M273 98V86h21"
                fill="none"
                stroke="#e9d39b"
                strokeWidth="2"
              />
            </g>
            <path
              d="M348 100v-18h36v18"
              fill="#bda26a"
              stroke="#766139"
              strokeWidth="2"
            />
            <path
              d="M355 98V86h21"
              fill="none"
              stroke="#e9d39b"
              strokeWidth="2"
            />
            <path
              d="M430 100v-18h36v18"
              fill="#bda26a"
              stroke="#766139"
              strokeWidth="2"
            />
            <path
              d="M437 98V86h21"
              fill="none"
              stroke="#e9d39b"
              strokeWidth="2"
            />
            <path
              d="M512 100v-18h36v18"
              fill="#bda26a"
              stroke="#766139"
              strokeWidth="2"
            />
            <path
              d="M519 98V86h21"
              fill="none"
              stroke="#e9d39b"
              strokeWidth="2"
            />
            <path
              d="M594 100v-18h36v18"
              fill="#bda26a"
              stroke="#766139"
              strokeWidth="2"
            />
            <path
              d="M601 98V86h21"
              fill="none"
              stroke="#e9d39b"
              strokeWidth="2"
            />
            <path
              d="M676 100v-18h36v18"
              fill="#bda26a"
              stroke="#766139"
              strokeWidth="2"
            />
            <path
              d="M683 98V86h21"
              fill="none"
              stroke="#e9d39b"
              strokeWidth="2"
            />
            <path
              d="M758 100v-18h36v18"
              fill="#bda26a"
              stroke="#766139"
              strokeWidth="2"
            />
            <path
              d="M765 98V86h21"
              fill="none"
              stroke="#e9d39b"
              strokeWidth="2"
            />
            <path
              d="M840 100v-18h36v18"
              fill="#bda26a"
              stroke="#766139"
              strokeWidth="2"
            />
            <path
              d="M847 98V86h21"
              fill="none"
              stroke="#e9d39b"
              strokeWidth="2"
            />
            <path d="M68 99h867" stroke="url(#harp-brass)" strokeWidth="6" />
          </g>
          <g className="harp-upper">
            <path
              d="M52 87 67 63Q86 41 137 41H864q52 0 70 22l15 24-18 29H70Z"
              fill="url(#harp-cover)"
              stroke="#7b8977"
              strokeWidth="1.5"
            />
            <path
              d="M77 65q28-17 74-17h695q46 0 75 17M63 88h875"
              stroke="#f7f7eb"
              strokeWidth="2"
              opacity=".65"
            />
            <path d="M73 113h855" stroke="#364f3d" opacity=".5" />
            <g clipPath="url(#harp-cover-clip)">
              <path
                className="harp-glint"
                d="M-350 0H300L430 150H-220Z"
                fill="url(#harp-glint)"
              />
            </g>
            <text
              x="500"
              y="75"
              textAnchor="middle"
              fill="#54634f"
              opacity=".85"
              fontFamily="Georgia,serif"
              fontSize="24"
              fontStyle="italic"
              letterSpacing="2"
            >
              ratatune
            </text>
            <g fill="#4d5e48" fontFamily="monospace" fontSize="13">
              <text x="119" y="107" textAnchor="middle">
                1
              </text>
              <text x="201" y="107" textAnchor="middle">
                2
              </text>
              <text x="283" y="107" textAnchor="middle">
                3
              </text>
              <text x="365" y="107" textAnchor="middle">
                4
              </text>
              <text x="447" y="107" textAnchor="middle">
                5
              </text>
              <text x="529" y="107" textAnchor="middle">
                6
              </text>
              <text x="611" y="107" textAnchor="middle">
                7
              </text>
              <text x="693" y="107" textAnchor="middle">
                8
              </text>
              <text x="775" y="107" textAnchor="middle">
                9
              </text>
              <text x="857" y="107" textAnchor="middle">
                10
              </text>
            </g>
            <g fill="#c3ccba" stroke="#62705c" strokeWidth="1.5">
              <circle cx="85" cy="74" r="7" />
              <circle cx="914" cy="74" r="7" />
            </g>
            <path d="m81 78 8-8m821 8 8-8" stroke="#4f624b" strokeWidth="2" />
          </g>
          <rect
            className="harp-focus"
            x="252"
            y="112"
            width="62"
            height="34"
            rx="5"
            fill="none"
            stroke="#d4ba77"
            strokeWidth="4"
            opacity="0"
          />
          <g
            className="harp-airflow"
            opacity="0"
            stroke="#b9d38b"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          >
            <path d="M262 85q-2 29 21 42v62M306 168q1-33-23-41" />
            <path d="m277 181 6 8 6-8" strokeDasharray="none" />
          </g>
          <rect
            className="harp-breath"
            x="252"
            y="112"
            width="62"
            height="34"
            rx="5"
            fill="#dceca2"
            opacity="0"
          />
        </g>
      </g>
    </svg>
  );
});

export default HarmonicaArtwork;
