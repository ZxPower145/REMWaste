"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FaCheck, FaTimes, FaExclamationTriangle, FaCalendarAlt } from "react-icons/fa"
import type { Skip } from "../../types/Waste"
import { useMediaQuery } from "../../hooks/useMediaQuery"

interface SkipComparisonModalProps {
	skipIds: number[]
	skips: Skip[]
	onClose: () => void
	onSelect: (skipId: number) => void
}

/**
 * SkipComparisonModal component - Displays a side-by-side comparison of selected skips
 *
 * @param {number[]} skipIds - IDs of skips to compare
 * @param {Skip[]} skips - All available skips
 * @param {Function} onClose - Function to call when closing the modal
 * @param {Function} onSelect - Function to call when a skip is selected
 */
const SkipComparisonModal: React.FC<SkipComparisonModalProps> = ({ skipIds, skips, onClose, onSelect }) => {
	// Get the skips to compare
	const skipsToCompare = skips.filter((skip) => skipIds.includes(skip.id))
	const isMobile = useMediaQuery("(max-width: 768px)")

	// Format price to GBP
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-GB", {
			style: "currency",
			currency: "GBP",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(price)
	}

	return (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			onClick={onClose}
		>
			{/* Backdrop layer */}
			<div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

			{/* Modal itself */}
			<motion.div
				className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 w-full max-w-full sm:max-w-4xl max-h-full sm:max-h-[90vh] flex flex-col"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ type: "spring", damping: 25, stiffness: 300 }}
				onClick={(e) => e.stopPropagation()} // don't close when clicking inside
			>
				{/* Header */}
				<div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 sm:p-6 flex-shrink-0">
					<div className="flex justify-between items-center">
						<div>
							<h2 className="text-xl sm:text-2xl font-bold text-white">Skip Comparison</h2>
							<p className="text-blue-200 mt-1 text-xs sm:text-sm">Compare features and pricing</p>
						</div>
						<button
							onClick={onClose}
							className="text-blue-200 hover:text-white bg-blue-800/50 hover:bg-blue-800 p-2 rounded-full transition-colors"
						>
							<span className="sr-only">Close</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				{/* Content - Added proper overflow handling */}
				<div className="p-4 overflow-y-auto flex-grow scrollbar-custom">
					<div className={`overflow-x-auto ${isMobile ? "pb-4" : ""}`}>
						<table className="w-full min-w-[600px]">
							<thead>
							<tr>
								<th className="text-left p-2 text-gray-400 font-medium text-sm">Feature</th>
								{skipsToCompare.map((skip) => (
									<th key={skip.id} className="text-center p-2 text-white font-medium">
										{skip.size} Yard Skip
									</th>
								))}
							</tr>
							</thead>
							<tbody>
							{/* Size */}
							<tr className="border-t border-gray-800">
								<td className="p-3 text-gray-300">Size</td>
								{skipsToCompare.map((skip) => (
									<td key={skip.id} className="p-3 text-center text-white">
										{skip.size} yards
									</td>
								))}
							</tr>

							{/* Hire period */}
							<tr className="border-t border-gray-800">
								<td className="p-3 text-gray-300">Hire Period</td>
								{skipsToCompare.map((skip) => (
									<td key={skip.id} className="p-3 text-center text-white">
										<div className="flex items-center justify-center">
											<FaCalendarAlt className="mr-1.5 text-blue-400" />
											{skip.hire_period_days} days
										</div>
									</td>
								))}
							</tr>

							{/* Road placement */}
							<tr className="border-t border-gray-800">
								<td className="p-3 text-gray-300">Road Placement</td>
								{skipsToCompare.map((skip) => (
									<td key={skip.id} className="p-3 text-center">
										{skip.allowed_on_road ? (
											<div className="flex items-center justify-center text-green-400">
												<FaCheck className="mr-1" />
												Allowed
											</div>
										) : (
											<div className="flex items-center justify-center text-red-400">
												<FaExclamationTriangle className="mr-1" />
												Not Allowed
											</div>
										)}
									</td>
								))}
							</tr>

							{/* Heavy waste */}
							<tr className="border-t border-gray-800">
								<td className="p-3 text-gray-300">Heavy Waste</td>
								{skipsToCompare.map((skip) => (
									<td key={skip.id} className="p-3 text-center">
										{skip.allows_heavy_waste ? (
											<div className="flex items-center justify-center text-green-400">
												<FaCheck className="mr-1" />
												Suitable
											</div>
										) : (
											<div className="flex items-center justify-center text-red-400">
												<FaTimes className="mr-1" />
												Not Suitable
											</div>
										)}
									</td>
								))}
							</tr>

							{/* Price before VAT */}
							<tr className="border-t border-gray-800">
								<td className="p-3 text-gray-300">Price (excl. VAT)</td>
								{skipsToCompare.map((skip) => (
									<td key={skip.id} className="p-3 text-center text-white">
										{formatPrice(skip.price_before_vat)}
									</td>
								))}
							</tr>

							{/* VAT */}
							<tr className="border-t border-gray-800">
								<td className="p-3 text-gray-300">VAT</td>
								{skipsToCompare.map((skip) => (
									<td key={skip.id} className="p-3 text-center text-gray-400">
										{formatPrice((skip.price_before_vat * skip.vat) / 100)} ({skip.vat}%)
									</td>
								))}
							</tr>

							{/* Total price */}
							<tr className="border-t border-gray-800 bg-gray-800/30">
								<td className="p-3 text-white font-medium">Total Price</td>
								{skipsToCompare.map((skip) => (
									<td key={skip.id} className="p-3 text-center">
										<div className="text-xl font-bold text-blue-400">
											{formatPrice(skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100)}
										</div>
									</td>
								))}
							</tr>

							{/* Select button */}
							<tr className="border-t border-gray-800">
								<td className="p-3"></td>
								{skipsToCompare.map((skip) => (
									<td key={skip.id} className="p-3 text-center">
										<button
											onClick={() => {
												onSelect(skip.id)
												onClose()
											}}
											className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
										>
											Select This Skip
										</button>
									</td>
								))}
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default SkipComparisonModal
