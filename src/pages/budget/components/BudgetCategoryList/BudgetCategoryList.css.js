import styled from 'styled-components';

export const Category = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray.dark};
  padding: ${({ theme }) => theme.spacing.xs}px;
  display: flex;
  justify-content: space-between;
`;

export const ParentCategory = styled(Category)`
  background: ${({ theme }) => theme.colors.gray.normal};
`

export const CategoryItem = styled(Category)`
  background: ${({ theme }) => theme.colors.gray.light};
`