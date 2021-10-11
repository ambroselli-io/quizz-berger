import styled from "styled-components";

export const FormStyled = styled.form`
  ${(props) => !props.noPadding && "padding: 24px;"}
  height: auto;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top: none;
  border-radius: 0px 0 8px 8px;
`;

export const FormLabel = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
`;

export const FormInput = styled.input`
  padding: 12px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 25px;
  &:placeholder {
    color: rgba(17, 24, 39, 0.4);
  }
`;

export const FormTextArea = styled.textarea`
  margin-bottom: 25px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 300;
  resize: none;
  &:placeholder {
    color: rgba(17, 24, 39, 0.4);
  }
`;
