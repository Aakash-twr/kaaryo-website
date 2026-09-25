import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { CalendarIcon, ClockIcon } from '../icons/FeatureIcons'
import { CloseIcon } from '../icons/UiIcons'

function pad(n) {
  return String(n).padStart(2, '0')
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

function formatTime12h(h, m) {
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 || 12
  return `${hour12}:${pad(m)} ${ampm}`
}

export default function ModernDateTimePicker({ value, onChange, min, error, onBlur }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  // Parse current value or use default
  const parsedDate = value ? new Date(value) : new Date(Date.now() + 60 * 60 * 1000)
  
  // State for popover
  const [selectedDate, setSelectedDate] = useState(parsedDate)
  const [hour, setHour] = useState(parsedDate.getHours())
  const [minute, setMinute] = useState(parsedDate.getMinutes())
  const [position, setPosition] = useState('bottom')

  // Generate next 14 days
  const dateOptions = []
  const today = new Date()
  for (let i = 0; i < 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dateOptions.push(d)
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
        if (onBlur) onBlur()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onBlur])

  useEffect(() => {
    if (value) {
      const d = new Date(value)
      setSelectedDate(d)
      setHour(d.getHours())
      setMinute(d.getMinutes())
    }
  }, [value])

  const handleApply = () => {
    const newDate = new Date(selectedDate)
    newDate.setHours(hour, minute, 0, 0)
    
    // Format for datetime-local (YYYY-MM-DDThh:mm)
    const val = `${newDate.getFullYear()}-${pad(newDate.getMonth() + 1)}-${pad(newDate.getDate())}T${pad(newDate.getHours())}:${pad(newDate.getMinutes())}`
    
    onChange({ target: { value: val } })
    setIsOpen(false)
  }

  const toggleOpen = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      // Popover height is roughly 380px
      if (spaceBelow < 380 && rect.top > 380) {
        setPosition('top')
      } else {
        setPosition('bottom')
      }
    }
    setIsOpen(!isOpen)
  }

  const isToday = selectedDate.getDate() === today.getDate() && selectedDate.getMonth() === today.getMonth()
  
  // If today, minimum hour logic might apply. We'll simplify and just let the user pick, 
  // relying on the parent's validation / clamping (BookingModal already has clamping logic).

  return (
    <div className="relative" ref={containerRef}>
      {/* Input Facade */}
      <div 
        className={`flex w-full cursor-pointer items-center gap-2.5 rounded-2xl border bg-paper-50 px-4 py-3.5 outline-none transition-all duration-200 hover:border-brand-500/50 ${
          isOpen ? 'border-brand-500 ring-4 ring-brand-500/10' : error ? 'border-danger-500/60 ring-4 ring-danger-500/10' : 'border-ink-900/15'
        }`}
        onClick={toggleOpen}
        tabIndex={0}
      >
        <CalendarIcon size={18} className={error ? 'text-danger-500' : isOpen ? 'text-brand-500' : 'text-ink-400'} />
        <span className={`text-[0.92rem] font-medium ${value ? 'text-ink-900' : 'text-ink-400'}`}>
          {value ? `${formatDate(selectedDate)} at ${formatTime12h(hour, minute)}` : 'Select date and time...'}
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: position === 'top' ? 10 : -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === 'top' ? 10 : -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-0 z-50 w-[340px] rounded-3xl border border-ink-900/10 bg-white/95 p-5 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.15)] backdrop-blur-xl sm:w-[380px] ${
              position === 'top' 
                ? 'bottom-[calc(100%+8px)] origin-bottom' 
                : 'top-[calc(100%+8px)] origin-top'
            }`}
          >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <p className="font-mono text-[0.65rem] font-semibold tracking-[0.15em] text-brand-600 uppercase">
                Schedule Booking
              </p>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-900/5 text-ink-500 transition-colors hover:bg-ink-900/10 hover:text-ink-900"
              >
                <CloseIcon size={14} />
              </button>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <p className="mb-3 flex items-center gap-1.5 text-[0.8rem] font-medium text-ink-900">
                <CalendarIcon size={14} className="text-ink-400" /> Date
              </p>
              <div className="-mx-2 flex gap-2 overflow-x-auto px-2 pb-2 [-ms-overflow-style:none] [scrollbar-width:none]">
                {dateOptions.map((d, i) => {
                  const isSelected = d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth()
                  let label = formatDate(d)
                  if (i === 0) label = 'Today'
                  else if (i === 1) label = 'Tomorrow'
                  
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`shrink-0 rounded-2xl px-4 py-2.5 text-[0.85rem] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                        isSelected
                          ? 'bg-ink-900 text-white shadow-[0_8px_16px_-6px_rgba(15,23,42,0.4)]'
                          : 'bg-paper-100 text-ink-600 hover:bg-paper-200 hover:text-ink-900'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time Selection with clearly labeled sliders */}
            <div className="mb-6 rounded-2xl border border-ink-900/5 bg-paper-50/50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-[0.8rem] font-medium text-ink-900">
                  <ClockIcon size={14} className="text-ink-400" /> Time
                </p>
                <div className="rounded-lg bg-white px-3 py-1 font-mono text-[1.1rem] font-bold text-brand-600 shadow-sm ring-1 ring-ink-900/5">
                  {formatTime12h(hour, minute)}
                </div>
              </div>

              <div className="space-y-5">
                {/* Hour Slider */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="hour-slider" className="text-[0.75rem] font-bold text-ink-500 uppercase tracking-wider">
                      Hour
                    </label>
                    <span className="font-mono text-[0.8rem] font-semibold text-ink-900">
                      {hour % 12 || 12} {hour >= 12 ? 'PM' : 'AM'}
                    </span>
                  </div>
                  <input
                    id="hour-slider"
                    type="range"
                    min="7"
                    max="22"
                    step="1"
                    value={hour}
                    onChange={(e) => setHour(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-900/10 accent-brand-600 outline-none transition-all hover:bg-ink-900/15 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
                  />
                  <div className="mt-1 flex justify-between px-1 font-mono text-[0.6rem] text-ink-400">
                    <span>7 AM</span>
                    <span>10 PM</span>
                  </div>
                </div>

                {/* Minute Slider */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="minute-slider" className="text-[0.75rem] font-bold text-ink-500 uppercase tracking-wider">
                      Minute
                    </label>
                    <span className="font-mono text-[0.8rem] font-semibold text-ink-900">
                      {pad(minute)}
                    </span>
                  </div>
                  <input
                    id="minute-slider"
                    type="range"
                    min="0"
                    max="45"
                    step="15"
                    value={minute}
                    onChange={(e) => setMinute(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-900/10 accent-brand-600 outline-none transition-all hover:bg-ink-900/15 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
                  />
                  <div className="mt-1 flex justify-between px-1 font-mono text-[0.6rem] text-ink-400">
                    <span>00</span>
                    <span>15</span>
                    <span>30</span>
                    <span>45</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleApply}
              className="w-full rounded-xl bg-brand-600 py-3 text-[0.9rem] font-semibold text-white shadow-[0_8px_16px_-6px_rgba(0,103,79,0.4)] transition-all hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-[0_12px_20px_-8px_rgba(0,103,79,0.5)] active:translate-y-0"
            >
              Confirm {formatDate(selectedDate)} at {formatTime12h(hour, minute)}
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
