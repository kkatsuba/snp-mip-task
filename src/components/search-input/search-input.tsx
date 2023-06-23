import React, { useState } from 'react'
import { Input } from '../input/input'
import { InputGroup } from '../input/input-group'
import { InputRightElement } from '../input/input-left-element'

interface Props {
  onChange: (value: string) => void
}

export const SearchInput = (props: Props) => {
  const { onChange } = props
  const [value, setValue] = useState('')

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <InputGroup>
      <Input value={value} onChange={onInputChange} />
      <InputRightElement>
        <span>🔎</span>
      </InputRightElement>
    </InputGroup>
  )
}
