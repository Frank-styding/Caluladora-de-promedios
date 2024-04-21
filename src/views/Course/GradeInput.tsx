import styled from "styled-components";
import { Theme } from "../../theme";

const StyledGradeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: min-content;
`;
const GradeNumber = styled.span`
  font-family: ${Theme.fontFamily};
  color: ${Theme.textColor};
`;
const StyledInput = styled.input`
  background-color: ${Theme.quatary};
  outline: none;
  border: none;
  border-radius: 8px;
  width: 50px;
  height: 30px;
  text-align: center;
  color: ${Theme.textColor};
  font-size: ${Theme.h4.fontSize};
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
export function GradeInput({
  showNumber = true,
  idx = 0,
  onChange,
  value,
}: {
  showNumber?: boolean;
  idx?: number;
  onChange: (value: string) => void;
  value?: string;
}) {
  return (
    <StyledGradeInputContainer>
      {showNumber && <GradeNumber>{idx}</GradeNumber>}
      <StyledInput
        type="number"
        placeholder="0"
        max={20}
        min={0}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </StyledGradeInputContainer>
  );
}
