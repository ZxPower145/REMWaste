import type React from "react"

/**
 * Skip interface - Represents a skip container available for waste disposal
 *
 * Contains details about:
 * - Size and pricing information
 * - Location availability
 * - Restrictions and permissions
 */
export interface Skip {
	id: number
	size: number
	hire_period_days: number
	transport_cost: number | null
	per_tonne_cost: number | null
	price_before_vat: number
	vat: number
	postcode: string
	area: string
	forbidden: boolean
	created_at: string
	updated_at: string
	allowed_on_road: boolean
	allows_heavy_waste: boolean
}

/**
 * WasteType interface - Represents a category of waste for selection
 *
 * Contains details about:
 * - Identification and display information
 * - Visual representation (icon)
 * - Availability status
 * - Example items in this category
 */
export interface WasteType {
	id: string
	name: string
	description: string
	icon: React.ReactNode
	enabled: boolean
	examples: string[]
}
