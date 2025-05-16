"use client"

import { useState, useEffect } from "react"

/**
 * useMediaQuery - Custom hook for responsive design based on media queries
 *
 * This hook allows components to respond to changes in viewport size by:
 * - Checking if a media query matches the current viewport
 * - Updating when the viewport changes
 * - Supporting server-side rendering safely
 *
 * @param {string} query - CSS media query string (e.g., "(max-width: 640px)")
 * @returns {boolean} - Whether the media query matches
 *
 * @example
 * // Check if viewport is mobile size
 * const isMobile = useMediaQuery("(max-width: 640px)");
 *
 * // Use in conditional rendering
 * {isMobile ? <MobileComponent /> : <DesktopComponent />}
 */
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		// Set initial state based on window availability (for SSR)
		if (typeof window !== "undefined") {
			setMatches(window.matchMedia(query).matches)
		}

		// Only run the effect on the client
		if (typeof window === "undefined") return

		const media = window.matchMedia(query)

		// Update the state with the current value
		if (media.matches !== matches) {
			setMatches(media.matches)
		}

		// Create a listener function
		const listener = () => {
			setMatches(media.matches)
		}

		// Listen for changes
		media.addEventListener("change", listener)

		// Clean up
		return () => {
			media.removeEventListener("change", listener)
		}
	}, [matches, query])

	return matches
}
