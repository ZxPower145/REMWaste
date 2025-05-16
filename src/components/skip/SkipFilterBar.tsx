"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { FaFilter, FaRoad, FaRuler, FaPoundSign, FaTimes } from "react-icons/fa"

interface SkipFilterBarProps {
	filters: {
		roadPlacement: boolean
		heavyWaste: boolean
		sizeRange: [number, number]
		priceRange: [number, number]
	}
	onFilterChange: (filters: Partial<SkipFilterBarProps["filters"]>) => void
	hasHeavyWaste: boolean
}

/**
 * SkipFilterBar component - Provides filtering options for skips
 *
 * @param {Object} filters - Current filter settings
 * @param {Function} onFilterChange - Function to call when filters change
 * @param {boolean} hasHeavyWaste - Whether the user has selected heavy waste
 */
const SkipFilterBar: React.FC<SkipFilterBarProps> = ({ filters, onFilterChange, hasHeavyWaste }) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const [activeSizeDropdown, setActiveSizeDropdown] = useState(false)
	const [activePriceDropdown, setActivePriceDropdown] = useState(false)

	// Refs for dropdown elements
	const sizeDropdownRef = useRef<HTMLDivElement>(null)
	const priceDropdownRef = useRef<HTMLDivElement>(null)

	// Size range options
	const sizeOptions = [
		{ label: "All Sizes", value: [0, 40] as [number, number] },
		{ label: "Small (4-6 yards)", value: [4, 6] as [number, number] },
		{ label: "Medium (8-10 yards)", value: [8, 10] as [number, number] },
		{ label: "Large (12-16 yards)", value: [12, 16] as [number, number] },
		{ label: "Roll-On/Roll-Off (20-40 yards)", value: [20, 40] as [number, number] },
	]

	// Price range options
	const priceOptions = [
		{ label: "All Prices", value: [0, 1000] as [number, number] },
		{ label: "Under £300", value: [0, 300] as [number, number] },
		{ label: "£300 - £400", value: [300, 400] as [number, number] },
		{ label: "£400 - £500", value: [400, 500] as [number, number] },
		{ label: "Over £500", value: [500, 1000] as [number, number] },
	]

	// Get current filter labels for display
	const getCurrentSizeLabel = () => {
		const option = sizeOptions.find(
			(opt) => opt.value[0] === filters.sizeRange[0] && opt.value[1] === filters.sizeRange[1],
		)
		return option ? option.label : "Custom Size"
	}

	const getCurrentPriceLabel = () => {
		const option = priceOptions.find(
			(opt) => opt.value[0] === filters.priceRange[0] && opt.value[1] === filters.priceRange[1],
		)
		return option ? option.label : "Custom Price"
	}

	// Handle size option selection
	const handleSizeSelect = (option: { label: string; value: [number, number] }) => {
		onFilterChange({ sizeRange: option.value })
		setActiveSizeDropdown(false)
	}

	// Handle price option selection
	const handlePriceSelect = (option: { label: string; value: [number, number] }) => {
		onFilterChange({ priceRange: option.value })
		setActivePriceDropdown(false)
	}

	// Close dropdowns when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Don't close if clicking inside the dropdown
			if (sizeDropdownRef.current && sizeDropdownRef.current.contains(event.target as Node)) {
				return
			}

			if (priceDropdownRef.current && priceDropdownRef.current.contains(event.target as Node)) {
				return
			}

			setActiveSizeDropdown(false)
			setActivePriceDropdown(false)
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return (
		<div className="mb-6 skip-filter-bar relative z-20 overflow-visible">
			{/* Mobile filter toggle */}
			<div className="md:hidden mb-3">
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="w-full py-2 px-3 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-between"
				>
          <span className="flex items-center text-gray-300">
            <FaFilter className="mr-2 text-blue-400" />
            Filters
          </span>
					<span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
            {(filters.roadPlacement ? 1 : 0) +
							(filters.sizeRange[0] > 0 || filters.sizeRange[1] < 40 ? 1 : 0) +
							(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0)}
          </span>
				</button>
			</div>

			{/* Filter bar */}
			<motion.div
				className={`bg-gray-800/70 rounded-xl border border-gray-700 ${isExpanded ? "block" : "hidden md:block"}`}
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.2 }}
			>
				<div className="p-3 md:p-4">
					<div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
						{/* Road placement filter */}
						<div className="flex-1">
							<div className="text-xs text-gray-400 mb-1.5 flex items-center">
								<FaRoad className="mr-1.5 text-blue-400" />
								Road Placement
							</div>
							<button
								onClick={() => onFilterChange({ roadPlacement: !filters.roadPlacement })}
								className={`w-full py-1.5 px-3 rounded-md text-sm ${
									filters.roadPlacement ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
								}`}
							>
								{filters.roadPlacement ? "On Road Only" : "Any Placement"}
							</button>
						</div>

						{/* Size range filter */}
						<div className="flex-1 relative">
							<div className="text-xs text-gray-400 mb-1.5 flex items-center">
								<FaRuler className="mr-1.5 text-blue-400" />
								Skip Size
							</div>
							<div className="relative" ref={sizeDropdownRef}>
								<button
									className="w-full py-1.5 px-3 rounded-md text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 flex justify-between items-center"
									onClick={(e) => {
										e.stopPropagation()
										setActiveSizeDropdown(!activeSizeDropdown)
										setActivePriceDropdown(false)
									}}
								>
									<span>{getCurrentSizeLabel()}</span>
									<FaFilter className="text-gray-500 ml-1" />
								</button>

								{/* Dropdown - Using absolute positioning with high z-index */}
								{activeSizeDropdown && (
									<div className="absolute z-50 left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
										<div className="max-h-48 overflow-y-auto scrollbar-custom">
											{sizeOptions.map((option, index) => (
												<button
													key={index}
													onClick={() => handleSizeSelect(option)}
													className={`w-full text-left px-3 py-2 text-sm ${
														filters.sizeRange[0] === option.value[0] && filters.sizeRange[1] === option.value[1]
															? "bg-blue-900/50 text-blue-300"
															: "text-gray-300 hover:bg-gray-700"
													}`}
												>
													{option.label}
												</button>
											))}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Price range filter */}
						<div className="flex-1 relative">
							<div className="text-xs text-gray-400 mb-1.5 flex items-center">
								<FaPoundSign className="mr-1.5 text-blue-400" />
								Price Range
							</div>
							<div className="relative" ref={priceDropdownRef}>
								<button
									className="w-full py-1.5 px-3 rounded-md text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 flex justify-between items-center"
									onClick={(e) => {
										e.stopPropagation()
										setActivePriceDropdown(!activePriceDropdown)
										setActiveSizeDropdown(false)
									}}
								>
									<span>{getCurrentPriceLabel()}</span>
									<FaFilter className="text-gray-500 ml-1" />
								</button>

								{/* Dropdown - Using absolute positioning with high z-index */}
								{activePriceDropdown && (
									<div className="absolute z-50 left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
										<div className="max-h-48 overflow-y-auto scrollbar-custom">
											{priceOptions.map((option, index) => (
												<button
													key={index}
													onClick={() => handlePriceSelect(option)}
													className={`w-full text-left px-3 py-2 text-sm ${
														filters.priceRange[0] === option.value[0] && filters.priceRange[1] === option.value[1]
															? "bg-blue-900/50 text-blue-300"
															: "text-gray-300 hover:bg-gray-700"
													}`}
												>
													{option.label}
												</button>
											))}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Reset filters */}
						<div className="md:w-auto">
							<div className="text-xs text-gray-400 mb-1.5 md:text-center">Reset</div>
							<button
								onClick={() =>
									onFilterChange({
										roadPlacement: false,
										heavyWaste: hasHeavyWaste,
										sizeRange: [0, 40],
										priceRange: [0, 1000],
									})
								}
								className="w-full md:w-auto py-1.5 px-3 rounded-md text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 flex items-center justify-center"
							>
								<FaTimes className="mr-1.5" />
								Clear
							</button>
						</div>
					</div>

					{/* Active filters */}
					<div className="mt-3 flex flex-wrap gap-2">
						{filters.roadPlacement && (
							<div className="bg-blue-900/30 border border-blue-800 text-blue-300 px-2 py-0.5 rounded-md text-xs flex items-center">
								<span>On Road Only</span>
								<button
									onClick={() => onFilterChange({ roadPlacement: false })}
									className="ml-1.5 text-blue-400 hover:text-blue-300"
									aria-label="Remove road placement filter"
								>
									<FaTimes />
								</button>
							</div>
						)}

						{(filters.sizeRange[0] > 0 || filters.sizeRange[1] < 40) && (
							<div className="bg-blue-900/30 border border-blue-800 text-blue-300 px-2 py-0.5 rounded-md text-xs flex items-center">
								<span>Size: {getCurrentSizeLabel()}</span>
								<button
									onClick={() => onFilterChange({ sizeRange: [0, 40] })}
									className="ml-1.5 text-blue-400 hover:text-blue-300"
									aria-label="Remove size filter"
								>
									<FaTimes />
								</button>
							</div>
						)}

						{(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
							<div className="bg-blue-900/30 border border-blue-800 text-blue-300 px-2 py-0.5 rounded-md text-xs flex items-center">
								<span>Price: {getCurrentPriceLabel()}</span>
								<button
									onClick={() => onFilterChange({ priceRange: [0, 1000] })}
									className="ml-1.5 text-blue-400 hover:text-blue-300"
									aria-label="Remove price filter"
								>
									<FaTimes />
								</button>
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default SkipFilterBar
