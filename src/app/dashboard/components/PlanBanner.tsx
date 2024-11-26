'use client';

interface PlanBannerProps {
  plan: string;
  apiLimit: number;
  maxLimit: number;
}

export function PlanBanner({ plan, apiLimit, maxLimit }: PlanBannerProps) {
  return (
    <div className="max-w-[1600px] mx-auto px-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-300 via-purple-300 to-blue-400 p-10">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-sm font-medium text-white/80 mb-3">CURRENT PLAN</div>
              <h1 className="text-3xl font-semibold text-white tracking-tight">{plan}</h1>
            </div>
            <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors">
              Manage Plan
            </button>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-medium text-white/80">API Limit</span>
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="bg-white/20 rounded-full h-2.5 mb-3">
              <div 
                className="bg-white rounded-full h-2.5 transition-all duration-500"
                style={{ width: `${(apiLimit / maxLimit) * 100}%` }}
              />
            </div>
            <div className="text-sm text-white/80 tracking-tight">
              {apiLimit.toLocaleString()} / {maxLimit.toLocaleString()} Requests
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 