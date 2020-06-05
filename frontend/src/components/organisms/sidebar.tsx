import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FiRefreshCw, FiDownload } from "react-icons/fi";

const Sidebar: FC<{ location: Location }> = ({ location }): JSX.Element => (
  <SidebarContainer>
    <StyledLink to="/" highlight={location.pathname === "/"}>
      <FiRefreshCw />
      <p>Konvertieren</p>
    </StyledLink>
    <StyledLink highlight={location.pathname === "/download"} to="/download">
      <FiDownload />
      <p>Herunterladen</p>
    </StyledLink>
  </SidebarContainer>
);

export default withRouter(Sidebar as any);

const SidebarContainer = styled.aside`
  background: #f9fafe;
  display: flex;
  flex-direction: column;
  border-right: 2px solid white;
  padding-top: 2rem;
`;

const StyledLink = styled(Link)<{ highlight: boolean }>`
  border: none;
  background: none;
  margin: 0.175rem 2rem;
  padding: 0.2rem 1rem;

  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  flex: 0 0 auto;

  font-family: "Poppins";

  color: ${(props) => (props.highlight ? "#477AFF" : "#B6B7C2")};

  align-items: center;

  > svg {
    margin-right: 1rem;
  }
`;
