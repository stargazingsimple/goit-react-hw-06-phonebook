import { nanoid } from 'nanoid';
import { FilterInput, FilterLabel } from './Filter.styled';
import { usePhonebook } from 'redux/phonebookSlice';

export const Filter = () => {
  const { filter, changeFilter } = usePhonebook();
  const filterInputId = nanoid();
  return (
    <FilterLabel htmlFor={filterInputId}>
      Find contacts by name
      <FilterInput
        type="text"
        value={filter}
        onChange={changeFilter}
        id={filterInputId}
      ></FilterInput>
    </FilterLabel>
  );
};
