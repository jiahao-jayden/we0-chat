export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="min-h-6 min-w-6 inline-flex justify-center items-center py-0.5 px-1 bg-white border border-gray-200 font-mono text-xs text-gray-800 rounded-md dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
      {children}
    </kbd>
  )
}
