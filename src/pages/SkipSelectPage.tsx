"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useWasteSelection } from "../providers/WasteSelectorProvider"
import { FaInfoCircle, FaRuler, FaCheck } from "react-icons/fa"
import { MdWarning } from "react-icons/md"
import SkipCard from "../components/skip/SkipCard"
import SkipComparisonModal from "../components/skip/SkipComparisonModal"
import SkipFilterBar from "../components/skip/SkipFilterBar"

/**
 * SkipSelectPage component - Page for selecting the appropriate skip size
 *
 * This page displays available skips based on the user's waste type selection
 * and allows filtering and comparison of different skip options.
 */
const SkipSelectPage: React.FC = () => {
	const { skips, heavyWasteTypes, heavyWastePercentage } = useWasteSelection()
	const [filteredSkips, setFilteredSkips] = useState(skips)
	const [, setSelectedSkipId] = useState<number | null>(null)
	const [showComparisonModal, setShowComparisonModal] = useState(false)
	const [compareSkips, setCompareSkips] = useState<number[]>([])
	const [filters, setFilters] = useState({
		roadPlacement: false,
		heavyWaste: heavyWasteTypes.length > 0,
		sizeRange: [0, 40] as [number, number],
		priceRange: [0, 1000] as [number, number],
	})

	const hasHeavyWaste = heavyWasteTypes.length > 0

	// Calculate price ranges for filter initialization
	useEffect(() => {
		if (skips.length > 0) {
			const prices = skips.map((skip) => skip.price_before_vat)
			const minPrice = Math.min(...prices)
			const maxPrice = Math.max(...prices)
			setFilters((prev) => ({
				...prev,
				priceRange: [minPrice, maxPrice],
			}))
		}
	}, [skips])

	// Apply filters to skips
	useEffect(() => {
		let filtered = [...skips]

		// Filter by road placement if selected
		if (filters.roadPlacement) {
			filtered = filtered.filter((skip) => skip.allowed_on_road)
		}

		// Always filter by heavy waste if user has heavy waste
		if (hasHeavyWaste) {
			filtered = filtered.filter((skip) => skip.allows_heavy_waste)
		}

		// Filter by size range
		filtered = filtered.filter((skip) => skip.size >= filters.sizeRange[0] && skip.size <= filters.sizeRange[1])

		// Filter by price range
		filtered = filtered.filter(
			(skip) => skip.price_before_vat >= filters.priceRange[0] && skip.price_before_vat <= filters.priceRange[1],
		)

		// Sort by size (smaller to larger)
		filtered.sort((a, b) => a.size - b.size)

		setFilteredSkips(filtered)
	}, [skips, filters, hasHeavyWaste])

	const handleSkipSelect = (skipId: number) => {
		setSelectedSkipId(skipId)
		// In a real app, this would navigate to the next step
		alert(`Selected skip ID: ${skipId}`)
	}

	const toggleSkipComparison = (skipId: number) => {
		setCompareSkips((prev) => {
			if (prev.includes(skipId)) {
				return prev.filter((id) => id !== skipId)
			} else {
				// Limit to comparing 3 skips maximum
				if (prev.length >= 3) {
					return [...prev.slice(1), skipId]
				}
				return [...prev, skipId]
			}
		})
	}

	const handleFilterChange = (newFilters: Partial<typeof filters>) => {
		setFilters((prev) => ({
			...prev,
			...newFilters,
		}))
	}

	// Animation variants
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	}

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	}

	return (
		<motion.div
			className="w-full max-w-6xl mx-auto px-3 sm:px-4 overflow-y-auto h-full"
			initial="hidden"
			animate="show"
			variants={container}
		>
			<motion.h1
				className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
				variants={item}
			>
				Choose Your Skip Size
			</motion.h1>

			<motion.p className="text-center text-gray-400 text-sm md:text-base mb-4 md:mb-6" variants={item}>
				Select the skip size that best suits your needs
			</motion.p>

			{/* Warning banner for heavy waste */}
			{hasHeavyWaste && (
				<motion.div
					className="bg-amber-900/30 border border-amber-800/50 rounded-xl p-3 md:p-4 mb-4 md:mb-6"
					variants={item}
				>
					<div className="flex items-start">
						<div className="bg-amber-900/50 p-1.5 md:p-2 rounded-lg mr-3 md:mr-4 flex-shrink-0">
							<MdWarning className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
						</div>
						<div>
							<h3 className="font-medium text-amber-300 text-sm md:text-base mb-1">Heavy Waste Restrictions Apply</h3>
							<p className="text-gray-300 text-xs md:text-sm">
								Based on your heavy waste selection ({heavyWasteTypes.join(", ")}), only skips that support heavy waste
								are shown.
								{heavyWastePercentage !== "no-heavy-waste" &&
									` Your selected heavy waste percentage (${heavyWastePercentage.replace(/-/g, " ")}) may affect pricing.`}
							</p>
						</div>
					</div>
				</motion.div>
			)}

			{/* Filter bar */}
			<motion.div variants={item} className='z-30'>
				<SkipFilterBar filters={filters} onFilterChange={handleFilterChange} hasHeavyWaste={hasHeavyWaste} />
			</motion.div>

			{/* Compare button */}
			{compareSkips.length > 0 && (
				<motion.div
					className="mb-4 md:mb-6 flex justify-center"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
				>
					<button
						onClick={() => setShowComparisonModal(true)}
						className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
					>
						<span>Compare {compareSkips.length} Skips</span>
						<FaCheck />
					</button>
				</motion.div>
			)}

			{/* Skip grid */}
			{filteredSkips.length > 0 ? (
				<motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" variants={item}>
					{filteredSkips.map((skip) => (
						<SkipCard
							key={skip.id}
							skip={skip}
							onSelect={() => handleSkipSelect(skip.id)}
							onCompare={() => toggleSkipComparison(skip.id)}
							isComparing={compareSkips.includes(skip.id)}
						/>
					))}
				</motion.div>
			) : (
				<motion.div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center" variants={item}>
					<FaInfoCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
					<h3 className="text-lg font-medium text-white mb-2">No Matching Skips</h3>
					<p className="text-gray-400 mb-4">No skips match your current filters. Try adjusting your filter criteria.</p>
					<button
						onClick={() =>
							setFilters({
								roadPlacement: false,
								heavyWaste: hasHeavyWaste,
								sizeRange: [0, 40],
								priceRange: [0, 1000],
							})
						}
						className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
					>
						Reset Filters
					</button>
				</motion.div>
			)}

			{/* Skip size guide */}
			<motion.div
				className="mt-8 md:mt-12 bg-gray-800/50 border border-gray-700 rounded-xl p-4 md:p-6 mb-6"
				variants={item}
			>
				<h3 className="text-lg md:text-xl font-medium text-white mb-3 md:mb-4 flex items-center">
					<FaRuler className="mr-2 text-blue-400" />
					Skip Size Guide
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-gray-800/70 rounded-lg p-3 md:p-4">
						<h4 className="font-medium text-blue-300 mb-2">Small Skips (4-6 yards)</h4>
						<p className="text-sm text-gray-300 mb-2">
							Ideal for small home projects, garden waste, and minor renovations.
						</p>
						<ul className="text-xs text-gray-400 space-y-1 list-disc pl-4">
							<li>4 yard: Approximately 30-40 bin bags</li>
							<li>6 yard: Approximately 50-60 bin bags</li>
							<li>Perfect for kitchen/bathroom renovations</li>
						</ul>
					</div>

					<div className="bg-gray-800/70 rounded-lg p-3 md:p-4">
						<h4 className="font-medium text-blue-300 mb-2">Medium Skips (8-10 yards)</h4>
						<p className="text-sm text-gray-300 mb-2">
							Suitable for larger home renovations and construction projects.
						</p>
						<ul className="text-xs text-gray-400 space-y-1 list-disc pl-4">
							<li>8 yard: Approximately 60-80 bin bags</li>
							<li>10 yard: Approximately 80-100 bin bags</li>
							<li>Good for full house clearances</li>
						</ul>
					</div>

					<div className="bg-gray-800/70 rounded-lg p-3 md:p-4">
						<h4 className="font-medium text-blue-300 mb-2">Large Skips (12-16 yards)</h4>
						<p className="text-sm text-gray-300 mb-2">For major construction, demolition, and commercial projects.</p>
						<ul className="text-xs text-gray-400 space-y-1 list-disc pl-4">
							<li>12 yard: Approximately 100-120 bin bags</li>
							<li>14-16 yard: Approximately 120-160 bin bags</li>
							<li>Ideal for large construction debris</li>
						</ul>
					</div>

					<div className="bg-gray-800/70 rounded-lg p-3 md:p-4">
						<h4 className="font-medium text-blue-300 mb-2">Roll-On/Roll-Off (20-40 yards)</h4>
						<p className="text-sm text-gray-300 mb-2">For industrial use and major commercial projects.</p>
						<ul className="text-xs text-gray-400 space-y-1 list-disc pl-4">
							<li>20 yard: Industrial-scale waste</li>
							<li>40 yard: Largest available option</li>
							<li>Requires significant space for placement</li>
						</ul>
					</div>
				</div>
			</motion.div>

			{/* Comparison modal */}
			<AnimatePresence>
				{showComparisonModal && (
					<SkipComparisonModal
						skipIds={compareSkips}
						skips={skips}
						onClose={() => setShowComparisonModal(false)}
						onSelect={handleSkipSelect}
					/>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default SkipSelectPage
