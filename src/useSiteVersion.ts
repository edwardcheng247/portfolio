import { useEffect, useState } from 'react'

export type SiteVersion = 'v1' | 'v2'

const STORAGE_KEY = 'site-version'

export function useSiteVersion(): [SiteVersion, (v: SiteVersion) => void] {
  const [version, setVersion] = useState<SiteVersion>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'v2' ? 'v2' : 'v1'
    } catch {
      return 'v1'
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, version)
    } catch {
      // private mode etc. — toggle still works for the session
    }
  }, [version])
  return [version, setVersion]
}
