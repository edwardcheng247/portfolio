import type { SiteVersion } from './useSiteVersion'

// Floating pill, bottom-right. Temporary chrome while v2 is in progress.
export function VersionToggle({ version, onChange }: { version: SiteVersion; onChange: (v: SiteVersion) => void }) {
  return (
    <div className="version-toggle" role="radiogroup" aria-label="Site version">
      {(['v1', 'v2'] as const).map(v => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={version === v}
          className={`version-toggle-btn${version === v ? ' version-toggle-btn--active' : ''}`}
          onClick={() => onChange(v)}
        >
          {v.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
