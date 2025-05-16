"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Skip } from "../types/Waste"

interface WasteSelectionContextType {
	selectedWasteTypes: string[]
	toggleWasteType: (wasteTypeId: string) => void
	removeWasteType: (wasteTypeId: string) => void
	hasHeavyWaste: boolean
	setHasHeavyWaste: (value: boolean) => void
	heavyWasteTypes: string[]
	toggleHeavyWasteType: (wasteType: string) => void
	heavyWastePercentage: string
	setHeavyWastePercentage: (percentage: string) => void
	step: "waste-type" | "heavy-waste-modal" | "skip-selection"
	setStep: (step: "waste-type" | "heavy-waste-modal" | "skip-selection") => void
	skips: Skip[]
	setSkips: (skips: Skip[]) => void
	plasterboardPercentage?: string
	setPlasterboardPercentage?: (percentage: string) => void
}

/**
 * Context for managing waste selection state throughout the application
 *
 * This context provides a centralized way to:
 * - Track selected waste types
 * - Manage heavy waste options and percentages
 * - Control the current step in the waste selection flow
 * - Store available skips data
 */
const WasteSelectionContext = createContext<WasteSelectionContextType | undefined>(undefined)

/**
 * WasteSelectionProvider - Provider component for waste selection state
 *
 * This component manages the global state for the waste selection process,
 * making it available to all child components through the context API.
 *
 * @param {React.ReactNode} children - Child components that will have access to the context
 */
export const WasteSelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// State for selected waste types and options
	const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>(["garden-waste"])
	const [hasHeavyWaste, setHasHeavyWaste] = useState<boolean>(false)
	const [heavyWasteTypes, setHeavyWasteTypes] = useState<string[]>([])
	const [heavyWastePercentage, setHeavyWastePercentage] = useState<string>("no-heavy-waste")
	const [plasterboardPercentage, setPlasterboardPercentage] = useState<string>("no-plasterboard")

	// Navigation state
	const [step, setStep] = useState<"waste-type" | "heavy-waste-modal" | "skip-selection">("waste-type")

	// Available skips data
	const [skips, setSkips] = useState<Skip[]>([])

	/**
	 * Toggle selection of a waste type
	 * @param {string} wasteTypeId - ID of the waste type to toggle
	 */
	const toggleWasteType = (wasteTypeId: string) => {
		if (selectedWasteTypes.includes(wasteTypeId)) {
			setSelectedWasteTypes(selectedWasteTypes.filter((id) => id !== wasteTypeId))
		} else {
			setSelectedWasteTypes([...selectedWasteTypes, wasteTypeId])
		}
	}

	/**
	 * Remove a waste type from selection
	 * @param {string} wasteTypeId - ID of the waste type to remove
	 */
	const removeWasteType = (wasteTypeId: string) => {
		setSelectedWasteTypes(selectedWasteTypes.filter((id) => id !== wasteTypeId))
	}

	/**
	 * Toggle selection of a heavy waste type
	 * @param {string} wasteType - ID of the heavy waste type to toggle
	 */
	const toggleHeavyWasteType = (wasteType: string) => {
		if (heavyWasteTypes.includes(wasteType)) {
			setHeavyWasteTypes(heavyWasteTypes.filter((type) => type !== wasteType))
		} else {
			setHeavyWasteTypes([...heavyWasteTypes, wasteType])
		}
	}

	return (
		<WasteSelectionContext.Provider
			value={{
				selectedWasteTypes,
				toggleWasteType,
				removeWasteType,
				hasHeavyWaste,
				setHasHeavyWaste,
				heavyWasteTypes,
				toggleHeavyWasteType,
				heavyWastePercentage,
				setHeavyWastePercentage,
				plasterboardPercentage,
				setPlasterboardPercentage,
				step,
				setStep,
				skips,
				setSkips,
			}}
		>
			{children}
		</WasteSelectionContext.Provider>
	)
}

/**
 * Custom hook to access the waste selection context
 *
 * @returns {WasteSelectionContextType} The waste selection context
 * @throws {Error} If used outside of a WasteSelectionProvider
 */
export const useWasteSelection = () => {
	const context = useContext(WasteSelectionContext)
	if (context === undefined) {
		throw new Error("useWasteSelection must be used within a WasteSelectionProvider")
	}
	return context
}
