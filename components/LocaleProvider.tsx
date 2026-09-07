"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { copy, isLocale, type Locale } from "@/lib/copy";

const STORAGE_KEY = "ll-locale";
const LOCALE_EVENT = "ll-locale-change";

function subscribeToLocale(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LOCALE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LOCALE_EVENT, callback);
  };
}

function getLocaleSnapshot(): Locale {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(saved) ? saved : "es";
}

function getServerLocaleSnapshot(): Locale {
  return "es";
}

type I18n = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof copy)[Locale];
};

const LocaleContext = createContext<I18n | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18n>(
    () => ({
      locale,
      setLocale(next) {
        window.localStorage.setItem(STORAGE_KEY, next);
        window.dispatchEvent(new Event(LOCALE_EVENT));
      },
      t: copy[locale],
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useI18n must be used inside LocaleProvider");
  return ctx;
}
