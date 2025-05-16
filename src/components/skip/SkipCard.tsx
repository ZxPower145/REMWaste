"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FaExclamationTriangle, FaCalendarAlt, FaCheck, FaBalanceScale } from "react-icons/fa"
import { TbTruckDelivery } from "react-icons/tb"
import type { Skip } from "../../types/Waste"

interface SkipCardProps {
	skip: Skip
	onSelect: () => void
	onCompare: () => void
	isComparing: boolean
}

/**
 * SkipCard component - Displays a single skip option with details
 *
 * @param {Skip} skip - The skip data to display
 * @param {Function} onSelect - Function to call when the skip is selected
 * @param {Function} onCompare - Function to call when the skip is added to comparison
 * @param {boolean} isComparing - Whether this skip is currently being compared
 */
const SkipCard: React.FC<SkipCardProps> = ({ skip, onSelect, onCompare, isComparing }) => {
	// Calculate total price including VAT
	const vatAmount = (skip.price_before_vat * skip.vat) / 100
	const totalPrice = skip.price_before_vat + vatAmount

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
			className={`rounded-xl overflow-hidden border transition-all duration-200 ${
				isComparing
					? "border-blue-500 bg-blue-900/20"
					: "border-gray-700 bg-gray-900/80 hover:border-blue-500/70 hover:shadow-lg hover:shadow-blue-900/20"
			}`}
			whileHover={{ scale: 1.02, y: -4 }}
			whileTap={{ scale: 0.98 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
			layout
		>
			{/* Skip image and size badge */}
			<div className="relative">
				<div className="bg-gradient-to-r from-gray-800 to-gray-900 aspect-[4/3] flex items-center justify-center">
					{/* Skip image would go here - using a placeholder */}
					<div className="w-4/5 h-3/5 bg-yellow-500 rounded-t-lg transform perspective-800 rotateX-10">
						<div className="w-full h-full flex items-center justify-center border-2 border-yellow-600">
							<div className="text-blue-900 font-bold text-lg">{skip.size} YD</div>
						</div>
					</div>
				</div>

				{/* Size badge */}
				<div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
					{skip.size} Yards
				</div>

				{/* Road placement warning if applicable */}
				{!skip.allowed_on_road && (
					<div className="absolute bottom-3 left-3 bg-amber-900/90 text-amber-200 px-2 py-1 rounded-md text-xs flex items-center">
						<FaExclamationTriangle className="mr-1" />
						Not Allowed On Road
					</div>
				)}
			</div>

			{/* Skip details */}
			<div className="p-4">
				<h3 className="text-lg font-bold text-white mb-1">{skip.size} Yard Skip</h3>

				<div className="flex items-center text-gray-400 text-sm mb-3">
					<FaCalendarAlt className="mr-1.5 text-blue-400" />
					{skip.hire_period_days} day hire period
				</div>

				{/* Features */}
				<div className="space-y-2 mb-4">
					{skip.allows_heavy_waste && (
						<div className="flex items-center text-xs text-gray-300">
							<div className="w-5 h-5 rounded-full bg-green-900/50 flex items-center justify-center mr-2 flex-shrink-0">
								<FaCheck className="text-green-400 w-3 h-3" />
							</div>
							Suitable for heavy waste
						</div>
					)}

					<div className="flex items-center text-xs text-gray-300">
						<div
							className={`w-5 h-5 rounded-full ${skip.allowed_on_road ? "bg-green-900/50" : "bg-red-900/50"} flex items-center justify-center mr-2 flex-shrink-0`}
						>
							{skip.allowed_on_road ? (
								<FaCheck className="text-green-400 w-3 h-3" />
							) : (
								<FaExclamationTriangle className="text-red-400 w-3 h-3" />
							)}
						</div>
						{skip.allowed_on_road ? "Can be placed on road" : "Cannot be placed on road"}
					</div>

					{skip.transport_cost && (
						<div className="flex items-center text-xs text-gray-300">
							<div className="w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 flex-shrink-0">
								<TbTruckDelivery className="text-blue-400 w-3 h-3" />
							</div>
							Transport cost: {formatPrice(skip.transport_cost)}
						</div>
					)}
				</div>

				{/* Price */}
				<div className="flex justify-between items-end mb-4">
					<div>
						<div className="text-xs text-gray-400">Total Price</div>
						<div className="text-2xl font-bold text-blue-400">{formatPrice(totalPrice)}</div>
						<div className="text-xs text-gray-500">{formatPrice(skip.price_before_vat)} + VAT</div>
					</div>

					{/* Compare checkbox */}
					<button
						onClick={(e) => {
							e.stopPropagation()
							onCompare()
						}}
						className={`p-2 rounded-md ${
							isComparing ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
						}`}
						aria-label={isComparing ? "Remove from comparison" : "Add to comparison"}
					>
						<FaBalanceScale />
					</button>
				</div>

				{/* Select button */}
				<button
					onClick={onSelect}
					className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors flex items-center justify-center"
				>
					Select This Skip
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 ml-1.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</motion.div>
	)
}

export default SkipCard
