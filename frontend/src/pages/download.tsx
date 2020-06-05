import React, { FC, ReactElement, useState } from "react";
import styled from "styled-components";

const DownloadPage: FC = (): ReactElement => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  return (
    <Container>
      <Row>
        <Label>Youtube Link</Label>
        <URLInput
          placeholder="https://www.youtube.com/watch?v=j9V78UbdzWI"
          type="url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </Row>
      <DownloadButton
        disabled={url.length < 11}
        onClick={() =>
          (window as any).backend.download(url).then((status: string) => {
            setStatus(status);
            console.log(status);
          })
        }
      >
        Herunterladen
      </DownloadButton>
      <Status>
        {status === "FAILED_DECODE" ? "Ungültiger Link" : null}
        {status === "FAILED_DOWNLOAD" ? "Download fehlgeschlagen" : null}
        {status === "SUCCESS" ? "Download erfolgreich" : null}
      </Status>
    </Container>
  );
};

export default DownloadPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  background-color: #f1f7fc;
  flex: 1 1 auto;
`;

const URLInput = styled.input`
  margin-right: 4rem;
  margin-left: 1.5rem;
  flex: 1 1 auto;

  border: 0;
  transition: box-shadow 0.12s ease-in-out;
  padding: 0.535rem;
  font-family: "Poppins";

  &:focus {
    border: 0;
    box-shadow: 0;
    outline: 0;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const DownloadButton = styled.button`
  margin: 0 4rem;
  margin-top: 0.75rem;
  background-color: #477aff;
  border-radius: 0.4rem;
  color: #f5ffff;
  font-family: "Poppins";
  font-size: 1.325rem;
  padding: 0.875rem;
  border: 0;

  transition: box-shadow 0.12s ease-in-out;
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  &:disabled {
    text-decoration: line-through;
    background-color: #b6b7c2;

    &:hover {
      box-shadow: none;
    }
  }

  &:active {
    border: 0;
    outline: 0;
  }

  &:visited {
    border: 0;
    outline: 0;
  }
`;

const Label = styled.h2`
  font-family: "Poppins";
  font-size: 2rem;
  color: black;
  margin-left: 4rem;
`;

const Status = styled.p`
  font-family: "Poppins";
  font-size: 1.225rem;
  color: black;
  margin-left: 4rem;
  margin-top: 1rem;
`;

const Row = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
