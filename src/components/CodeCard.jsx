"use client";

import { Copy } from "lucide-react";

export default function CodeCard() {
  return (
    <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-[#050816] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_38%)]" />

      <div className="relative flex items-center border-b border-white/5 px-6 py-4">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        <p className="absolute left-1/2 -translate-x-1/2 text-sm text-zinc-500">
          latest.js
        </p>
      </div>

      <div className="relative p-8">
        <pre className="font-mono text-[17px] leading-[2] tracking-tight">
          <code>
            <div>
              <span className="text-fuchsia-400">import</span> {"{ "}
              <span className="text-sky-400">stream</span>
              {" } "}
              <span className="text-fuchsia-400">from</span>{" "}
              <span className="text-emerald-400">{'"codestream"'}</span>
            </div>

            <br />

            <div>
              <span className="text-sky-400">stream</span>
              <span className="text-zinc-100">(</span>

              <span className="text-emerald-400">{"'knowledge'"}</span>

              <span className="text-zinc-100">)</span>
            </div>

            <div className="pl-6">
              <span className="text-yellow-300">.filter</span>

              <span className="text-zinc-100">{"(topic => topic !== "}</span>

              <span className="text-emerald-400">{"'hype'"}</span>

              <span className="text-zinc-100">{")"}</span>
            </div>

            <div className="pl-6">
              <span className="text-yellow-300">.map</span>

              <span className="text-zinc-100">{"(learn => apply(learn))"}</span>
            </div>

            <div className="pl-6">
              <span className="text-yellow-300">.forEach</span>

              <span className="text-zinc-100">{"(grow => ship(grow))"}</span>
            </div>

            <br />

            <div className="text-zinc-500">
              {"// Keep learning. Keep building."}
            </div>
          </code>
        </pre>

        <button className="absolute bottom-6 right-6 rounded-2xl border border-white/10 bg-white/5 p-3 text-zinc-400 transition hover:bg-white/10 hover:text-white">
          <Copy size={18} />
        </button>
      </div>
    </div>
  );
}
