import React from 'react'
import styled from 'styled-components'

interface ICardProps {
  image: string
  authors: string[]
  categories?: string[]
  title: string
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  height: 100%;
`

const Title = styled.h3`
  font-size: 24px;
  color: #42341;
  font-weight: 600;
`

const Author = styled.h4`
  font-size: 18px;
  color: #42341;
  font-weight: 500;
  margin: 0;
`

const Spacer = styled.div`
  flex-grow: 1;
`

export const Card: React.FC<ICardProps> = ({ image, authors, categories, title }) => {
  return (
    <CardWrapper>
      <img src={image} alt={title} />
      <Title>{title}</Title>
      <Spacer />
      {authors.map((author) => (
        <Author key={author}>{author}</Author>
      ))}
      {categories && categories.length && <span>{categories[0]}</span>}
    </CardWrapper>
  )
}
