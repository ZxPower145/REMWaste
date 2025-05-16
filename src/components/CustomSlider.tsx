import React from "react"

interface CustomSliderProps {
	min: number
	max: number
	step: number
	value: number
	onChange: (value: number) => void
	disabled?: boolean
	labels?: string[]
	className?: string
}

/**
 * CustomSlider component - A styled range slider with step markers and labels
 *
 * This component provides a custom-styled slider with:
 * - Configurable min, max, and step values
 * - Optional labels for key points
 * - Disabled state styling
 * - Visual feedback for the selected value
 *
 * @param {number} min - Minimum value of the slider
 * @param {number} max - Maximum value of the slider
 * @param {number} step - Step increment of the slider
 * @param {number} value - Current value of the slider
 * @param {Function} onChange - Function called when the slider value changes
 * @param {boolean} disabled - Whether the slider is disabled
 * @param {string[]} labels - Optional array of labels to display
 * @param {string} className - Additional CSS classes to apply
 */
const CustomSlider: React.FC<CustomSliderProps> = ({
																										 min,
																										 max,
																										 step,
																										 value,
																										 onChange,
																										 disabled = false,
																										 labels,
																										 className = "",
																									 }) => {
	// Calculate the percentage position for the thumb and filled track
	const percentage = ((value - min) / (max - min)) * 100

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(Number(e.target.value))
	}

	return (
		<div className={`w-full ${className}`} aria-disabled={disabled}>
			{labels && (
				<div className="flex justify-between text-xs text-gray-500 mb-2 px-1">
					{labels.map((label, index) => (
						<span key={index}>{label}</span>
					))}
				</div>
			)}
			<div className="relative h-7 flex items-center">
				{/* Track background */}
				<div className="absolute w-full h-2 bg-gray-800 rounded-full" aria-hidden="true"></div>

				{/* Filled track */}
				<div
					className={`absolute h-2 rounded-full ${
						disabled ? "bg-gray-700" : "bg-gradient-to-r from-blue-600 to-blue-400"
					}`}
					style={{ width: `${percentage}%` }}
					aria-hidden="true"
				></div>

				{/* Step markers */}
				<div className="absolute w-full flex justify-between px-1" aria-hidden="true">
					{Array.from({ length: (max - min) / step + 1 }).map((_, index) => (
						<div
							key={index}
							className={`w-1 h-1 rounded-full ${
								index * step + min <= value ? "bg-blue-300" : "bg-gray-600"
							}`}
						></div>
					))}
				</div>

				{/* Actual input */}
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={handleChange}
					disabled={disabled}
					className={`absolute w-full h-7 opacity-0 cursor-pointer ${disabled ? "cursor-not-allowed" : ""}`}
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuenow={value}
					aria-valuetext={`${value}%`}
				/>

				{/* Thumb */}
				<div
					className={`absolute w-5 h-5 rounded-full shadow-md transform -translate-x-1/2 transition-all ${
						disabled
							? "bg-gray-600"
							: "bg-white border-2 border-blue-500"
					}`}
					style={{ left: `${percentage}%` }}
					aria-hidden="true"
				></div>
			</div>
		</div>
	)
}

export default CustomSlider
