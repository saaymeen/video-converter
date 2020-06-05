import React, { ReactElement, FC, useState } from "react";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";
import { pickFileThunk } from "../services/convert/convert-actions";

import { useSelector, AppState } from "../services/store";
import { MediaFile } from "../components/atoms/file";

type FileInfo = {
  name: string;
};

const PickSection: FC = (): ReactElement => {
  const dispatch = useDispatch();
  return (
    <PickButton onClick={() => dispatch(pickFileThunk())}>
      Datei auswählen
    </PickButton>
  );
};

const PickedSection: FC<{ mediaFile: MediaFile }> = ({
  mediaFile,
}): ReactElement => {
  const dispatch = useDispatch();

  return (
    <>
      <Info>
        <h3>Format</h3>
        <p>{mediaFile.format}</p>
      </Info>
      <ButtonRow>
        <PG>Konvertieren</PG>
        <PG>Andere Datei auswählen</PG>
      </ButtonRow>
    </>
  );
};

const ConvertPage: FC = (): ReactElement => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const { mediaFile } = useSelector((state) => state.convert);
  const mf = {
    name: "youtube-download-2020-Jun-Thu-12-10-33.mp4",
    folder: "/home/saaymeen/Videos",
    bitrate: "634520",
    duration: "600.097000",
    size: "47596749",
    format: "QuickTime / MOV",
  };

  return (
    <Container>
      <PickedSection mediaFile={mf as MediaFile} />
      {mediaFile ? <PickedSection mediaFile={mediaFile} /> : <PickSection />}
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

const PG = styled(PickButton)``;

const Status = styled.p`
  font-family: "Poppins";
  font-size: 1.225rem;
  color: black;
  margin-left: 4rem;
  margin-top: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
`;
