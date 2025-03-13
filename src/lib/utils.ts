import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseServerActionResponse = <T>(response: T) => {
  return JSON.parse(JSON.stringify(response))
}

export const formatDate = (date: Date, pattern = 'h:mm A') => {
  return dayjs(date).format(pattern)
}
