# React Conventions Guide

This guide covers React and Next.js patterns used in this project.

## Server vs Client Components

### Server Components (Default)

Use for static content. In this prototype, pages are thin server
components that render a feature screen:

```tsx
// src/app/(tabs)/home/page.tsx
import { HomeScreen } from "@/features/home/home-screen"

export default function HomePage() {
	return <HomeScreen />
}
```

Screens that read the demo state (`useDemoState`) are client components.

### Client Components

Add `"use client"` directive **only at the server→client boundary**. Components imported by a client component are automatically client-side and don't need the directive.

Use for components that need:
- useState, useEffect, useRef, etc.
- Event handlers (onClick, onChange)
- Browser APIs
- Third-party client libraries

```tsx
"use client"

import { useState } from "react"
import { ClientChild } from "./ClientChild"

export function Counter() {
	const [count, setCount] = useState(0)
	return (
		<>
			<button onClick={() => setCount(c => c + 1)}>{count}</button>
			<ClientChild />
		</>
	)
}

// ClientChild.tsx - No directive needed, imported by client component
export function ClientChild() {
	return <div>Automatically client-side</div>
}
```

### Server Actions

Use `"use server"` for form actions and mutations:

```tsx
// src/actions/user.ts
"use server"

import { revalidatePath } from "next/cache"

export async function createUser(formData: FormData) {
	// Server action logic
	revalidatePath("/users")
}
```

## Hooks Guidelines

### useState (Preferred)

Use for component state that doesn't need to be computed from props/other state:

```tsx
const [isOpen, setIsOpen] = useState(false)
const [items, setItems] = useState<string[]>([])
```

### useMemo (Avoid by Default)

Use only when:
- Expensive calculations that take >1ms (measure with `console.time()`)
- Stable references needed for memoized children's deps

Avoid useMemo when:
- Computing simple values (arithmetic, string concat, array.map)
- Values are already cheap to compute
- Just referencing props or state

```tsx
// Bad: Unnecessary memoization
const fullName = useMemo(() => `${first} ${last}`, [first, last])
const filtered = useMemo(() => items.filter(i => i.active), [items])

// Good: Compute during render
const fullName = `${first} ${last}`
const filtered = items.filter(i => i.active)
```

For advanced patterns, load skill: `typescript-advanced-types`

### useCallback (Avoid by Default)

Use only when:
- Passing callbacks to memoized child components (React.memo, useMemo)
- Including functions in dependency arrays of other hooks

Avoid useCallback when:
- Child components aren't memoized (re-creates anyway)
- Just passing to regular HTML elements (button onClick, etc.)

```tsx
// Bad: Unnecessary - button isn't memoized
const handleClick = useCallback(() => setCount(c => c + 1), [])

// Good: Needed - MemoChild won't re-render unnecessarily
const MemoizedChild = React.memo(Child)
const handleResize = useCallback(() => { ... }, [])
return <MemoizedChild onResize={handleResize} />
```

For advanced patterns, load skill: `react-use-callback`

### useEffect (Avoid When Possible)

Load skill: `react-useeffect-avoid`

Avoid useEffect for:
- Derived state - compute during render: `const total = items.reduce(...)`
- State updates based on prop changes - handle in parent or use key prop

When useEffect is appropriate:
- Syncing with external systems
- Analytics/logging

```tsx
// Good: Syncing with external system
useEffect(() => {
	const subscription = eventSource.subscribe()
	return () => subscription.unsubscribe()
}, [eventSource])
```

## Component Structure

### Feature Components

Place in `src/features/<feature>/components/`:

```
src/features/auth/
├── components/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── index.ts          # Barrel export
└── index.ts              # Feature export
```

### Shared Components

Place in `src/components/ui/` for reusable UI:

```
src/components/ui/
├── button.tsx
├── input.tsx
├── dialog.tsx
└── index.ts
```

### Component Pattern

```tsx
// Use named exports
export function Button({ variant = "default", children }: ButtonProps) {
	return <button className={cn(baseStyles, variants[variant])}>{children}</button>
}

// In index.ts
export { Button } from "./button"
export type { ButtonProps } from "./button"
```

## Styling with Tailwind

### cn() Utility

Use the `cn()` utility for conditional classes:

```tsx
import { cn } from "@/lib/utils"

function Card({ className, active }: Props) {
	return (
		<div className={cn(
			"rounded-lg border p-4",
			active && "bg-blue-500",
			className,
		)}>
			{children}
		</div>
	)
}
```

### class-variance-authority (CVA)

Use CVA for component variants:

```tsx
import { cva } from "class-variance-authority"

const buttonVariants = cva(
	"inline-flex items-center rounded-md font-medium",
	{
		variants: {
			variant: {
				default: "bg-primary text-white",
				ghost: "bg-transparent hover:bg-gray-100",
				destructive: "bg-red-500 text-white",
			},
			size: {
				sm: "h-8 px-3 text-sm",
				md: "h-10 px-4",
				lg: "h-12 px-6 text-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
)
```

## shadcn/ui

This project uses shadcn/ui components as base:

1. Components in `src/components/ui/` are generated by shadcn CLI
2. Customize by modifying the component files directly
3. Load skill: `shadcn` for advanced usage

## Best Practices

1. **Server Components by default** - Only add "use client" when necessary
2. **Client boundary placement** - Add "use client" only at the server→client boundary; child client components don't need it
3. **Avoid premature memoization** - useMemo/useCallback/useEffect should be considered carefully; often unnecessary. Measure with `console.time()` before optimizing
4. **Derived state** - Compute during render, not in useEffect
5. **Component locality** - Keep related components together, use barrel exports

## Resources

- [React Documentation](https://react.dev/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [shadcn/ui](https://ui.shadcn.com/)
- [class-variance-authority](https://cva.style/docs)