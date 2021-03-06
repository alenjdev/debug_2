import { FC, useState, useEffect } from "react";

import { ModuleData, App } from "@formant/data-sdk";
import { TableComponent } from "../TableComponent/index";
import { ErrorMsg } from "../ErrorMsg/ErrorMsg";

export const Table: FC = () => {
  const [errorMessage, setErrorMessage] = useState("Waiting for data...");
  const [state, setState] = useState({
    estop: undefined,
    safetySystem: undefined,
    canController: undefined,
  });
  const [estop, setEstop] = useState();
  const [safetySystem, setSafetySystem] = useState();
  const [canController, setCanController] = useState();

  useEffect(() => {
    App.addModuleDataListener(receiveModuleData);
  }, []);

  const receiveModuleData = async (newValue: ModuleData) => {
    const streams = newValue.streams;
    if (Object.keys(streams).length === 0) {
      throw new Error("No streams.");
    }
    Object.keys(streams).forEach((stream, idx) => {
      const latestState = getLatestData(streams, stream);
      if (typeof latestState !== "string" && latestState !== undefined) {
        if (streams[stream].data[0].name === "estop")
          setEstop(latestState.values[0]);
        if (streams[stream].data[0].name === "can.controller")
          setCanController(latestState.values[0]);
        if (streams[stream].data[0].name === "safety.system.status")
          setSafetySystem(latestState.values[0]);
      }
    });
  };

  return (
    <TableComponent
      topicStats={{
        estop,
        canController,
        safetySystem,
      }}
      tableHeaders={["Item", "Status"]}
    />
  );
};

const getLatestData = (
  moduleData: {
    [stream_name: string]: Stream;
  },
  stream: string
): string | undefined => {
  if (moduleData[stream] === undefined) {
    return "No stream.";
  }
  if (moduleData[stream].loading) {
    return undefined;
  }
  if (moduleData[stream].tooMuchData) {
    return "Too much data.";
  }

  if (moduleData[stream].data.length === 0) {
    return "No data.";
  }
  const latestPoint = moduleData[stream].data[0].points.at(-1);
  if (!latestPoint) {
    return "No datapoints.";
  }
  return latestPoint[1];
};
