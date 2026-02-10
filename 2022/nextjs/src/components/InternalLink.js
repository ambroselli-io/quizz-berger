import styled from "styled-components";
import Loader from "./Loader";

const InternalLink = ({ children, withLoader, loaderSize, isLoading, ...props }) => {
  if (withLoader && isLoading)
    return (
      <InternalLinkStyled isLoading={isLoading} {...props}>
        <Loader size={loaderSize} isLoading={isLoading} />
        {children}
      </InternalLinkStyled>
    );
  return <InternalLinkStyled {...props}>{children}</InternalLinkStyled>;
};

const InternalLinkStyled = styled.button`
  text-decoration: underline;
  color: black;
  font-size: 14px;
  border: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  :disabled {
    opacity: 0.5;
    cursor: auto;
    ${(props) => props.isLoading && "opacity: 1;"}
    ${(props) => props.isLoading && "color: transparent;"}
    ${(props) => props.isLoading && "cursor: wait;"}
  }
  > :first-child {
    position: absolute;
  }
`;

export default InternalLink;
