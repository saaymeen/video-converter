import React, { ReactElement, FC, useState } from "react";
import styled from "styled-components";

type FileInfo = {
  name: string;
};

const ConvertPage: FC = (): ReactElement => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [status, setStatus] = useState("");

  return (
    <Container>
      <PickButton
        onClick={() => {
          if (fileInfo) {
            (window as any).backend
              .convert()
              .then((status: string) => setStatus(status));
          } else {
            (window as any).backend.pick().then((fileInfo: string) => {
              console.log(fileInfo);
              console.log(JSON.parse(fileInfo));
              console.log({ name: "test" });
              setFileInfo(JSON.parse(fileInfo) as FileInfo);
            });
          }
        }}
      >
        {fileInfo ? "Datei umwandeln" : "Datei auswählen"}
      </PickButton>
      {fileInfo && <Status>Datei: {fileInfo.name}</Status>}
      <Status>
        {status === "UNINITIALIZED" ? "FFmpeg nicht installiert" : null}
        {status === "CONVERSION_ERROR" ? "FFmpeg ausführung fehlerhaft" : null}
        {status === "SUCCESS" ? "Konvertierung abgeschlossen" : null}
      </Status>
    </Container>
  );
};

export default ConvertPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  background-color: #f1f7fc;
  flex: 1 1 auto;
`;

const PickButton = styled.button`
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

const Status = styled.p`
  font-family: "Poppins";
  font-size: 1.225rem;
  color: black;
  margin-left: 4rem;
  margin-top: 1rem;
`;
