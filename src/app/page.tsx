'use client'

import { useState } from 'react'

import {
  RegexPatterns,
  PasswordStrength,
  PasswordStrengthType,
  PasswordStrengthColor,
} from '@/types'

import { MIN_PASSWORD_LENGTH } from '@/constants'

import { Input } from '@/components/input'
import { Indications } from '@/components/indications'

export default function Home() {
  const [password, setPassword] = useState<string>('')

  const getPasswordStrength = (password: string): PasswordStrength => {
    if (!password) {
      return PasswordStrengthType.None
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return PasswordStrengthType.Short
    }

    const containsLetters = new RegExp(RegexPatterns.Letters).test(password)
    const containsDigits = new RegExp(RegexPatterns.Digits).test(password)
    const containsSymbols = new RegExp(RegexPatterns.Symbols).test(password)

    if (containsLetters && containsDigits && containsSymbols) {
      return PasswordStrengthType.Strong
    }

    if (
      (containsLetters && containsSymbols) ||
      (containsLetters && containsDigits) ||
      (containsDigits && containsSymbols)
    ) {
      return PasswordStrengthType.Medium
    }

    if (containsLetters || containsDigits || containsSymbols) {
      return PasswordStrengthType.Weak
    }

    return PasswordStrengthType.None
  }

  const getSectionColor = (index: number): string => {
    const strength: PasswordStrength = getPasswordStrength(password)

    switch (strength) {
      case PasswordStrengthType.None:
        return PasswordStrengthColor.None

      case PasswordStrengthType.Short:
        return PasswordStrengthColor.Short

      case PasswordStrengthType.Weak:
        return index === 0
          ? PasswordStrengthColor.Weak
          : PasswordStrengthColor.None

      case PasswordStrengthType.Medium:
        return index < 2
          ? PasswordStrengthColor.Medium
          : PasswordStrengthColor.None

      case PasswordStrengthType.Strong:
        return PasswordStrengthColor.Strong

      default:
        return PasswordStrengthColor.None
    }
  }

  return (
    <main className='min-h-screen grid place-content-center'>
      <Input password={password} setPassword={setPassword} />
      <Indications getSectionColor={getSectionColor} />
    </main>
  )
}
