interface Props {
  getSectionColor: (index: number) => void
}

export const Indications = ({ getSectionColor }: Props) => (
  <ul className='grid grid-cols-3 gap-3 mt-2'>
    {[...Array(3)].map((_, i) => (
      <li key={i} className={`h-5 ${getSectionColor(i)}`} />
    ))}
  </ul>
)
