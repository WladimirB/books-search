export function replaceSameClasses(className: string) {
  const classes = className.split(' ')
  const reduced = classes.reduce<Array<string>>((acc, current) => {
    if (acc.includes(current)) {
      acc.push(current)
    }
    return acc
  }, [])
  return reduced.join(' ')
}
